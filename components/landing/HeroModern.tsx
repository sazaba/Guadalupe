"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Gift, Star } from "lucide-react";
import Image from "next/image";

import heroImage from "@/app/assets/PG1.webp"; 

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
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const floatingParticles = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-[#FFFDFE] transition-colors duration-500 pt-32 pb-12 lg:pt-40 lg:pb-12">
      
      {/* --- FONDO DECORATIVO ANIMADO --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#FAD1E6_1px,transparent_1px)] [background-size:30px_30px] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {floatingParticles.map((particle) => (
           <motion.div
             key={particle.id}
             className="absolute bottom-[-10px] rounded-full bg-[#E85D9E]/30 shadow-[0_0_8px_#E85D9E]"
             style={{ width: particle.size, height: particle.size, left: `${particle.x}%` }}
             animate={{ 
               y: ["0vh", "-100vh"],
               x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`],
               opacity: [0, 1, 0]
             }}
             transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "linear" }}
           />
        ))}

        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-100/40 to-purple-100/40 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/3" 
        />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* COLUMNA IZQUIERDA (Texto de Boutique) */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8 w-full max-w-2xl mx-auto lg:mx-0"
        >
          <div className="w-full flex flex-col items-center lg:items-start">
            <motion.h1 variants={fadeInUp} className="flex flex-col items-center lg:items-start leading-[1.1] relative w-full">
              <span className="block text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#33182B] mb-2">
                Vestidos para
              </span>
              
              {/* EFECTO DE ESCRITURA ESTILO LÁPIZ/CURSIVA */}
              <div className="relative inline-block py-2 w-full flex justify-center lg:justify-start">
                {/* Contenedor que revela el texto gradualmente */}
                <motion.div 
                  initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                  animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                  transition={{ 
                    duration: 3, 
                    ease: "linear", // Un movimiento constante simula mejor un lápiz
                    delay: 0.6 
                  }}
                  className="inline-block relative"
                >
                  <span className="block text-[3.5rem] md:text-7xl lg:text-8xl font-handwriting font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] via-[#D14D8B] to-[#FFA8C5] drop-shadow-md pr-2 sm:pr-4 py-2 leading-none">
                    Princesas
                  </span>
                </motion.div>
                
                {/* Destello mágico que sigue el borde del texto ("La punta del lápiz") */}
                <motion.div
                  initial={{ left: "0%", opacity: 0 }}
                  animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                  transition={{ 
                    duration: 3, 
                    ease: "linear", 
                    delay: 0.6 
                  }}
                  className="absolute top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none z-10"
                >
                  <motion.div
                    animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-full h-full"
                  >
                    <Sparkles className="w-full h-full text-[#E85D9E] drop-shadow-[0_0_10px_#FFA8C5] fill-white" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.h1>
          </div>

          <motion.p variants={fadeInUp} className="w-full text-base md:text-lg text-[#7B5C73] leading-relaxed px-2 lg:px-0 font-medium">
            Ropa exclusiva, vestidos hermosos y accesorios mágicos para niñas. 
            Cada prenda está cuidadosamente seleccionada para hacerla brillar.
            <span className="block mt-2 font-bold text-[#E85D9E]">
              Diseñados para sus momentos más especiales.
            </span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center lg:justify-start">
            <button 
                onClick={scrollToCatalog}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_25px_-5px_rgba(232,93,158,0.5)] active:scale-95 cursor-pointer border border-[#FAD1E6]/30"
            >
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Explorar Colección <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="pt-6 md:pt-8 flex flex-wrap gap-6 md:gap-10 border-t border-[#FAD1E6] w-full lg:w-auto justify-center lg:justify-start">
            <motion.div whileHover={{ y: -2 }} className="text-center lg:text-left transition-transform">
              <h3 className="text-xl md:text-2xl font-bold text-[#33182B]">0 a 12</h3>
              <p className="text-[10px] md:text-xs text-[#7B5C73] uppercase tracking-wider font-semibold">Tallas Disp.</p>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="text-center lg:text-left transition-transform">
              <h3 className="text-xl md:text-2xl font-bold text-[#33182B]">Local 114</h3>
              <p className="text-[10px] md:text-xs text-[#7B5C73] uppercase tracking-wider font-semibold">CC El Progreso</p>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} className="text-center lg:text-left transition-transform">
              <h3 className="text-xl md:text-2xl font-bold text-[#33182B]">100%</h3>
              <p className="text-[10px] md:text-xs text-[#7B5C73] uppercase tracking-wider font-semibold">Garantizado</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* COLUMNA DERECHA (Composición Mágica con FOTO REAL) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 40 }}
          className="relative h-[350px] md:h-[450px] lg:h-[600px] flex items-center justify-center mt-4 lg:mt-0"
        >
          <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]">
            
            {/* Anillos rotatorios decorativos */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-20px] rounded-full border-[1.5px] border-dashed border-[#E85D9E]/30 opacity-60"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-40px] rounded-full border-[1px] border-[#FAD1E6]/40"
            >
              <div className="absolute top-4 right-10 w-2.5 h-2.5 bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5] rounded-full shadow-[0_0_12px_#E85D9E]" />
            </motion.div>

            {/* CONTENEDOR DE IMAGEN PRINCIPAL */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2.5rem] md:rounded-[4rem] border-[4px] border-white/80 shadow-[0_25px_50px_-12px_rgba(232,93,158,0.3)] flex items-center justify-center z-20 overflow-hidden group"
            >
               {heroImage ? (
                  <Image 
                    src={heroImage} 
                    alt="Colección Guadalupe" 
                    fill 
                    className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
               ) : (
                  <div className="text-[#E85D9E] font-medium opacity-50">Sube tu foto aquí</div>
               )}
               
               <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/30 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Tarjeta Flotante Superior (Regalo) */}
            <motion.div 
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -8, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", opacity: { duration: 1, delay: 0.8 } }}
              className="absolute -top-4 -right-4 md:top-8 md:-right-12 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 z-30 pointer-events-none"
            >
               <div className="flex items-center gap-3">
                 <div className="p-2.5 bg-gradient-to-br from-[#FAD1E6] to-pink-100 rounded-xl shadow-sm">
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
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, 8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5, opacity: { duration: 1, delay: 1 } }}
              className="absolute -bottom-8 -left-6 md:-bottom-4 md:-left-16 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 z-30 pointer-events-none"
            >
               <div className="flex items-center gap-3">
                 <motion.div 
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-2.5 bg-red-50/80 rounded-xl shadow-sm"
                 >
                    <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                 </motion.div>
                 <div>
                   <p className="text-[10px] text-[#7B5C73] font-bold uppercase tracking-wider">Detalles</p>
                   <p className="text-xs md:text-sm font-bold text-[#33182B]">Hechos con amor</p>
                 </div>
               </div>
            </motion.div>

            {/* Chispas flotantes */}
            <motion.div animate={{ rotate: 180, scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 -left-8 md:-left-12 z-30 pointer-events-none">
               <Star className="w-6 h-6 text-[#FFA8C5] fill-[#FFA8C5] opacity-80" />
            </motion.div>
            <motion.div animate={{ rotate: -180, scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 -right-6 md:-right-10 z-30 pointer-events-none">
               <Sparkles className="w-8 h-8 text-[#E85D9E] opacity-60" />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}