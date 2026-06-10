import React, { useState, useEffect } from 'react';
import HippoLogo from './HippoLogo';
import { Send, Menu, X, ArrowUpRight, MessageCircle, Instagram } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Projetos', href: '#projetos' },
    { label: 'Nosso Processo', href: '#processo' },
    { label: 'Contato', href: '#contato' }
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#0D0D0E]/85 backdrop-blur-md py-4 border-b border-white/5 shadow-lg shadow-black/20' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand title */}
          <a 
            id="nav-brand-logo"
            href="#inicio" 
            onClick={(e) => handleScrollToSection(e, '#inicio')}
            className="flex items-center gap-3 group"
          >
            <HippoLogo size={36} className="bg-[#0A0A0B]/50 p-1.5 rounded-xl border border-white/5 shadow-md" />
            <div className="flex flex-col">
              <span className="font-display font-black text-lg md:text-xl tracking-tight text-white flex items-center">
                Next <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent ml-1.5">YM</span>
              </span>
              <span className="text-[9px] font-mono tracking-[0.25em] text-slate-500 uppercase leading-none">
                Software & SaaS
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item, i) => (
              <a
                id={`nav-link-desktop-${i}`}
                key={i}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 relative py-1 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-550 to-sky-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Call to Actions (Social Buttons) */}
          <div className="hidden md:flex items-center gap-3">
            <a
              id="nav-insta-cta"
              href="https://www.instagram.com/admnextym/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#0A0A0B] hover:bg-[#111112] hover:text-indigo-400 border border-white/10 text-slate-400 transition-all flex items-center justify-center"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>

            <a
              id="nav-whatsapp-cta"
              href="https://wa.me/5531989449722?text=Ol%C3%A1%20Next%20YM%2C%20visitei%20o%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%21"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/15"
            >
              <MessageCircle size={15} />
              Conversar WhatsApp
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <a
              id="nav-whatsapp-mobile-icon"
              href="https://wa.me/5531989449722?text=Ol%C3%A1%20Next%20YM%2C%20visitei%20o%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%21"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-500 text-black flex items-center justify-center"
            >
              <MessageCircle size={18} />
            </a>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#0D0D0E] border border-white/5 text-slate-400 hover:text-white hover:bg-[#111112] focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-menu-drawer"
        className={`md:hidden fixed inset-x-0 top-[73px] bg-[#0D0D0E] border-b border-white/5 p-6 space-y-4 transition-all duration-300 ease-in-out shadow-2xl ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-4">
          {menuItems.map((item, i) => (
            <a
              id={`nav-link-mobile-${i}`}
              key={i}
              href={item.href}
              onClick={(e) => handleScrollToSection(e, item.href)}
              className="text-base font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="h-px bg-white/5 my-2" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              id="nav-insta-mobile-cta"
              href="https://www.instagram.com/admnextym/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0A0A0B] border border-white/5 text-slate-300 text-sm font-medium hover:bg-[#111112]"
            >
              <Instagram size={16} className="text-indigo-400" />
              Instagram
            </a>
            <a
              id="nav-whatsapp-mobile-cta"
              href="https://wa.me/5531989449722?text=Ol%C3%A1%20Next%20YM%2C%20visitei%20o%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 text-black text-sm font-bold shadow-md"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
