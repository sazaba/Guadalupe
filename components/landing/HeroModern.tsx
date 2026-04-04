// "use client";
// import { motion, Variants } from "framer-motion";
// import { ArrowRight, Heart, Sparkles, Gift, Star, Plane } from "lucide-react";
// import Image from "next/image";

// import heroImage from "@/app/assets/PG1.webp"; 

// export default function HeroBoutique() {
//   const fadeInUp: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
//     }
//   };

//   const staggerContainer: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.15, delayChildren: 0.1 }
//     }
//   };

//   const scrollToCatalog = () => {
//     const catalogSection = document.getElementById('catalog');
//     if (catalogSection) {
//       catalogSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const floatingParticles = Array.from({ length: 6 }).map((_, i) => ({
//     id: i,
//     size: Math.random() * 4 + 2,
//     x: Math.random() * 100,
//     duration: Math.random() * 10 + 10,
//     delay: Math.random() * 5
//   }));

//   return (
//     <section className="relative w-full min-h-[100dvh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-[#FFFDFE] transition-colors duration-500 pt-32 pb-12 lg:pt-40 lg:pb-12">
      
//       {/* --- FONDO DECORATIVO ANIMADO --- */}
//       <div className="absolute inset-0 w-full h-full pointer-events-none">
//         <div className="absolute inset-0 bg-[radial-gradient(#FAD1E6_1px,transparent_1px)] [background-size:30px_30px] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
//         {floatingParticles.map((particle) => (
//            <motion.div
//              key={particle.id}
//              className="absolute bottom-[-10px] rounded-full bg-[#E85D9E]/30 shadow-[0_0_8px_#E85D9E]"
//              style={{ width: particle.size, height: particle.size, left: `${particle.x}%` }}
//              animate={{ 
//                y: ["0vh", "-100vh"],
//                x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`],
//                opacity: [0, 1, 0]
//              }}
//              transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "linear" }}
//            />
//         ))}

//         <motion.div 
//           animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-pink-100/40 to-purple-100/40 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/3 will-change-transform" 
//         />
//       </div>

//       <div className="container relative z-10 px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
//         {/* COLUMNA IZQUIERDA */}
//         <motion.div 
//           variants={staggerContainer}
//           initial="hidden"
//           animate="visible"
//           className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 md:space-y-8 w-full max-w-2xl mx-auto lg:mx-0"
//         >
//           <div className="w-full flex flex-col items-center lg:items-start">
//             <motion.h1 variants={fadeInUp} className="flex flex-col items-center lg:items-start leading-none relative w-full">
              
//               {/* ✨ AJUSTE: Margen negativo inferior (-mb-2 a -mb-6) para acercar a Guadalupe */}
//               <span className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black -mb-2 md:-mb-4 lg:-mb-6 relative z-10">
//                 Exclusivos
//               </span>
              
//               {/* Se restaura el py-2 original para no afectar el subrayado */}
//               <div className="relative inline-block py-2 w-full flex justify-center lg:justify-start">
//                 <div className="relative inline-block">
                  
//                   <motion.div 
//                     initial={{ clipPath: "inset(0 100% 0 0)" }}
//                     animate={{ clipPath: "inset(0 0% 0 0)" }}
//                     transition={{ 
//                       duration: 1.2, 
//                       ease: "easeInOut",
//                       delay: 0.4 
//                     }}
//                     className="inline-block relative z-10 will-change-transform"
//                     style={{ WebkitClipPath: "inset(0 100% 0 0)" }}
//                   >
//                     {/* Se restaura el py-2 original */}
//                     <span className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#E85D9E] drop-shadow-[3px_3px_0px_#FAD1E6] pr-2 sm:pr-4 py-2 leading-tight">
//                       Guadalupe
//                     </span>
//                   </motion.div>

//                   <svg 
//                     className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-8 md:h-12 pointer-events-none z-0" 
//                     viewBox="0 0 300 30" 
//                     fill="none" 
//                     xmlns="http://www.w3.org/2000/svg"
//                     preserveAspectRatio="none"
//                   >
//                     <motion.path 
//                       d="M 5,15 Q 80,5 150,15 T 295,15" 
//                       stroke="url(#paint0_linear)" 
//                       strokeWidth="6" 
//                       strokeLinecap="round"
//                       initial={{ pathLength: 0, opacity: 0 }}
//                       animate={{ pathLength: 1, opacity: 1 }}
//                       transition={{ duration: 0.8, delay: 1.6, ease: "circOut" }} 
//                     />
//                     <defs>
//                       <linearGradient id="paint0_linear" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
//                         <stop stopColor="#E85D9E" />
//                         <stop offset="0.5" stopColor="#D14D8B" />
//                         <stop offset="1" stopColor="#FFA8C5" />
//                       </linearGradient>
//                     </defs>
//                   </svg>
                  
//                   <motion.div
//                     initial={{ left: "0%", top: "50%", opacity: 0 }}
//                     animate={{ 
//                       left: ["0%", "15%", "35%", "50%", "75%", "100%"], 
//                       top: ["50%", "30%", "65%", "40%", "60%", "50%"], 
//                       opacity: [0, 1, 1, 1, 1, 0] 
//                     }}
//                     transition={{ 
//                       duration: 1.2, 
//                       ease: "easeInOut", 
//                       delay: 0.4 
//                     }}
//                     className="absolute -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 pointer-events-none z-20 will-change-transform"
//                   >
//                     <motion.div
//                       animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
//                       transition={{ duration: 0.4, repeat: Infinity }}
//                       className="w-full h-full"
//                     >
//                       <Sparkles className="w-full h-full text-[#E85D9E] drop-shadow-[0_0_10px_#FFA8C5] fill-white" />
//                     </motion.div>
//                   </motion.div>

//                 </div>
//               </div>
//             </motion.h1>
//           </div>

//           <motion.p variants={fadeInUp} className="w-full text-base md:text-lg text-[#7B5C73] leading-relaxed px-2 lg:px-0 font-medium">
//             Ropa exclusiva, vestidos hermosos y accesorios mágicos para niñas. 
//             Cada prenda está cuidadosamente seleccionada para hacerla brillar.
//             <span className="block mt-2 font-bold text-[#E85D9E]">
//               Diseñados para sus momentos más especiales.
//             </span>
//           </motion.p>

//           <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center lg:justify-start">
//             <button 
//                 onClick={scrollToCatalog}
//                 className="group relative px-8 py-4 bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_25px_-5px_rgba(232,93,158,0.5)] active:scale-95 cursor-pointer border border-[#FAD1E6]/30"
//             >
//               <motion.div 
//                 animate={{ x: ["-100%", "200%"] }}
//                 transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
//                 className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 will-change-transform"
//               />
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 Explorar Colección <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//               </span>
//             </button>
//           </motion.div>
          
//           <motion.div variants={fadeInUp} className="pt-6 md:pt-8 flex flex-wrap gap-6 md:gap-10 border-t border-[#FAD1E6] w-full lg:w-auto justify-center lg:justify-start">
//             <motion.div whileHover={{ y: -2 }} className="text-center lg:text-left transition-transform">
//               <h3 className="text-xl md:text-2xl font-bold text-[#33182B]">0 a 12</h3>
//               <p className="text-[10px] md:text-xs text-[#7B5C73] uppercase tracking-wider font-semibold">Tallas Disp.</p>
//             </motion.div>
//             <motion.div whileHover={{ y: -2 }} className="text-center lg:text-left transition-transform">
//               <h3 className="text-xl md:text-2xl font-bold text-[#33182B]">Local 114</h3>
//               <p className="text-[10px] md:text-xs text-[#7B5C73] uppercase tracking-wider font-semibold">CC El Progreso</p>
//             </motion.div>
//             <motion.div whileHover={{ y: -2 }} className="text-center lg:text-left transition-transform">
//               <h3 className="text-xl md:text-2xl font-bold text-[#33182B]">100%</h3>
//               <p className="text-[10px] md:text-xs text-[#7B5C73] uppercase tracking-wider font-semibold">Garantizado</p>
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         {/* COLUMNA DERECHA */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 40 }}
//           className="relative h-[350px] md:h-[450px] lg:h-[600px] flex items-center justify-center mt-4 lg:mt-0"
//         >
//           <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]">
            
//             <motion.div 
//               animate={{ rotate: 360 }}
//               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//               className="absolute inset-[-20px] rounded-full border-[1.5px] border-dashed border-[#E85D9E]/30 opacity-60 will-change-transform"
//             />
//             <motion.div 
//               animate={{ rotate: -360 }}
//               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//               className="absolute inset-[-40px] rounded-full border-[1px] border-[#FAD1E6]/40 will-change-transform"
//             >
//               <div className="absolute top-4 right-10 w-2.5 h-2.5 bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5] rounded-full shadow-[0_0_12px_#E85D9E]" />
//             </motion.div>

//             <motion.div 
//               animate={{ y: [-10, 10, -10] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//               className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2.5rem] md:rounded-[4rem] border-[4px] border-white/80 shadow-[0_25px_50px_-12px_rgba(232,93,158,0.3)] flex items-center justify-center z-20 overflow-hidden group will-change-transform"
//             >
//                {heroImage ? (
//                   <Image 
//                     src={heroImage} 
//                     alt="Colección Guadalupe" 
//                     fill 
//                     className="object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
//                     priority
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                   />
//                ) : (
//                   <div className="text-[#E85D9E] font-medium opacity-50">Sube tu foto aquí</div>
//                )}
               
//                <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/30 via-transparent to-transparent pointer-events-none" />
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, x: -30, y: 10 }}
//               animate={{ opacity: 1, x: 0, y: [0, 10, 0], rotate: [0, 2, 0] }}
//               transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2, opacity: { duration: 1, delay: 1.5 } }}
//               className="absolute top-1/4 -left-10 md:-left-20 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 z-30 pointer-events-none will-change-transform"
//             >
//                <div className="flex items-center gap-3">
//                  <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-sm">
//                     <Plane className="w-5 h-5 text-indigo-400" />
//                  </div>
//                  <div>
//                    <p className="text-[10px] text-[#7B5C73] font-bold uppercase tracking-wider">Envíos</p>
//                    <p className="text-xs md:text-sm font-bold text-[#33182B]">Internacionales</p>
//                  </div>
//                </div>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, x: 20, y: 20 }}
//               animate={{ opacity: 1, x: 0, y: [0, -8, 0], rotate: [0, 3, 0] }}
//               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", opacity: { duration: 1, delay: 0.8 } }}
//               className="absolute -top-4 -right-4 md:top-8 md:-right-12 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 z-30 pointer-events-none will-change-transform"
//             >
//                <div className="flex items-center gap-3">
//                  <div className="p-2.5 bg-gradient-to-br from-[#FAD1E6] to-pink-100 rounded-xl shadow-sm">
//                     <Gift className="w-5 h-5 text-[#E85D9E]" />
//                  </div>
//                  <div>
//                    <p className="text-[10px] text-[#7B5C73] font-bold uppercase tracking-wider">Envíos</p>
//                    <p className="text-xs md:text-sm font-bold text-[#33182B]">A todo el país</p>
//                  </div>
//                </div>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, x: -20, y: -20 }}
//               animate={{ opacity: 1, x: 0, y: [0, 8, 0], rotate: [0, -3, 0] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5, opacity: { duration: 1, delay: 1 } }}
//               className="absolute -bottom-8 -left-6 md:-bottom-4 md:-left-12 bg-white/90 backdrop-blur-xl p-3 md:p-4 rounded-2xl shadow-xl border border-white/50 z-30 pointer-events-none will-change-transform"
//             >
//                <div className="flex items-center gap-3">
//                  <motion.div 
//                     animate={{ scale: [1, 1.15, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="p-2.5 bg-red-50/80 rounded-xl shadow-sm"
//                  >
//                     <Heart className="w-5 h-5 text-red-400 fill-red-400" />
//                  </motion.div>
//                  <div>
//                    <p className="text-[10px] text-[#7B5C73] font-bold uppercase tracking-wider">Detalles</p>
//                    <p className="text-xs md:text-sm font-bold text-[#33182B]">Hechos con amor</p>
//                  </div>
//                </div>
//             </motion.div>

//             <motion.div animate={{ rotate: 180, scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 -right-8 md:-right-12 z-30 pointer-events-none will-change-transform">
//                <Star className="w-6 h-6 text-[#FFA8C5] fill-[#FFA8C5] opacity-80" />
//             </motion.div>
//             <motion.div animate={{ rotate: -180, scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} className="absolute bottom-1/4 -right-6 md:-right-10 z-30 pointer-events-none will-change-transform">
//                <Sparkles className="w-8 h-8 text-[#E85D9E] opacity-60" />
//             </motion.div>

//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }


"use client";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// IMPORTACIONES
import bgDesktop from "@/app/assets/bg-desktop.webp"; 
import bgMobile from "@/app/assets/bg-mobile.webp";

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
      transition: { staggerChildren: 0.15, delayChildren: 0.8 }
    }
  };

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-end overflow-hidden bg-[#FFFDFE] pb-10 md:pb-12 px-4 md:px-6">
      
      {/* --- FONDO PROTAGONISTA --- */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        
        {/* Móvil */}
        <div className="block md:hidden relative w-full h-full">
          <Image
            src={bgMobile}
            alt="Fondo Exclusivos Guadalupe Móvil"
            fill
            className="object-cover object-top"
            priority
            quality={85}
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:block relative w-full h-full">
          <Image
            src={bgDesktop}
            alt="Fondo Exclusivos Guadalupe Desktop"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>

        {/* Gradiente inferior: Reducido a 1/3 para no tapar los maniquíes, solo da legibilidad a los textos inferiores */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 via-white/50 to-transparent"></div>
      </div>

      {/* Título oculto para SEO */}
      <h1 className="sr-only">Exclusivos Guadalupe - Ropa exclusiva para niñas</h1>

      {/* --- CONTENEDOR DE INFORMACIÓN (SIN RECUADRO) --- */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        // Se removieron los fondos, bordes y el backdrop-blur. Se maneja solo como contenedor flex.
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-8"
      >
        
        {/* Botón Explorar Colección */}
        <motion.div variants={fadeInUp}>
          <button 
              onClick={scrollToCatalog}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#D14D8B] to-[#B03A70] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_25px_-5px_rgba(209,77,139,0.5)] active:scale-95 cursor-pointer border border-[#FAD1E6]/30"
          >
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 will-change-transform"
            />
            <span className="relative z-10 flex items-center justify-center gap-2 shadow-sm">
              Explorar Colección <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
        
        {/* Información / Métricas */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-8 md:gap-16 w-full justify-center">
          <motion.div whileHover={{ y: -2 }} className="text-center transition-transform">
            <h3 className="text-xl md:text-2xl font-bold text-[#1A0C16]">0 a 12</h3>
            <p className="text-[10px] md:text-xs text-[#5A4053] uppercase tracking-wider font-semibold">Tallas Disp.</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="text-center transition-transform">
            <h3 className="text-xl md:text-2xl font-bold text-[#1A0C16]">Local 114</h3>
            <p className="text-[10px] md:text-xs text-[#5A4053] uppercase tracking-wider font-semibold">CC El Progreso</p>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} className="text-center transition-transform">
            <h3 className="text-xl md:text-2xl font-bold text-[#1A0C16]">100%</h3>
            <p className="text-[10px] md:text-xs text-[#5A4053] uppercase tracking-wider font-semibold">Garantizado</p>
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}