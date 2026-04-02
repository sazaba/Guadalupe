"use client";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// 🎬 ENLACES EMBED DE TIKTOK CONFIGURADOS
const REELS = [
  { 
    id: 1, 
    embedUrl: "https://www.tiktok.com/embed/v2/7439520380856831288", 
  },
  { 
    id: 2, 
    embedUrl: "https://www.tiktok.com/embed/v2/7422045466969246982", 
  },
  { 
    id: 3, 
    embedUrl: "https://www.tiktok.com/embed/v2/7422119765465926917", 
  },
  { 
    id: 4, 
    embedUrl: "https://www.tiktok.com/embed/v2/7469510982411226373", 
  }
];

export default function BoutiqueReels() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#FFFDFE] z-10" id="reels">
      
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FAD1E6]/30 to-transparent rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#FFA8C5]/20 to-transparent rounded-full blur-[60px] -z-10 pointer-events-none" />

      {/* Encabezado Mágico */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-16 relative z-20">
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

      {/* Contenedor de Reels (Scroll Horizontal en Móvil, Flex en Desktop) */}
      <div className="w-full pl-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // En móviles es un scroll horizontal fluido (snap), en PC es un Flex centrado
          className="flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide md:justify-center pr-4 md:pr-0"
        >
          {REELS.map((reel) => (
            <motion.div 
              key={reel.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative shrink-0 w-[280px] h-[500px] md:w-[320px] md:h-[560px] snap-center rounded-[2.5rem] border-[6px] border-white shadow-[0_20px_40px_-10px_rgba(232,93,158,0.25)] hover:shadow-[0_30px_50px_-15px_rgba(232,93,158,0.4)] overflow-hidden bg-[#FFFDFE] flex items-center justify-center"
            >
              
              {/* Cargando (Se muestra mientras carga el Iframe de TikTok) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <div className="w-8 h-8 border-4 border-[#FAD1E6] border-t-[#E85D9E] rounded-full animate-spin mb-2"></div>
                 <span className="text-xs font-bold text-[#7B5C73] uppercase tracking-widest animate-pulse">Cargando...</span>
              </div>

              {/* Iframe del Reel de TikTok */}
              <iframe
                src={reel.embedUrl}
                className="relative z-10 w-full h-full border-0 rounded-[2rem]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>

            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}