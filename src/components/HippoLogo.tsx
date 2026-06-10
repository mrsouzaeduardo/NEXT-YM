import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HippoLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
  variant?: 'icon' | 'full' | 'text-only';
  themeColor?: 'light' | 'dark' | 'neon';
}

export default function HippoLogo({ 
  className = '', 
  size = 48, 
  animated = true,
  variant = 'icon',
  themeColor = 'neon'
}: HippoLogoProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Synchronize with database (localStorage)
  useEffect(() => {
    const handleLogoUpdate = () => {
      const stored = localStorage.getItem('nextym_hippo_logo');
      setLogoSrc(stored);
      if (!stored) {
        setImageLoaded(false);
      }
    };

    // Load initial values
    handleLogoUpdate();

    // Listen to custom upload events for hot-swapping
    window.addEventListener('nextym-logo-updated', handleLogoUpdate);
    return () => {
      window.removeEventListener('nextym-logo-updated', handleLogoUpdate);
    };
  }, []);

  // Soft scale hover class for animations
  const hoverClass = animated ? 'transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]' : '';

  return (
    <div 
      className={`relative inline-block select-none overflow-hidden ${hoverClass} ${className}`}
      style={{ width: variant === 'full' ? 'auto' : size, height: size }}
    >
      <AnimatePresence mode="wait">
        {logoSrc ? (
          // Renders custom uploaded image fluidly from database
          <motion.div
            key="custom-image"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full h-full flex items-center justify-center"
            style={{ width: variant === 'full' ? '180px' : size }}
          >
            {/* Shimmer loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 rounded-xl bg-slate-800/80 animate-pulse flex items-center justify-center">
                <div className="w-1/2 h-1/2 rounded-full border border-white/10 border-t-indigo-500 animate-spin" />
              </div>
            )}
            
            <img
              src={logoSrc}
              alt="Next YM Hippo Logo (DB)"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              className={`object-contain max-h-full max-w-full rounded-md transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.div>
        ) : (
          // Renders official high-fidelity low-poly vectors mimicking the attachment
          <motion.div
            key="vector-svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center"
          >
            <svg
              width="100%"
              height="100%"
              viewBox={variant === 'full' ? '0 0 460 130' : '0 0 200 200'}
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full fill-none"
            >
              <defs>
                {/* Glow & High Fidelity gradients matching attachment exactly */}
                <filter id="vectorGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#6366f1" floodOpacity="0.25" />
                </filter>
                
                {/* Multi-faceted gradients from original file expanded */}
                <linearGradient id="vectorViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="vectorPink" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
                <linearGradient id="vectorOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <linearGradient id="vectorYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
                <linearGradient id="vectorTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
                <linearGradient id="vectorBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>

              {variant === 'full' ? (
                // HORIZONTAL MAIN BRANDING LOGO: HIPPO + "NEXT YM / SOFTWARE & SAAS"
                <g>
                  {/* ICON PIECE: Hippo Head on the left (Scale and shift) */}
                  <g transform="translate(10, 10) scale(0.55)" filter="url(#vectorGlow)">
                    {/* Poly Ear (Back) */}
                    <polygon points="105,30 115,22 120,38 108,45" fill="url(#vectorBlue)" />
                    <polygon points="108,45 120,38 122,48 112,50" fill="url(#vectorViolet)" />
                    {/* Poly Ear (Front) */}
                    <polygon points="90,32 98,24 105,40 95,44" fill="url(#vectorViolet)" />
                    <polygon points="95,44 105,40 106,48 97,52" fill="url(#vectorPink)" />
                    {/* Poly Crown */}
                    <polygon points="97,52 106,48 116,60 100,70" fill="url(#vectorViolet)" />
                    <polygon points="112,50 122,48 130,62 116,60" fill="url(#vectorBlue)" />
                    {/* Back of Neck / Back Polygonal lines */}
                    <polygon points="116,60 130,62 144,92 120,95" fill="url(#vectorBlue)" />
                    <polygon points="130,62 150,75 168,110 144,92" fill="url(#vectorViolet)" />
                    <polygon points="144,92 168,110 160,140 130,132" fill="url(#vectorBlue)" />
                    <polygon points="130,132 160,140 140,165 110,150" fill="url(#vectorPink)" />
                    {/* Forehead */}
                    <polygon points="85,60 100,70 116,60 98,82" fill="url(#vectorPink)" />
                    <polygon points="98,82 116,60 120,95 106,105" fill="url(#vectorOrange)" />
                    {/* Cheek */}
                    <polygon points="106,105 120,95 130,132 110,130" fill="url(#vectorViolet)" />
                    <polygon points="110,130 130,132 110,150 95,145" fill="url(#vectorPink)" />
                    {/* Eye */}
                    <polygon points="85,60 98,82 90,88 78,74" fill="url(#vectorOrange)" />
                    <polygon points="90,88 98,82 106,105 88,102" fill="url(#vectorYellow)" />
                    <polygon points="95,78 98,75 101,80 97,82" fill="#0f172a" />
                    <polygon points="97,75 100,73 99,76" fill="#ffffff" />
                    {/* Nose Bridge */}
                    <polygon points="78,74 90,88 75,108 64,90" fill="url(#vectorOrange)" />
                    <polygon points="75,108 88,102 78,122 66,120" fill="url(#vectorYellow)" />
                    <polygon points="64,90 75,108 55,112 50,98" fill="url(#vectorTeal)" />
                    {/* Snout */}
                    <polygon points="50,98 55,112 36,118 34,102" fill="url(#vectorTeal)" />
                    <polygon points="55,112 75,108 66,120 48,128" fill="url(#vectorTeal)" />
                    <polygon points="36,118 55,112 48,128 32,130" fill="url(#vectorTeal)" />
                    <polygon points="32,130 48,128 42,142 28,138" fill="url(#vectorTeal)" />
                    {/* Chin */}
                    <polygon points="48,128 66,120 78,122 68,140 42,142" fill="url(#vectorBlue)" />
                    <polygon points="68,140 78,122 88,102 106,105 110,130 95,145 68,140" fill="url(#vectorViolet)" />
                    <polygon points="42,142 68,140 95,145 110,150 85,162 55,152" fill="url(#vectorBlue)" />
                    {/* Highlight edges */}
                    <line x1="85" y1="60" x2="100" y2="70" stroke="#fff" strokeWidth="1" opacity="0.4" />
                    <line x1="98" y1="82" x2="106" y2="105" stroke="#fff" strokeWidth="1" opacity="0.4" />
                    <line x1="120" y1="95" x2="130" y2="132" stroke="#fff" strokeWidth="1" opacity="0.4" />
                  </g>

                  {/* Brand Typography Details */}
                  <text 
                    x="135" 
                    y="60" 
                    fill="#ffffff" 
                    className="font-display font-medium select-none" 
                    style={{ fontSize: '38px', fontWeight: 900, letterSpacing: '-0.02em' }}
                  >
                    Next
                  </text>
                  <text 
                    x="225" 
                    y="60" 
                    fill="url(#brandGrad)" 
                    className="font-display font-black select-none" 
                    style={{ fontSize: '38px', fontWeight: 950, letterSpacing: '-0.01em' }}
                  >
                    YM
                  </text>

                  {/* Subtitle / Tech slogan */}
                  <text 
                    x="137" 
                    y="88" 
                    fill="#94a3b8" 
                    className="font-mono tracking-[0.28em] select-none uppercase" 
                    style={{ fontSize: '10px', fontWeight: 600 }}
                  >
                    SOFTWARE & SAAS
                  </text>

                  {/* Tiny status element */}
                  <circle cx="340" cy="84" r="2.5" fill="#10b981" />
                  <text 
                    x="350" 
                    y="88" 
                    fill="#64748b" 
                    className="font-mono select-none" 
                    style={{ fontSize: '8px', letterSpacing: '0.05em' }}
                  >
                    SaaS Certified
                  </text>
                </g>
              ) : (
                // JUST ICON: HIPPO POLY HEAD
                <g filter="url(#vectorGlow)">
                  {/* Ear (Back) */}
                  <polygon points="105,30 115,22 120,38 108,45" fill="url(#vectorBlue)" />
                  <polygon points="108,45 120,38 122,48 112,50" fill="url(#vectorViolet)" />

                  {/* Ear (Front) */}
                  <polygon points="90,32 98,24 105,40 95,44" fill="url(#vectorViolet)" />
                  <polygon points="95,44 105,40 106,48 97,52" fill="url(#vectorPink)" />

                  {/* Crown / Top of Head */}
                  <polygon points="97,52 106,48 116,60 100,70" fill="url(#vectorViolet)" />
                  <polygon points="112,50 122,48 130,62 116,60" fill="url(#vectorBlue)" />

                  {/* Back of Neck */}
                  <polygon points="116,60 130,62 144,92 120,95" fill="url(#vectorBlue)" />
                  <polygon points="130,62 150,75 168,110 144,92" fill="url(#vectorViolet)" />
                  <polygon points="144,92 168,110 160,140 130,132" fill="url(#vectorBlue)" />
                  <polygon points="130,132 160,140 140,165 110,150" fill="url(#vectorPink)" />

                  {/* Forehead / Middle Face */}
                  <polygon points="85,60 100,70 116,60 98,82" fill="url(#vectorPink)" />
                  <polygon points="98,82 116,60 120,95 106,105" fill="url(#vectorOrange)" />

                  {/* Cheek / Throat area */}
                  <polygon points="106,105 120,95 130,132 110,130" fill="url(#vectorViolet)" />
                  <polygon points="110,130 130,132 110,150 95,145" fill="url(#vectorPink)" />
                  
                  {/* Eye Area Sub-polygons */}
                  <polygon points="85,60 98,82 90,88 78,74" fill="url(#vectorOrange)" />
                  <polygon points="90,88 98,82 106,105 88,102" fill="url(#vectorYellow)" />

                  {/* Eye Detail */}
                  <polygon points="95,78 98,75 101,80 97,82" fill="#1e1b4b" />
                  <polygon points="97,75 100,73 99,76" fill="#ffffff" />

                  {/* Bridge of Nose */}
                  <polygon points="78,74 90,88 75,108 64,90" fill="url(#vectorOrange)" />
                  <polygon points="75,108 88,102 78,122 66,120" fill="url(#vectorYellow)" />
                  <polygon points="64,90 75,108 55,112 50,98" fill="url(#vectorTeal)" />

                  {/* Snout / Muzzle */}
                  <polygon points="50,98 55,112 36,118 34,102" fill="url(#vectorTeal)" />
                  <polygon points="55,112 75,108 66,120 48,128" fill="url(#vectorTeal)" />
                  <polygon points="36,118 55,112 48,128 32,130" fill="url(#vectorTeal)" />
                  <polygon points="32,130 48,128 42,142 28,138" fill="url(#vectorTeal)" />

                  {/* Lower Snout / Chin */}
                  <polygon points="48,128 66,120 78,122 68,140 42,142" fill="url(#vectorBlue)" />
                  <polygon points="68,140 78,122 88,102 106,105 110,130 95,145 68,140" fill="url(#vectorViolet)" />
                  <polygon points="42,142 68,140 95,145 110,150 85,162 55,152" fill="url(#vectorBlue)" />

                  {/* Nostril */}
                  <polygon points="40,108 46,107 45,112 39,112" fill="#115e59" opacity="0.8" />

                  {/* Lines */}
                  <line x1="85" y1="60" x2="100" y2="70" stroke="#fff" strokeWidth="0.8" opacity="0.45" />
                  <line x1="98" y1="82" x2="106" y2="105" stroke="#fff" strokeWidth="0.8" opacity="0.45" />
                  <line x1="55" y1="112" x2="75" y2="108" stroke="#fff" strokeWidth="0.8" opacity="0.45" />
                  <line x1="120" y1="95" x2="130" y2="132" stroke="#fff" strokeWidth="0.8" opacity="0.45" />
                </g>
              )}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
