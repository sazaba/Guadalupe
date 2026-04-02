"use client";
import { motion } from "framer-motion";
import { Play, Star, Sparkles } from "lucide-react";

// 🎬 1. IMPORTA AQUÍ TU VIDEO MP4
// Debe estar alojado en tu proyecto. 
// Recomendación: Usa la carpeta public y pásalo como string directo, 
// no necesitas "importar" el archivo en Next.js para etiquetas de video.
const HERO_VIDEO = "/videos/Tiktok1"; 

export default function BoutiqueReels() {
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

      {/* Encabezado Mágico */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-16 md:mb-20 relative z-20">
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

      {/* --- CONTENEDOR DEL VIDEO ÚNICO (Estilo Hero) --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        className="relative flex items-center justify-center max-w-7xl mx-auto px-4"
      >
        <div className="relative w-[300px] h-[530px] md:w-[380px] md:h-[680px]">
          
          {/* Anillos rotatorios decorativos (EFECTO HERO) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] md:inset-[-30px] rounded-[3.5rem] md:rounded-[4.5rem] border border-dashed border-[#FAD1E6] opacity-60"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-35px] md:inset-[-50px] rounded-[4rem] md:rounded-[5rem] border border-[#FAD1E6]/30"
          >
            <div className="absolute top-10 right-4 w-3 h-3 bg-[#E85D9E] rounded-full shadow-[0_0_15px_#E85D9E]" />
          </motion.div>

          {/* CONTENEDOR PRINCIPAL DEL VIDEO */}
          <motion.div 
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[3rem] md:rounded-[4rem] border-[6px] md:border-[8px] border-white shadow-[0_20px_50px_-10px_rgba(232,93,158,0.3)] flex items-center justify-center z-20 overflow-hidden"
          >
             
             {/* ETIQUETA DE VIDEO LOCAL */}
             <video 
               src={HERO_VIDEO}
               autoPlay
               loop
               muted // Obligatorio para que autoplay funcione en navegadores
               playsInline // Obligatorio para iOS
               className="w-full h-full object-cover scale-[1.02]"
             />
             
             {/* Filtro suave sobre el video para hacerla más premium */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/40 via-transparent to-transparent pointer-events-none" />

             {/* Título interno flotante */}
             <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-30 px-4">
                <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 text-white font-bold text-[10px] uppercase tracking-widest mb-2 shadow-sm">
                  Diseños Exclusivos
                </span>
                <h3 className="text-white font-display font-bold text-xl md:text-2xl drop-shadow-md">
                  Colección Guadalupe
                </h3>
             </div>

          </motion.div>

          {/* Chispas flotantes decorativas animadas (EFECTO HERO) */}
          <motion.div animate={{ rotate: 180, scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 -left-10 md:-left-16 z-30">
             <Star className="w-8 h-8 md:w-10 md:h-10 text-[#FFA8C5] fill-[#FFA8C5] opacity-80" />
          </motion.div>
          <motion.div animate={{ rotate: -180, scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 -right-8 md:-right-14 z-30">
             <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-[#E85D9E] opacity-60" />
          </motion.div>

        </div>
      </motion.div>

    </section>
  );
}