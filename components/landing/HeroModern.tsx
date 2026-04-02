"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Gift } from "lucide-react";

// --- 1. COMPONENTE SVG BOUTIQUE "CORONA DE PRINCESA" ---
const PrincessCrownIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ overflow: "visible" }}
  >
    <defs>
      <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFA8C5" />
        <stop offset="100%" stopColor="#E85D9E" />
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Destellos de fondo */}
    <path 
      d="M50 15 L52 25 L62 27 L52 29 L50 39 L48 29 L38 27 L48 25 Z" 
      fill="#FAD1E6" 
      className="animate-pulse"
    />

    {/* Corona principal */}
    <path 
      d="M15 70 L20 40 L35 55 L50 30 L65 55 L80 40 L85 70 Z" 
      stroke="url(#pinkGradient)" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="#FAD1E6"
      fillOpacity="0.2"
      filter="url(#softGlow)" 
    />
    
    {/* Base de la corona */}
    <line x1="15" y1="75" x2="85" y2="75" stroke="url(#pinkGradient)" strokeWidth="4" strokeLinecap="round" />
    
    {/* Joyas de la corona */}
    <circle cx="20" cy="40" r="4" fill="#fff" stroke="#E85D9E" strokeWidth="2" />
    <circle cx="50" cy="30" r="5" fill="#fff" stroke="#E85D9E" strokeWidth="2.5" />
    <circle cx="80" cy="40" r="4" fill="#fff" stroke="#E85D9E" strokeWidth="2" />
  </svg>
);

export default function HeroBoutique() {
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
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-x-hidden bg-[#AD6F69] transition-colors duration-500 pt-32 pb-12 lg:pt-40 lg:pb-12 will-change-contents">
      
      {/* --- FONDO DECORATIVO SUAVE --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Patrón de puntos muy sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(#FAD1E6_1px,transparent_1px)] [background-size:30px_30px] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Manchas de color pastel flotantes (Blobs) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100/50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FAD1E6]/40 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* COLUMNA IZQUIERDA (Texto de Boutique) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8 w-full max-w-2xl mx-auto lg:mx-0"
        >
          <motion.div variants={fadeInUp} className="w-full flex flex-col items-center lg:items-start">
            
            <h1 className="flex flex-col items-center lg:items-start leading-[1.1]">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-[#FFFDFE] mb-1">
                Vestidos para
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDFE] to-[#FFA8C5]">
                Princesas
              </span>
            </h1>
          </motion.div>

          <motion.p variants={fadeInUp} className="w-full text-base md:text-lg text-[#FFFDFE] leading-relaxed px-2 lg:px-0 font-medium">
            Ropa exclusiva, vestidos hermosos y accesorios mágicos para niñas. 
            Cada prenda está cuidadosamente seleccionada para hacerla brillar.
            <span className="block mt-2 font-bold text-[#FFFDFE]">
              Diseñados para sus momentos más especiales.
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center lg:justify-start">
            {/* BOTÓN CON ACCIÓN DE SCROLL */}
            <button 
                onClick={scrollToCatalog}
                className="group relative px-8 py-4 bg-[#E85D9E] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-[#D14D8B] hover:shadow-xl hover:shadow-[#E85D9E]/30 active:scale-95 cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explorar Colección <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="pt-6 md:pt-8 flex flex-wrap gap-6 md:gap-10 border-t border-[#FAD1E6] w-full lg:w-auto justify-center lg:justify-start">
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[#FFFDFE]">0 a 12</h3>
              <p className="text-[10px] md:text-xs text-[#FFFDFE] uppercase tracking-wider font-semibold">Tallas Disp.</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[#FFFDFE]">Local 114</h3>
              <p className="text-[10px] md:text-xs text-[#FFFDFE] uppercase tracking-wider font-semibold">CC El Progreso</p>
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-[#FFFDFE]">100%</h3>
              <p className="text-[10px] md:text-xs text-[#FFFDFE] uppercase tracking-wider font-semibold">Garantizado</p>
            </div>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA (Composición Mágica / Princesa) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative h-[350px] md:h-[450px] lg:h-[600px] flex items-center justify-center pointer-events-none mt-4 lg:mt-0"
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
            
            {/* Contenedor central Glassmorphism (Espejo / Tarjeta) */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 m-auto w-64 h-80 md:w-80 md:h-96 bg-white/60 backdrop-blur-md rounded-[40px] border-2 border-white shadow-[0_20px_50px_-10px_rgba(232,93,158,0.2)] flex flex-col items-center justify-center z-20 overflow-hidden"
            >
               {/* Resplandor interno */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#FAD1E6]/50 rounded-full blur-2xl" />
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFA8C5]/30 rounded-full blur-2xl" />

               <div className="w-[60%] h-[60%] relative z-10">
                  <PrincessCrownIcon className="w-full h-full drop-shadow-xl" />
               </div>
               <p className="mt-4 text-[#E85D9E] font-display font-bold text-lg z-10">Nueva Colección</p>
            </motion.div>

            {/* Tarjeta Flotante Superior (Regalo) */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-4 -right-4 md:top-12 md:-right-8 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-xl border border-white z-30"
            >
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-[#FAD1E6]/50 rounded-xl">
                    <Gift className="w-5 h-5 text-[#E85D9E]" />
                 </div>
                 <div>
                   <p className="text-[10px] text-[#7B5C73] font-bold uppercase tracking-wider">Envíos</p>
                   <p className="text-xs md:text-sm font-bold text-[#33182B]">A todo el país</p>
                 </div>
               </div>
            </motion.div>

            {/* Tarjeta Flotante Inferior (Corazón) */}
            <motion.div 
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 -left-6 md:bottom-20 md:-left-12 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-xl border border-white z-30"
            >
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-red-50 rounded-xl">
                    <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                 </div>
                 <div>
                   <p className="text-[10px] text-[#7B5C73] font-bold uppercase tracking-wider">Detalles</p>
                   <p className="text-xs md:text-sm font-bold text-[#33182B]">Hechos con amor</p>
                 </div>
               </div>
            </motion.div>

            {/* Chispas flotantes decorativas */}
            <Sparkles className="absolute top-1/4 -left-4 w-6 h-6 text-[#FFA8C5] animate-pulse" />
            <Sparkles className="absolute bottom-1/4 -right-4 w-8 h-8 text-[#E85D9E] opacity-50 animate-bounce" />

          </div>
        </motion.div>
      </div>
    </section>
  );
}