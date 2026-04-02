"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Star, Hand } from "lucide-react";

// 🎬 ENLACES EMBED DE TIKTOK CONFIGURADOS
const REELS = [
  { id: 1, embedUrl: "https://www.tiktok.com/embed/v2/7439520380856831288" },
  { id: 2, embedUrl: "https://www.tiktok.com/embed/v2/7422045466969246982" },
  { id: 3, embedUrl: "https://www.tiktok.com/embed/v2/7422119765465926917" },
  { id: 4, embedUrl: "https://www.tiktok.com/embed/v2/7469510982411226373" }
];

export default function BoutiqueReels() {
  // Estado para saber qué video está siendo interactuado en móviles
  const [activeReel, setActiveReel] = useState<number | null>(null);

  // 🛡️ MAGIA: Resetea el escudo si el usuario hace scroll vertical (baja por la página)
  useEffect(() => {
    const handleScroll = () => {
      setActiveReel((prev) => {
        if (prev !== null) return null;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🛡️ MAGIA: Resetea el escudo si el usuario hace scroll horizontal (mueve el carrusel)
  const handleContainerScroll = () => {
    if (activeReel !== null) setActiveReel(null);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#FFFDFE] z-10" id="reels">
      
      {/* --- ANIMACIONES MÁGICAS DE FONDO --- */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-[-10%] w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-gradient-to-bl from-[#FAD1E6]/40 to-transparent rounded-full blur-[80px] -z-10 pointer-events-none" 
      />
      
      <motion.div 
        animate={{ scale: [1, 1.3, 1], x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-[-10%] w-[350px] md:w-[400px] h-[350px] md:h-[400px] bg-gradient-to-tr from-[#FFA8C5]/30 to-transparent rounded-full blur-[60px] -z-10 pointer-events-none" 
      />

      <motion.div animate={{ rotate: 180, scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-32 left-10 md:left-20 -z-10 hidden md:block">
         <Star className="w-5 h-5 text-[#FFA8C5] fill-[#FFA8C5] opacity-50" />
      </motion.div>
      <motion.div animate={{ rotate: -180, scale: [1, 1.3, 1] }} transition={{ duration: 6, repeat: Infinity, delay: 1 }} className="absolute bottom-32 right-10 md:right-20 -z-10 hidden md:block">
         <Star className="w-6 h-6 text-[#E85D9E] fill-[#E85D9E] opacity-30" />
      </motion.div>

      {/* Encabezado Mágico */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-12 md:mb-16 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAD1E6]/30 border border-[#FAD1E6] mb-4 shadow-[0_4px_15px_-3px_rgba(232,93,158,0.2)]"
        >
          <Play className="w-4 h-4 text-[#E85D9E] fill-[#E85D9E]" />
          <span className="text-xs font-bold text-[#E85D9E] uppercase tracking-widest">En Movimiento</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold text-[#33182B] mb-4"
        >
          La Magia en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">Acción</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#7B5C73] font-medium text-lg"
        >
          Descubre cómo lucen, brillan y se mueven nuestras prendas reales.
        </motion.p>
      </div>

      {/* Contenedor de Reels Responsivo */}
      <div className="w-full pl-4 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onScroll={handleContainerScroll} // Escucha el scroll horizontal
          className="flex overflow-x-auto lg:overflow-visible lg:flex-wrap lg:justify-center gap-5 md:gap-8 pb-12 pt-4 snap-x snap-mandatory pr-4 lg:pr-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {REELS.map((reel) => (
            <motion.div 
              key={reel.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative shrink-0 w-[85vw] max-w-[280px] h-[500px] md:max-w-none md:w-[300px] md:h-[540px] snap-center rounded-[2.5rem] border-[6px] border-white shadow-[0_15px_35px_-10px_rgba(232,93,158,0.2)] hover:shadow-[0_25px_45px_-15px_rgba(232,93,158,0.35)] overflow-hidden bg-[#FFFDFE] flex items-center justify-center"
            >
              
              {/* Cargando base */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <div className="w-8 h-8 border-4 border-[#FAD1E6] border-t-[#E85D9E] rounded-full animate-spin mb-2 shadow-[0_0_15px_rgba(232,93,158,0.3)]"></div>
                 <span className="text-xs font-bold text-[#7B5C73] uppercase tracking-widest animate-pulse">Cargando...</span>
              </div>

              {/* Iframe de TikTok */}
              {/* En PC (md:) siempre tiene puntero. En móvil, depende del estado del escudo */}
              <iframe
                src={reel.embedUrl}
                className={`relative z-10 w-full h-full border-0 rounded-[2rem] transition-all duration-300 ${activeReel === reel.id ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto"}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>

              {/* 🛡️ ESCUDO DE CRISTAL MÓVIL */}
              {/* Se oculta en PC (md:hidden). Desaparece cuando la mamá lo toca */}
              <div 
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-300 md:hidden cursor-pointer ${activeReel === reel.id ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                onClick={() => setActiveReel(reel.id)}
              >
                 {/* Gradiente sutil para que el botón destaque */}
                 <div className="absolute inset-0 bg-black/5" />
                 
                 {/* Botón flotante animado */}
                 <div className="relative bg-white/90 backdrop-blur-md px-5 py-3 rounded-full flex items-center gap-2 shadow-[0_10px_25px_rgba(232,93,158,0.25)] border border-white/60 animate-bounce">
                    <Hand className="w-4 h-4 text-[#E85D9E]" />
                    <span className="text-xs font-bold text-[#33182B] uppercase tracking-wider">Tocar para ver</span>
                 </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}