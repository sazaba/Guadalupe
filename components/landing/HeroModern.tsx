"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";

// --- 1. COMPONENTE SVG PREMIUM "PEPTIDE CORE" (Ajustado) ---
const PeptideCoreIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="peptideGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--color-brand-primary)" />
        <stop offset="100%" stopColor="var(--color-brand-secondary)" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <path 
      d="M50 2 L95 27 V77 L50 102 L5 77 V27 L50 2Z" 
      stroke="url(#peptideGradient)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeDasharray="3 3" 
      className="opacity-40"
    />
    
    <path 
      d="M50 20 V50 L76 65 M50 50 L24 65" 
      stroke="url(#peptideGradient)" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter="url(#glow)" 
    />
    
    <circle cx="50" cy="20" r="5" fill="var(--bg-page)" stroke="var(--color-brand-primary)" strokeWidth="2.5" />
    <circle cx="76" cy="65" r="5" fill="var(--bg-page)" stroke="var(--color-brand-secondary)" strokeWidth="2.5" />
    <circle cx="24" cy="65" r="5" fill="var(--bg-page)" stroke="var(--color-brand-primary)" strokeWidth="2.5" />
    
    <circle cx="50" cy="50" r="8" fill="url(#peptideGradient)" className="animate-pulse" />
  </svg>
);

export default function HeroModern() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // --- FUNCIÓN DE SCROLL AL CATÁLOGO ---
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // OPTIMIZACIÓN SAFARI: 100dvh evita el salto de la barra de navegación
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-x-hidden bg-[var(--bg-page)] transition-colors duration-500 pt-32 pb-12 lg:pt-40 lg:pb-12 will-change-contents">
      
      {/* --- FONDO DECORATIVO --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transform translate-z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-muted)_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.03] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* COLUMNA IZQUIERDA (Texto) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8 w-full max-w-2xl mx-auto lg:mx-0"
        >
          <motion.div variants={fadeInUp} className="w-full flex flex-col items-center lg:items-start">
            <span className="block text-lg md:text-2xl text-[var(--text-muted)] font-medium mb-2 tracking-widest uppercase">
              Advanced Research
            </span>
            
            <h1 className="flex flex-col items-center lg:items-start leading-none">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--text-main)] mb-1 transition-colors duration-300">
                TRANSCENDENT
              </span>
              <span className="block text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">
                LABS &reg;
              </span>
            </h1>
          </motion.div>

          <motion.p variants={fadeInUp} className="w-full text-base md:text-lg text-[var(--text-muted)] leading-relaxed px-2 lg:px-0">
            Pioneering the next evolution of bio-active compounds. We engineer 
            peptides that push the boundaries of human potential. 
            <span className="block mt-2 font-semibold text-[var(--text-main)]">
              Pure. Tested. Beyond Evolution.
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center lg:justify-start">
            {/* BOTÓN CON ACCIÓN DE SCROLL */}
            <button 
                onClick={scrollToCatalog}
                className="group relative px-8 py-4 bg-[var(--text-main)] text-[var(--bg-page)] font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-[var(--color-brand-primary)]/20 active:scale-95 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explore Catalog <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="pt-4 md:pt-8 flex gap-8 border-t border-[var(--glass-border)] w-full lg:w-auto justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)]">99.8%</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Purity</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)]">50+</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Compounds</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)]">24/7</h3>
              <p className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wider">Support</p>
            </div>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA (Molécula 3D Abstracta) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[300px] md:h-[400px] lg:h-[600px] flex items-center justify-center pointer-events-none mt-8 lg:mt-0 transform-gpu"
        >
          {/* Glow de fondo */}
          <div className="absolute inset-0 bg-[var(--accent-glow)] rounded-full blur-[60px] opacity-60 translate-z-0" />

          {/* Estructura Orbital */}
          <div className="relative w-[280px] h-[280px] md:w-[450px] md:h-[450px]">
            
            {/* Anillo Externo */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform" }}
              className="absolute inset-0 rounded-full border border-dashed border-[var(--glass-border)]"
            />
            
            {/* Anillo Interno */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform" }}
              className="absolute inset-8 md:inset-12 rounded-full border border-[var(--glass-border)] opacity-60"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-3 h-3 md:w-4 md:h-4 bg-[var(--color-brand-primary)] rounded-full shadow-[0_0_15px_currentColor]" />
            </motion.div>

            {/* NÚCLEO CENTRAL - CONTENEDOR AJUSTADO (Light Mode Fix) */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="relative w-28 h-28 md:w-40 md:h-40 bg-[var(--bg-page)]/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-[var(--glass-border)] shadow-2xl flex items-center justify-center z-20">
                  
                  <div className="w-[75%] h-[75%] animate-pulse-slow">
                     <PeptideCoreIcon className="w-full h-full drop-shadow-[0_0_15px_rgba(0,201,255,0.4)]" />
                  </div>

                  {/* Órbita interna decorativa */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="absolute inset-1 rounded-full border border-[var(--glass-border)] opacity-30"
                  >
                     <div className="absolute bottom-2 left-1/2 w-1.5 h-1.5 bg-[var(--color-brand-secondary)] rounded-full" />
                  </motion.div>
               </div>
            </div>

            {/* Tarjeta Flotante */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
              className="absolute -top-2 -right-2 md:top-12 md:-right-4 bg-[var(--bg-page)]/90 backdrop-blur-xl p-3 md:p-4 rounded-xl shadow-xl border border-[var(--glass-border)] z-30 scale-90 md:scale-100 origin-bottom-left"
            >
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-[var(--color-brand-primary)]/10 rounded-lg">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-[var(--color-brand-primary)]" />
                 </div>
                 <div>
                   <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Bio-Availability</p>
                   <p className="text-xs md:text-sm font-bold text-[var(--text-main)]">99% Optimized</p>
                 </div>
               </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}