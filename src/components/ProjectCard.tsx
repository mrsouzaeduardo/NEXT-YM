import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Code, CheckCircle, Flame, Plus, Minus, Check, Calendar, ShoppingCart, Scissors, Building2, Hammer, Landmark, Sparkles, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  key?: string;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo' | 'specs'>('overview');
  
  // Interactive States for Favorito Supermercado Demo
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Hortifrúti Orgânico (Kg)', price: 14.90, quantity: 0 },
    { id: 2, name: 'Pão de Fermentação Natural', price: 9.50, quantity: 0 },
    { id: 3, name: 'Bebida Premium Importada', price: 29.90, quantity: 0 },
  ]);

  // Interactive States for WRP Construtora Demo
  const [buildM2, setBuildM2] = useState(120);
  const [constructionStage, setConstructionStage] = useState<'fundacao' | 'alvenaria' | 'acabamento' | 'entrega'>('fundacao');

  // Interactive States for Dapper Style Demo
  const [selectedService, setSelectedService] = useState('Corte Premium');
  const [selectedStylist, setSelectedStylist] = useState('Lucas "The Blade"');
  const [selectedTime, setSelectedTime] = useState('16:00');
  const [agendado, setAgendado] = useState(false);

  // Helper calculation for Favorito
  const totalCart = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const handleAddCart = (id: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };
  const handleRemoveCart = (id: number) => {
    setCartItems(prev => prev.map(item => item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  // Helper lists for Dapper
  const services = ['Corte Premium', 'Barba Ritual Real', 'Combo Executive (Corte + Barba)', 'Visagismo de Estilo'];
  const stylists = ['Lucas "The Blade"', 'André "Bespoke"', 'Enzo "Barber-Art"'];
  const times = ['09:30', '13:00', '16:00', '18:30'];

  const getThemeColors = (color: string) => {
    switch (color) {
      case 'emerald':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/20',
          text: 'text-emerald-400',
          buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
          badgeText: 'text-emerald-300',
          borderHover: 'hover:border-emerald-500/40',
          accent: 'emerald',
          gradientText: 'from-emerald-400 to-teal-500'
        };
      case 'amber':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/20',
          text: 'text-amber-400',
          buttonBg: 'bg-amber-500 hover:bg-amber-600',
          badgeText: 'text-amber-300',
          borderHover: 'hover:border-amber-500/40',
          accent: 'amber',
          gradientText: 'from-amber-400 to-orange-500'
        };
      case 'sky':
      default:
        return {
          bg: 'bg-sky-500/10',
          border: 'border-sky-500/20',
          text: 'text-sky-400',
          buttonBg: 'bg-sky-500 hover:bg-sky-600',
          badgeText: 'text-sky-300',
          borderHover: 'hover:border-sky-500/40',
          accent: 'sky',
          gradientText: 'from-sky-400 to-indigo-500'
        };
    }
  };

  const themeColors = getThemeColors(project.color);

  return (
    <div 
      id={`project-card-${project.id}`}
      className={`group relative overflow-hidden rounded-3xl border ${themeColors.border} bg-[#0D0D0E]/80 backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${themeColors.borderHover} hover:shadow-2xl hover:shadow-black/60`}
    >
      {/* Absolute Decorative Glow */}
      <div className={`absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full ${themeColors.bg} blur-3xl opacity-40 transition-all duration-500 group-hover:scale-125`} />

      {/* Card Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${themeColors.bg} ${themeColors.text}`}>
              {project.id === 'favorito-supermercado' && <ShoppingCart size={24} />}
              {project.id === 'wrp-construtora' && <Building2 size={24} />}
              {project.id === 'dapper-style' && <Scissors size={24} />}
            </div>
            <div>
              <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-tight leading-tight">
                {project.title}
              </h3>
              <p className={`text-xs ${themeColors.badgeText} font-medium mt-0.5`}>
                {project.subtitle}
              </p>
            </div>
          </div>

          <a 
            id={`link-visit-${project.id}`}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`self-start sm:self-center px-4 py-1.5 rounded-full text-xs font-semibold border ${themeColors.border} bg-[#0A0A0B]/40 text-slate-300 hover:text-white hover:bg-[#111112] flex items-center gap-1.5 transition-colors`}
          >
            Acessar Site
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, i) => (
            <span 
              id={`tag-${project.id}-${i}`}
              key={i} 
              className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#0A0A0B]/80 text-slate-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tabs for detailed content */}
        <div className="flex border-b border-white/5 mb-5 relative z-10">
          <button
            id={`tab-overview-${project.id}`}
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 text-xs font-medium border-b-2 mr-5 transition-all outline-none ${
              activeTab === 'overview' 
                ? `${themeColors.text} border-current font-semibold` 
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            Visão Geral
          </button>
          <button
            id={`tab-demo-${project.id}`}
            onClick={() => setActiveTab('demo')}
            className={`pb-2.5 text-xs font-medium border-b-2 mr-5 transition-all outline-none flex items-center gap-1 ${
              activeTab === 'demo' 
                ? `${themeColors.text} border-current font-semibold` 
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            <Sparkles size={11} />
            Demo Interativa
          </button>
          <button
            id={`tab-specs-${project.id}`}
            onClick={() => setActiveTab('specs')}
            className={`pb-2.5 text-xs font-medium border-b-2 transition-all outline-none ${
              activeTab === 'specs' 
                ? `${themeColors.text} border-current font-semibold` 
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            Especificações dev
          </button>
        </div>

        {/* Tab Context Content */}
        <div className="min-h-[250px] relative z-10">
          {/* OverView Tab */}
          {activeTab === 'overview' && (
            <div className="animate-fadeIn">
              <p className="text-sm text-slate-400 leading-relaxed mb-5">
                {project.longDescription}
              </p>
              
              <h4 className="text-xs font-mono font-semibold uppercase text-slate-500 tracking-wider mb-2.5">
                Destaques Do Software
              </h4>
              <ul className="space-y-2 mb-6">
                {project.features.map((feat, i) => (
                  <li id={`feat-${project.id}-${i}`} key={i} className="flex items-start text-xs text-slate-300 leading-relaxed">
                    <CheckCircle size={14} className={`${themeColors.text} shrink-0 mt-0.5 mr-2`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Playground/Demo Tab */}
          {activeTab === 'demo' && (
            <div className="animate-fadeIn bg-[#0A0A0B]/60 p-4 rounded-2xl border border-white/5 text-white select-none">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                <span className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                  Protótipo Interativo Next YM
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* DEMO MULTIPLEXER BASED ON PROJECT */}
              {project.id === 'favorito-supermercado' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-400 font-medium">Adicione produtos e simule a finalização de compras em carrinho reativo:</p>
                  
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div id={`cart-demo-item-${item.id}`} key={item.id} className="flex items-center justify-between text-xs bg-[#111112]/60 p-2 rounded-xl border border-white/5">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-[10px] text-emerald-400 font-mono">R$ {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            id={`btn-dec-${item.id}`}
                            onClick={() => handleRemoveCart(item.id)}
                            className="h-6 w-6 rounded bg-[#0D0D0E] hover:bg-[#111112] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-4 text-center font-mono text-white text-xs">{item.quantity}</span>
                          <button 
                            id={`btn-inc-${item.id}`}
                            onClick={() => handleAddCart(item.id)}
                            className="h-6 w-6 rounded bg-[#0D0D0E] hover:bg-[#111112] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-2">
                    <span className="text-xs font-mono text-slate-400">VALOR TOTAL:</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">R$ {totalCart.toFixed(2)}</span>
                  </div>

                  <button
                    id="btn-whatsapp-simulator"
                    onClick={() => {
                      if (totalCart === 0) {
                        alert('Selecione ao menos um produto para o carrinho!');
                        return;
                      }
                      const orderString = cartItems
                        .filter(item => item.quantity > 0)
                        .map(item => `*${item.quantity}x* ${item.name} (R$ ${(item.price * item.quantity).toFixed(2)})`)
                        .join('%0A');
                      const link = `https://wa.me/5531989449722?text=Ol%C3%A1%20Next%20YM%2C%20gostei%20do%20portf%C3%B3lio%21%20Gostaria%20de%20un%20sistema%20como%20o%20Favorito.%20Pedido%20Simulado%3A%0A${orderString}%0AVarior%20Total%3A%20R%24%20${totalCart.toFixed(2)}`;
                      window.open(link, '_blank');
                    }}
                    className="w-full mt-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold text-xs text-black transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/15"
                  >
                    <ShoppingCart size={13} />
                    Enviar Pedido de Teste (WhatsApp)
                  </button>
                </div>
              )}

              {project.id === 'wrp-construtora' && (
                <div className="space-y-3">
                  <p className="text-[11px] text-slate-400 font-medium">Controle o estágio da obra e m² para prever estatísticas:</p>
                  
                  {/* Slider for size */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Área de Construção:</span>
                      <span className="font-mono text-indigo-400 font-semibold">{buildM2} m²</span>
                    </div>
                    <input 
                      id="m2-slider"
                      type="range" 
                      min="50" 
                      max="500" 
                      value={buildM2} 
                      onChange={(e) => setBuildM2(Number(e.target.value))}
                      className="w-full accent-indigo-400 h-1 rounded-lg bg-[#0D0D0E] cursor-pointer"
                    />
                  </div>

                  {/* Stage Selector buttons */}
                  <div className="grid grid-cols-4 gap-1">
                    {[
                      { key: 'fundacao', label: 'Fundação', progress: 15 },
                      { key: 'alvenaria', label: 'Estrutura', progress: 45 },
                      { key: 'acabamento', label: 'Acabamento', progress: 85 },
                      { key: 'entrega', label: 'Pronto', progress: 100 }
                    ].map((stageObj) => (
                      <button
                        id={`btn-stage-${stageObj.key}`}
                        key={stageObj.key}
                        onClick={() => setConstructionStage(stageObj.key as any)}
                        className={`py-1 px-0.5 rounded text-[10px] font-medium text-center border transition-all ${
                          constructionStage === stageObj.key 
                            ? 'bg-indigo-500 border-indigo-600 text-black font-semibold' 
                            : 'bg-[#0D0D0E] border-white/5 text-slate-400 hover:text-white hover:bg-[#111112]'
                        }`}
                      >
                        {stageObj.label}
                      </button>
                    ))}
                  </div>

                  {/* dynamic progress indicator */}
                  <div className="space-y-1 bg-[#111112]/80 p-2.5 rounded-xl border border-white/5">
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>PROGRESSO DA OBRA:</span>
                      <span className="text-indigo-400 font-semibold font-mono">
                        {constructionStage === 'fundacao' && '15%'}
                        {constructionStage === 'alvenaria' && '45%'}
                        {constructionStage === 'acabamento' && '85%'}
                        {constructionStage === 'entrega' && '100%'}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#0D0D0E] rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full transition-all duration-500"
                        style={{ 
                          width: constructionStage === 'fundacao' ? '15%' :
                                 constructionStage === 'alvenaria' ? '45%' :
                                 constructionStage === 'acabamento' ? '85%' : '100%'
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 italic leading-tight">
                      {constructionStage === 'fundacao' && '🔨 Fundação iniciada: Perfuração profunda e estacas estruturais em progresso.'}
                      {constructionStage === 'alvenaria' && '🏗️ Alvenaria & Laje: Paredes erguidas e pavimentos selados sob engenharia rigorosa.'}
                      {constructionStage === 'acabamento' && '✨ Revestimento & Luzes: Fase de pintura fina, porcelanatos e detalhes de luxo.'}
                      {constructionStage === 'entrega' && '🔑 Chaves entregues! Empreendimento selado e validado Next YM.'}
                    </p>
                  </div>

                  {/* Calculated metrics */}
                  <div className="flex justify-between items-center text-[11px] font-mono bg-[#111112] p-2 border border-white/5 rounded-xl">
                    <span className="text-slate-500">Valor Estimado:</span>
                    <span className="text-indigo-400 font-bold font-mono">
                      R$ {(buildM2 * (constructionStage === 'fundacao' ? 1800 : constructionStage === 'alvenaria' ? 2400 : constructionStage === 'acabamento' ? 3200 : 3800)).toLocaleString('pt-br')},00
                    </span>
                  </div>
                </div>
              )}

              {project.id === 'dapper-style' && (
                <div className="space-y-3">
                  {!agendado ? (
                    <div className="space-y-2.5">
                      {/* Service selector */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wide">Rito / Combo:</label>
                        <select 
                          id="select-service-demo"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full text-xs bg-[#111112] border border-white/10 rounded-xl p-1.5 focus:outline-none focus:border-indigo-500 text-slate-200"
                        >
                          {services.map((serv, i) => (
                            <option key={i} value={serv}>{serv}</option>
                          ))}
                        </select>
                      </div>

                      {/* Professional and Time in grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wide">Especialista:</label>
                          <select 
                            id="select-stylist-demo"
                            value={selectedStylist}
                            onChange={(e) => setSelectedStylist(e.target.value)}
                            className="w-full text-xs bg-[#111112] border border-white/10 rounded-xl p-1.5 focus:outline-none focus:border-indigo-500 text-slate-200"
                          >
                            {stylists.map((st, i) => (
                              <option key={i} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wide">Horário Disponível:</label>
                          <select 
                            id="select-time-demo"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            className="w-full text-xs bg-[#111112] border border-white/10 rounded-xl p-1.5 focus:outline-none focus:border-indigo-500 text-slate-200"
                          >
                            {times.map((tm, i) => (
                              <option key={i} value={tm}>{tm}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <button
                        id="btn-confirm-booking-demo"
                        onClick={() => setAgendado(true)}
                        className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 font-semibold text-xs text-black rounded-xl transition-all flex items-center justify-center gap-1 shadow-md shadow-indigo-500/15"
                      >
                        <Calendar size={13} />
                        Confirmar Agendamento Dapper
                      </button>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden bg-[#111112] border border-indigo-500/30 p-3 rounded-xl flex flex-col justify-center text-center items-center animate-fadeIn space-y-2">
                      <div className="h-10 w-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Check size={20} className="animate-bounce" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">AGENDADO COM SUCESSO!</h4>
                        <p className="text-[11px] text-slate-300 font-mono mt-1">
                          {selectedService}
                        </p>
                        <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                          Profissional: <span className="font-semibold text-white">{selectedStylist}</span> <br/>
                          Horário reservado às <span className="font-semibold text-white">{selectedTime}</span>
                        </p>
                      </div>
                      <button 
                        id="btn-restart-booking-demo"
                        onClick={() => setAgendado(false)}
                        className="text-[10px] text-slate-500 hover:text-white underline mt-1"
                      >
                        Configurar Novo Agendamento
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Code specs Tab */}
          {activeTab === 'specs' && (
            <div className="animate-fadeIn space-y-4">
              <div>
                <h4 className="text-[10px] font-mono font-semibold uppercase text-slate-500 tracking-wider mb-2">
                  Stack Tecnológica
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span 
                      id={`tech-${project.id}-${i}`}
                      key={i} 
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111112] text-slate-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-mono font-semibold uppercase text-slate-500 tracking-wider mb-2">
                  Performance & Métricas Avançadas
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {project.mockStats.map((stat, i) => (
                    <div id={`stat-box-${project.id}-${i}`} key={i} className="bg-[#111112]/60 p-2 rounded-xl border border-white/5">
                      <p className="text-[10px] text-slate-500 tracking-tight leading-tight">{stat.label}</p>
                      <p className={`text-base font-bold font-mono ${themeColors.text} mt-1`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#0A0A0B]/40 border border-white/5 text-xs text-slate-400">
                <Code size={14} className={`${themeColors.text}`} />
                <span>Otimizado com SEO avançado, acessibilidade WCAG e design responsivo fluido.</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1 text-slate-500 text-[11px] font-mono">
          <Flame size={12} className={themeColors.text} />
          <span>Next YM SaaS Certified</span>
        </div>
        
        <a 
          id={`btn-visit-main-${project.id}`}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-5 py-2 rounded-xl text-xs font-bold text-black ${themeColors.buttonBg} transition-colors inline-flex items-center gap-1 font-sans`}
        >
          Visitar Site Real
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
