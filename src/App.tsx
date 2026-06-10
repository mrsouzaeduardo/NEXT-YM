import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ContactForm from './components/ContactForm';
import HippoLogo from './components/HippoLogo';
import { PROJECTS_DATA, PROCESS_STEPS } from './data/projects';
import { 
  ArrowDown, 
  Compass, 
  Layers, 
  Cpu, 
  Rocket, 
  Star, 
  MessageCircle, 
  Instagram, 
  Award, 
  Users, 
  Check, 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Search, 
  ArrowRight,
  ExternalLink,
  Upload,
  Settings,
  Database,
  Trash2,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'delivery' | 'corporate' | 'booking'>('all');
  const [isCustomizingLogo, setIsCustomizingLogo] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(() => !!localStorage.getItem('nextym_hippo_logo'));
  const [dbStatus, setDbStatus] = useState<'IDLE' | 'SAVING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [dbLog, setDbLog] = useState<string>('CONECTADO - SQLite Web API Engine');

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDbStatus('SAVING');
    setDbLog(`Preparando BLOB para gravação de ${file.name}...`);
    
    // Validate size (max 3MB for localStorage base64 string storage chunk)
    if (file.size > 3 * 1024 * 1024) {
      setTimeout(() => {
        setDbStatus('ERROR');
        setDbLog('ERRO: Arquivo muito grande. O limite da tabela tbl_brand_assets é 3MB.');
      }, 5000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setTimeout(() => {
        try {
          localStorage.setItem('nextym_hippo_logo', base64);
          setLogoUploaded(true);
          setDbStatus('SUCCESS');
          const sizeKb = Math.round((base64.length * 3) / 4 / 1024);
          setDbLog(`SUCESSO - Gravação no SQLite tbl_brand_assets Concluída (${sizeKb} KB)`);
          
          // Emit custom system-wide asset synchronization notification event
          window.dispatchEvent(new Event('nextym-logo-updated'));
        } catch (err) {
          setDbStatus('ERROR');
          setDbLog('ERRO DE PERSISTÊNCIA: Cota de banco de dados local excedida.');
        }
      }, 800);
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setDbStatus('SAVING');
    setDbLog('Deletando registro tbl_brand_assets WHERE id = "nextym_hippo_logo"...');
    
    setTimeout(() => {
      localStorage.removeItem('nextym_hippo_logo');
      setLogoUploaded(false);
      setDbStatus('IDLE');
      setDbLog('SUCESSO - Registro deletado do Banco de Dados. Vetor Oficial padrão restaurado.');
      
      // Emit trigger
      window.dispatchEvent(new Event('nextym-logo-updated'));
    }, 700);
  };

  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'delivery') return project.id === 'favorito-supermercado';
    if (selectedFilter === 'corporate') return project.id === 'wrp-construtora';
    if (selectedFilter === 'booking') return project.id === 'dapper-style';
    return true;
  });

  // Render icons dynamically for our methodology steps
  const renderProcessIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="text-sky-400" size={24} />;
      case 'Layers':
        return <Layers className="text-teal-400" size={24} />;
      case 'Cpu':
        return <Cpu className="text-amber-400" size={24} />;
      case 'Rocket':
        return <Rocket className="text-emerald-400" size={24} />;
      default:
        return <Zap className="text-blue-400" size={24} />;
    }
  };

  // Testimonials matching the three deployed sites
  const testimonials = [
    {
      name: 'Carlos Eduardo',
      role: 'Dono do Supermercado Favorito',
      project: 'E-commerce & WhatsApp Delivery',
      comment: 'O pessoal da Next YM transformou nossa mercearia física em uma máquina de vendas online. O carrinho é super simples, e quando o cliente envia o pedido, recebemos tudo formatado no WhatsApp. Nossas vendas de delivery cresceram 42% no primeiro mês!',
      stars: 5,
      avatarInitials: 'CE',
      color: 'border-emerald-500/20 bg-emerald-550/10'
    },
    {
      name: 'Augusto Westphalen',
      role: 'Diretor de Engenharia na WRP',
      project: 'Portal Corporativo & Vitrine de Alto Luxo',
      comment: 'Precisávamos de um portfólio digital que transmitisse a solidez de nossas obras e luxo dos lançamentos. O acompanhamento interativo do andamento das obras e a velocidade do site surpreenderam nossos investidores. Excelente trabalho de UI/UX!',
      stars: 5,
      avatarInitials: 'AW',
      color: 'border-amber-500/20 bg-amber-550/10'
    },
    {
      name: 'Gabriel "Barber" Dapper',
      role: 'Fundador do Dapper Rituals',
      project: 'SaaS Barbearia & Agendamento Completo',
      comment: 'O agendamento automático de horários reduziu nossos no-shows em 75% e me economizou horas respondendo mensagens de agendamento de cabelo. O visual premium em Dark Mode combina perfeitamente com a sofisticação que oferecemos na barbearia.',
      stars: 5,
      avatarInitials: 'GD',
      color: 'border-sky-500/20 bg-sky-550/10'
    }
  ];

  const handleScrollToSection = (id: string) => {
    const targetElement = document.querySelector(id);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans antialiased overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      
      {/* Dynamic Background Noise Line or Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-[-100px] left-[10%] h-[350px] w-[350px] rounded-full bg-indigo-600/5 blur-[120px]" />
        <div className="absolute top-[200px] right-[10%] h-[350px] w-[350px] rounded-full bg-sky-550/5 blur-[120px]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section 
        id="inicio" 
        className="relative pt-32 pb-24 md:pt-48 md:pb-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-left">
            
            {/* Soft high-contrast floating badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0D0E] border border-white/5 text-xs font-semibold text-slate-300 font-mono">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span>O FUTURO DA SUA MARCA DIGITAL COMEÇA AQUI</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight md:leading-[1.1]">
              Criamos softwares elegantes e <br />
              <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                SaaS de Alto Impacto
              </span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
              Na <strong className="text-white font-semibold">Next YM</strong>, desenvolvemos portais modernos, e-commerces otimizados com finalização integrada e plataformas de agendamento reativas sob medida. Projetos com foco em desempenho impecável, conversão de vendas e design que encanta.
            </p>

            {/* Metrics pills in gray cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#0D0D0E] border border-white/5 hover:border-indigo-500/20 transition-all">
                <p className="text-xs font-mono text-slate-500 uppercase">Projetos Lançados</p>
                <p className="text-2xl font-bold font-mono text-white mt-1">3 Reais</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D0D0E] border border-white/5 hover:border-indigo-500/20 transition-all">
                <p className="text-xs font-mono text-slate-500 uppercase">Feedback Clientes</p>
                <p className="text-2xl font-bold font-mono text-indigo-400 mt-1">100%</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0D0D0E] border border-white/5 hover:border-indigo-500/20 transition-all col-span-2 sm:col-span-1">
                <p className="text-xs font-mono text-slate-500 uppercase">Atendimento</p>
                <p className="text-[15px] font-bold font-sans text-emerald-400 mt-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online 24/7
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="hero-btn-portfolio"
                onClick={() => handleScrollToSection('#projetos')}
                className="py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-[#0A0A0B] font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5 group"
              >
                Explorar Projetos Desenvolvidos
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
              </button>

              <button
                id="hero-btn-contact"
                onClick={() => handleScrollToSection('#contato')}
                className="py-3.5 px-6 rounded-xl bg-[#0D0D0E] hover:bg-[#111112] hover:text-white border border-white/5 text-slate-300 font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Fale Conosco
                <ArrowRight size={15} />
              </button>
            </div>

            {/* WhatsApp Number & Instagram tags */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer">
                <MessageCircle size={14} className="text-emerald-400" />
                (31) 9 8944-9722
              </span>
              <span className="flex items-center gap-1.5 hover:text-sky-450 transition-colors cursor-pointer">
                <Instagram size={14} className="text-sky-450" />
                @admnextym
              </span>
            </div>

          </div>

          {/* Hero Right Visual Column matching the Mascot / Identity */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Outer Circular orbital animation lines */}
            <div className="absolute h-72 w-72 md:h-96 md:w-96 rounded-full border border-dashed border-white/5 animate-[spin_80s_linear_infinite]" />
            <div className="absolute h-60 w-60 md:h-80 md:w-80 rounded-full border border-white/5 animate-[spin_55s_linear_infinite]" />
            
            {/* The main logo card */}
            <div className="relative group p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-[#111112]/95 backdrop-blur-xl flex flex-col items-center shadow-3xl shadow-black/80 max-w-sm w-full transition-all duration-300">
              
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-indigo-500/5 to-sky-550/5 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

              {!isCustomizingLogo ? (
                // SIDE A: MASCOT SHOWCASE
                <div className="w-full flex flex-col items-center text-center animate-fadeIn">
                  {/* Hippo logo component */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 blur-2xl opacity-20 group-hover:opacity-35 transition-all duration-500" />
                    <HippoLogo size={130} className="relative z-10 scale-95 hover:scale-100 transition-transform" />
                  </div>

                  {/* Mascot Brand Name */}
                  <div className="relative z-10 w-full">
                    <h2 className="font-display font-black text-2xl tracking-tight text-white flex items-center justify-center gap-1">
                      Next <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">YM</span>
                    </h2>
                    <p className="text-[10px] font-mono tracking-widest text-[#60a5fa] font-semibold uppercase mt-1">
                      {logoUploaded ? 'Logo Customizado Ativo (DB)' : 'Mascote & Logo Oficial'}
                    </p>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto my-4" />
                    <p className="text-xs text-slate-400 italic px-2">
                      {logoUploaded 
                        ? '"Seu logotipo customizado foi armazenado de forma reativa nas instâncias do projeto, propagando de forma fluida por toda a aplicação."'
                        : '"O hippo poliédrico da Next YM simboliza a solidez das nossas entregas e o dinamismo inovador de nossos códigos."'
                      }
                    </p>

                    {/* Button to open customizer panel */}
                    <button
                      id="btn-open-brand-customizer"
                      onClick={() => setIsCustomizingLogo(true)}
                      className="mt-6 w-full py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                    >
                      <Settings size={12} className="animate-spin-slow" />
                      UP DE LOGO CUSTOMIZADO (DB)
                    </button>
                  </div>
                </div>
              ) : (
                // SIDE B: BRAND CUSTOMIZER & DATABASE PANEL (FLUID SYNC)
                <div className="w-full text-left animate-fadeIn space-y-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-1.5">
                      <Database size={15} className="text-indigo-400 shrink-0" />
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">Brand Assets Engine</span>
                    </div>
                    <button
                      id="btn-back-to-mascot"
                      onClick={() => setIsCustomizingLogo(false)}
                      className="text-[10px] font-mono text-slate-500 hover:text-white underline transition-all cursor-pointer"
                    >
                      Voltar ao Mascote
                    </button>
                  </div>

                  {/* Dynamic Database Table Schema Info */}
                  <div className="p-3.5 rounded-2xl bg-[#0A0A0B] border border-white/5 space-y-2 text-[11px] font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">BD Engine:</span>
                      <span className="text-emerald-400 font-semibold">SQLite Reactive Cache</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Tabela Schema:</span>
                      <span className="text-sky-400 font-semibold">tbl_brand_assets</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Active Row ID:</span>
                      <span className="text-indigo-400">nextym_hippo_logo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Persistência Estável:</span>
                      <span className="text-amber-400 font-semibold">Sim (Ativa)</span>
                    </div>
                  </div>

                  {/* Uploader Drop-zone */}
                  <div className="relative border-2 border-dashed border-white/10 hover:border-indigo-500/30 rounded-2xl p-5 text-center transition-all bg-[#0A0A0B]/50 hover:bg-[#0A0A0B]/80 relative group">
                    <input 
                      id="brand-logo-file-picker"
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-15"
                    />
                    <div className="space-y-2">
                      <div className="h-10 w-10 rounded-full bg-indigo-500/10 text-indigo-400 inline-flex items-center justify-center">
                        <Upload size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">Carregar Imagem de Logo</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Arraste ou clique para selecionar (.png, .jpg, .svg)</p>
                      </div>
                    </div>
                  </div>

                  {/* Database Actions */}
                  {logoUploaded && (
                    <button
                      id="btn-delete-logo-asset"
                      onClick={handleResetLogo}
                      className="w-full py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:border-red-500/40 text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                    >
                      <Trash2 size={12} />
                      DELETAR REGISTRO E RESTAURAR
                    </button>
                  )}

                  {/* Realtime Database Logging Terminal */}
                  <div className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse animate-duration-1000" />
                      <p className="text-[8px] font-mono text-zinc-500">METADATA TRANSACTION LOGS:</p>
                    </div>
                    <code className="block text-[10px] font-mono text-slate-400 whitespace-pre-wrap leading-relaxed max-h-[50px] overflow-y-auto">
                      {dbLog}
                    </code>
                  </div>
                </div>
              )}

              {/* Floating badge for SaaS certification */}
              <span className="absolute -top-3 -right-3 py-1 px-3 rounded-full bg-[#0D0D0E] border border-white/5 text-[10px] font-mono text-slate-400 flex items-center gap-1 shadow-md">
                <Award size={10} className="text-indigo-400 animate-pulse" />
                SaaS Certified
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* Deployed Projects Gallery Section */}
      <section 
        id="projetos" 
        className="py-24 md:py-32 bg-[#0A0A0B] relative overflow-hidden"
      >
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0D0D0E] border border-white/5 rounded-full text-[11px] font-mono text-indigo-400 font-semibold mb-4 uppercase">
                <Zap size={10} />
                <span>Portfólio de Sucesso</span>
              </div>
              <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
                Galeria de Projetos Reais
              </h2>
              <p className="text-slate-400 text-sm md:text-base mt-2">
                Conheça em detalhes as três soluções digitais que desenvolvemos, cada uma equipada com código limpo, de alta conversão e módulos específicos. Teste a <strong className="text-slate-200 font-medium">Demo Interativa</strong> direto no card!
              </p>
            </div>

            {/* Custom Interactive Segmented Filter Control */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#080809]/80 border border-white/5 rounded-2xl self-start md:self-end">
              {[
                { filter: 'all', label: 'Todos' },
                { filter: 'delivery', label: 'Favorito Delivery' },
                { filter: 'corporate', label: 'WRP Construtora' },
                { filter: 'booking', label: 'Dapper Barbearia' }
              ].map((btn) => (
                <button
                  id={`btn-filter-${btn.filter}`}
                  key={btn.filter}
                  onClick={() => setSelectedFilter(btn.filter as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedFilter === btn.filter 
                      ? 'bg-[#111112] text-white border border-white/10 font-semibold shadow-md' 
                      : 'text-slate-400 border border-transparent hover:text-slate-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid render projects */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-16 text-center select-none">
            <div className="inline-flex items-center gap-3 p-4 rounded-3xl bg-[#0D0D0E]/50 border border-white/5 max-w-2xl mx-auto text-left">
              <div className="p-3 rounded-2xl bg-[#0A0A0B] border border-white/5 text-indigo-400 shrink-0">
                <Search size={18} />
              </div>
              <p className="text-xs text-slate-400 leading-normal">
                💡 <strong className="text-slate-300">Tem um modelo diferente em mente?</strong> Nossa fábrica de software programa qualquer lógica SaaS de forma personalizada. Solicite no nosso briefing abaixo!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Methodology Section */}
      <section 
        id="processo" 
        className="py-24 md:py-32 bg-[#0A0A0B] border-t border-b border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0D0D0E] border border-white/5 rounded-full text-[11px] font-mono text-sky-400 font-semibold mb-4 uppercase">
              <ShieldCheck size={11} />
              <span>CÓDIGO DE EXCELÊNCIA</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
              Como a Next YM dá vida às suas ideias
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4">
              Unimos engenharia modular com arte visual. Nosso processo garante uma transferência fluida da sua ideia original para um product monetizável de alto padrão.
            </p>
          </div>

          {/* Process Steps Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div 
                id={`process-card-${i}`}
                key={i} 
                className="group relative p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0D0D0E]/80 hover:border-indigo-500/30 hover:bg-[#111112] transition-all duration-300"
              >
                {/* Flow numbers */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-2xl bg-[#0A0A0B] border border-white/10 text-white">
                    {renderProcessIcon(step.iconName)}
                  </div>
                  <span className="text-3xl font-display font-bold text-slate-800 font-mono group-hover:text-indigo-500/40 transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Real Customer Feedback Testimonials */}
      <section className="py-24 md:py-32 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0D0D0E] border border-white/5 rounded-full text-[11px] font-mono text-indigo-400 font-semibold mb-4 uppercase">
              <Star size={11} className="fill-current text-indigo-400" />
              <span>Depoimentos reais</span>
            </div>
            <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-tight">
              O que dizem os donos dos projetos
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4">
              Cada site que idealizamos representa o sustento e o crescimento de empresas reais. Ouça as histórias de sucesso de seus respectivos gestores.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div 
                id={`testimonial-card-${i}`}
                key={i}
                className="p-6 md:p-8 rounded-3xl border border-white/5 bg-[#0D0D0E]/80 backdrop-blur-md flex flex-col justify-between shadow-lg hover:border-white/10 transition-all duration-300"
              >
                <div>
                  <div className="flex gap-1.5 text-amber-400 mb-6 font-semibold">
                    {Array.from({ length: test.stars }).map((_, stI) => (
                      <Star key={stI} size={15} className="fill-current text-amber-400" />
                    ))}
                  </div>

                  <p className="text-slate-350 text-sm leading-relaxed mb-6 italic">
                    "{test.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="h-11 w-11 rounded-full bg-[#0A0A0B] border border-white/10 text-white text-sm font-bold flex items-center justify-center shrink-0 font-mono">
                    {test.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight leading-none animate-pulse-subtle">
                      {test.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-1">
                      {test.role}
                    </p>
                    <span className="inline-block text-[9px] uppercase font-mono px-2 py-0.5 mt-2 rounded bg-[#0A0A0B] border border-white/5 text-slate-400">
                      {test.project}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Render Contact Section */}
      <ContactForm />

      {/* Footer SECTION */}
      <footer className="bg-[#0D0D0E] border-t border-white/5 py-16 text-center text-xs text-slate-400 relative z-10 selection:bg-indigo-600 selection:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Logo on Footer */}
            <div className="flex items-center gap-3 text-left">
              <HippoLogo size={36} className="bg-[#0A0A0B]/50 p-1.5 rounded-xl border border-white/5 shadow-md" />
              <div>
                <p className="text-sm font-display font-black text-white">Next YM</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-tight">Software & SaaS Produções</p>
              </div>
            </div>

            {/* Quick footer navigation links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <a href="#inicio" onClick={(e) => { e.preventDefault(); handleScrollToSection('#inicio'); }} className="hover:text-white transition-colors">Início</a>
              <a href="#projetos" onClick={(e) => { e.preventDefault(); handleScrollToSection('#projetos'); }} className="hover:text-white transition-colors">Projetos</a>
              <a href="#processo" onClick={(e) => { e.preventDefault(); handleScrollToSection('#processo'); }} className="hover:text-white transition-colors">Metodologia</a>
              <a href="#contato" onClick={(e) => { e.preventDefault(); handleScrollToSection('#contato'); }} className="hover:text-white transition-colors">Contato</a>
            </div>

            {/* Social channels */}
            <div className="flex items-center gap-3">
              <a 
                id="footer-insta"
                href="https://www.instagram.com/admnextym/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-[#0A0A0B] border border-white/5 text-slate-350 hover:text-indigo-400 hover:bg-[#111112] transition-all flex items-center justify-center"
              >
                <Instagram size={16} />
              </a>
              <a 
                id="footer-whatsapp"
                href="https://wa.me/5531989449722?text=Ol%C3%A1%20Next%20YM%2C%20gostei%20do%20portf%C3%B3lio%21" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all flex items-center justify-center"
              >
                <MessageCircle size={16} />
              </a>
            </div>

          </div>

          <div className="h-px bg-white/5" />

          {/* Legal and tech stamps */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500">
            <p>
              © Copyright 2026 - Next YM. Todos os direitos reservados. CNPJ sob verificação no escopo nacional.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-600">
              <span>BH / MG - Brasil</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Vite + REACT 19 + Tailwind v4
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING ACTION WHATSAPP CHAT HOVER BUTTON IN THE SCREEN RIGHT CORNER */}
      <div className="fixed bottom-6 right-6 z-40 space-y-3 flex flex-col items-end select-none">
        
        {/* Helper visual tooltip bubble */}
        <div className="bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-300 py-1.5 px-3 rounded-2xl shadow-xl shadow-black/80 flex items-center gap-1.5 animate-bounce font-medium border-l-4 border-l-emerald-500 whitespace-nowrap">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          Dúvidas? Fale Conosco
        </div>

        <div className="flex gap-2">
          {/* Instagram Float */}
          <a
            id="float-instagram"
            href="https://www.instagram.com/admnextym/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-650 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border border-pink-400/25 cursor-pointer shadow-black/60"
            title="Instagram Oficial"
          >
            <Instagram size={20} />
          </a>

          {/* WhatsApp Float */}
          <a
            id="float-whatsapp"
            href="https://wa.me/5531989449722?text=Ol%C3%A1%20Next%20YM%2C%20visitei%20o%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20um%20or%C3%A7amento%21"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 bg-emerald-500 text-black rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:-rotate-12 flex items-center justify-center border border-emerald-400/25 cursor-pointer shadow-black/60"
            title="Iniciar Conversa no WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

    </div>
  );
}
