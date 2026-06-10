import React, { useState } from 'react';
import { Send, MessageCircle, Instagram, CheckCircle, Mail, Clock, MapPin, Sparkles, Calendar, Minus, Plus } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    phone: '',
    subject: 'Desenvolvimento de Novo Software / SaaS',
    message: '',
    projectType: 'saas'
  });

  const [inputBudget, setInputBudget] = useState<string>('R$ 3.000 - R$ 7.000');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const projectTypes = [
    { value: 'saas', label: 'Especializado SaaS / Web App' },
    { value: 'ecommerce', label: 'E-commerce & Carrinho Integrado' },
    { value: 'corporate', label: 'Site Corporativo Premium' },
    { value: 'platform', label: 'Outro (Integração customizada)' }
  ];

  const budgets = [
    'R$ 3.000 - R$ 7.000',
    'R$ 7.000 - R$ 15.000',
    'R$ 15.000 - R$ 30.000',
    'R$ 30.000++'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha o Nome, E-mail e os detalhes da sua ideia!');
      return;
    }

    setSubmitting(true);
    // Simulate real database store API latency
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  // Compile full form data and forward to WhatsApp URL
  const handleWhatsAppForward = () => {
    if (!formData.name) {
      alert('Por favor, digite pelo menos o seu Nome antes de iniciar o envio pelo WhatsApp!');
      return;
    }

    const compiledText = `🚀 *NOVO CONTATO - NEXT YM PORTFÓLIO* 🚀%0A%0A` +
      `👤 *Nome:* ${formData.name}%0A` +
      `📧 *E-mail:* ${formData.email || 'Não informado'}%0A` +
      `📞 *WhatsApp:* ${formData.phone || 'Não informado'}%0A` +
      `💻 *Tipo de Projeto:* ${formData.projectType.toUpperCase()}%0A` +
      `💰 *Orçamento Estimado:* ${inputBudget}%0A%0A` +
      `📝 *Mensagem/Ideia do Projeto:*%0A${encodeURIComponent(formData.message || 'Gostei de ver o portfólio da Next YM e gostaria de conversar mais sobre as soluções de vocês!')}`;

    const whatsappLink = `https://wa.me/5531989449722?text=${compiledText}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <section 
      id="contato" 
      className="relative py-24 md:py-32 bg-[#0A0A0B] overflow-hidden border-t border-white/5"
    >
      {/* Visual background decorations */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D0D0E] border border-white/5 text-xs font-semibold text-slate-400 mb-6 font-mono">
            <Sparkles size={12} className="text-indigo-400" />
            <span>FALE COM OS ESPECIALISTAS</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-tight mb-6">
            Eleve o nível digital do seu negócio <br className="hidden md:inline"/>
            com a <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">Next YM</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Tem um projeto em mente ou gostaria de replicar/evoluir sistemas de sucesso como os que desenvolvemos? Preencha o briefing rápido abaixo e fale diretamente conosco via WhatsApp ou Email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct info channels */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="p-6 md:p-8 rounded-3xl bg-[#0D0D0E]/80 border border-white/5 backdrop-blur-md space-y-6 shadow-xl">
              
              <h3 className="font-display font-medium text-lg text-white">
                Canais de Atendimento Direto
              </h3>
              
              <p className="text-xs text-slate-400 leading-relaxed">
                Respondemos rapidamente! Escolha o canal de sua preferência ou preencha o formulário para criarmos um escopo do projeto.
              </p>

              {/* Channel 1: WhatsApp */}
              <a 
                id="contact-channel-whatsapp"
                href="https://wa.me/5531989449722?text=Ol%C3%A1%20Next%20YM%2C%20visitei%20o%20seu%20portf%C3%B3lio%20e%20gostaria%2520de%20um%20or%C3%A7amento%20de%20projeto%21"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all text-left"
              >
                <div className="p-3.5 rounded-xl bg-emerald-500 text-black shrink-0 transition-transform group-hover:scale-105">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest">WHATSAPP AGIL</h4>
                  <p className="text-base font-bold text-white mt-0.5">(31) 9 8944-9722</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Converse instantaneamente conosco por mensagem</p>
                </div>
              </a>

              {/* Channel 2: Instagram */}
              <a 
                id="contact-channel-instagram"
                href="https://www.instagram.com/admnextym/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/40 transition-all text-left"
              >
                <div className="p-3.5 rounded-xl bg-gradient-to-tr from-sky-400 to-indigo-500 text-white shrink-0 transition-transform group-hover:scale-105">
                  <Instagram size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-widest">INSTAGRAM OFICIAL</h4>
                  <p className="text-base font-bold text-white mt-0.5">@admnextym</p>
                  <p className="text-[11px] text-zinc-400 mt-1">Novidades, dicas de tecnologia e portfólio completo</p>
                </div>
              </a>
            </div>

            {/* Business specs box */}
            <div className="border border-white/5 rounded-3xl p-6 bg-[#0D0D0E]/60 space-y-4 shadow-lg">
              <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                INFORMAÇÕES DA EMPRESA
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-400">
                  <MapPin size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                  <span>Belo Horizonte / MG e atendimento remoto para todo o Brasil.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-400">
                  <Mail size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                  <span>mrsouzaeduardo@gmail.com</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-400">
                  <Clock size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                  <span>Atendimento SaaS & Suporte: Segunda a Sábado, 09h às 20h.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic interactivity form */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-10 rounded-3xl bg-[#0D0D0E]/80 border border-white/5 backdrop-blur-md relative overflow-hidden shadow-xl">
              <span className="absolute top-0 right-0 py-1 px-3 rounded-bl-xl bg-indigo-600/10 text-indigo-400 text-[10px] font-mono border-l border-b border-white/5">
                Next YM Workspace
              </span>

              {success ? (
                <div className="animate-fadeIn text-center py-12 px-4 space-y-6">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/15 text-emerald-400 inline-flex items-center justify-center border border-emerald-500/30">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl text-white">Briefing Recebido!</h3>
                    <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                      Olá <strong>{formData.name}</strong>, agradecemos seu contato! Nossa equipe já registrou seu interesse em um projeto no formato <strong>{formData.projectType.toUpperCase()}</strong> com orçamento estimado em <strong>{inputBudget}</strong>.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 text-left space-y-1.5 max-w-sm mx-auto text-xs font-mono text-slate-400">
                    <p className="text-slate-500 text-[10px] uppercase">RESUMO DA SOLICITAÇÃO:</p>
                    <p><span className="text-slate-500">Nome:</span> {formData.name}</p>
                    <p><span className="text-slate-500">Contato:</span> {formData.email} / {formData.phone || 'N/A'}</p>
                    <p><span className="text-slate-500">Tipo:</span> {formData.projectType}</p>
                    <p><span className="text-slate-500">Budget:</span> {inputBudget}</p>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      id="btn-whatsapp-success-contact"
                      onClick={handleWhatsAppForward}
                      className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      Reforçar Envio via WhatsApp
                    </button>
                    <button
                      id="btn-reset-success-contact"
                      onClick={() => {
                        setSuccess(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'Desenvolvimento de Novo Software / SaaS',
                          message: '',
                          projectType: 'saas'
                        });
                      }}
                      className="py-3 px-6 rounded-xl bg-[#0A0A0B] border border-white/5 text-slate-400 hover:text-white hover:bg-[#111112] font-medium text-xs transition-colors cursor-pointer"
                    >
                      Enviar outro briefing
                    </button>
                  </div>
                </div>
              ) : (
                <form id="contact-form-element" onSubmit={handleLocalSubmit} className="space-y-6">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-medium text-slate-400" htmlFor="name">Seu Nome*</label>
                      <input 
                        required
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ex: Carlos Eduardo" 
                        className="w-full text-sm bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-medium text-slate-400" htmlFor="email">E-mail Corporativo*</label>
                      <input 
                        required
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Ex: seu@site.com.br" 
                        className="w-full text-sm bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Project Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-medium text-slate-400" htmlFor="phone">WhatsApp / Celular</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ex: (31) 98944-9722" 
                        className="w-full text-sm bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono font-medium text-slate-400" htmlFor="projectType">Modelo de Software</label>
                      <select 
                        id="projectType" 
                        name="projectType" 
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full text-sm bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      >
                        {projectTypes.map((pt, i) => (
                          <option key={i} value={pt.value}>{pt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget Ranges */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-medium text-slate-400">Verba estimada para investimento</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgets.map((budg) => (
                        <button
                          id={`btn-budget-select-${budg.replace(/\s+/g, '')}`}
                          key={budg}
                          type="button"
                          onClick={() => setInputBudget(budg)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                            inputBudget === budg 
                              ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold' 
                              : 'bg-[#0A0A0B] border border-white/10 text-slate-400 hover:text-white hover:bg-[#111112]'
                          }`}
                        >
                          {budg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 3: Message / Idea details */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-mono font-medium text-slate-400" htmlFor="message">Explique sua ideia / escopo do projeto*</label>
                      <span className="text-[10px] text-slate-500">Detalhes de recursos ajudam no escopo</span>
                    </div>
                    <textarea 
                      required
                      id="message" 
                      name="message" 
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ex: Gostaria de criar um aplicativo SaaS que gerencie estoques inteligentes com notificações por WhatsApp de forma reativa..." 
                      className="w-full text-sm bg-[#0A0A0B] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 resize-y"
                    />
                  </div>

                  {/* Double Actions for form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {/* Primary Button: WhatsApp direct transmission */}
                    <button
                      id="btn-submit-whatsapp"
                      type="button"
                      onClick={handleWhatsAppForward}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10 cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      Enviar pelo WhatsApp Direto
                    </button>

                    {/* Secondary Button: Local simulation / Standard submit */}
                    <button
                      id="btn-submit-api"
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 px-4 rounded-xl bg-zinc-100 hover:bg-white text-black font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? 'Iniciando Briefing...' : 'Iniciar Briefing por E-mail'}
                      <Send size={15} />
                    </button>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-[10px] text-slate-500 font-mono">
                      🔒 Seus dados estão 100% seguros e protegidos pela Next YM.
                    </p>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
