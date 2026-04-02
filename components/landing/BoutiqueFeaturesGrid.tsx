"use client";
import { motion } from "framer-motion";
import { Sparkles, Truck, Heart, Scissors, Crown, Star } from "lucide-react";

export default function BoutiqueFeaturesGrid() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto z-10">
      
      {/* Encabezado de Sección */}
      <div className="mb-12 md:flex justify-between items-end border-b border-[#FAD1E6]/60 pb-6">
        <div className="max-w-xl">
          <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2 mb-2"
          >
              <Sparkles className="w-4 h-4 text-[#E85D9E] animate-pulse" />
              <span className="text-[#E85D9E] font-sans text-xs font-bold tracking-widest uppercase">
                  Nuestra Promesa
              </span>
          </motion.div>
          
          <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-display font-bold text-[#33182B] mb-4 leading-tight"
          >
            Magia en <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">cada detalle</span>
          </motion.h2>
          
          <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-[#7B5C73] text-sm md:text-base leading-relaxed font-medium"
          >
            Seleccionamos cuidadosamente cada prenda para asegurar que las princesas de la casa 
            se sientan hermosas y cómodas en sus momentos más especiales.
          </motion.p>
        </div>
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
            className="mt-6 md:mt-0"
        >
            <span className="flex items-center gap-2 font-sans font-bold text-[10px] text-[#E85D9E] border border-[#FAD1E6] px-4 py-2 rounded-full bg-[#FAD1E6]/30 backdrop-blur-md uppercase tracking-wider shadow-[0_0_15px_rgba(232,93,158,0.15)]">
                <Crown className="w-3 h-3" /> Vestidos Exclusivos
            </span>
        </motion.div>
      </div>

      {/* Grid Layout (Bento Box) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[300px]">
        
        {/* Card 1: Calidad y Detalles (Grande) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:col-span-2 relative rounded-[32px] border border-[#FAD1E6]/50 bg-white/60 backdrop-blur-xl overflow-hidden group min-h-[300px] shadow-[0_8px_30px_rgb(232,93,158,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(232,93,158,0.15)] hover:border-[#E85D9E]/30"
        >
          <div className="p-8 relative z-10 h-full flex flex-col justify-between">
            <div>
               <motion.div 
                 whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                 transition={{ duration: 0.5 }}
                 className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FAD1E6] to-white flex items-center justify-center mb-5 shadow-inner border border-white"
               >
                  <Scissors className="w-7 h-7 text-[#E85D9E]" />
               </motion.div>
               <h3 className="text-2xl font-display font-bold text-[#33182B]">Confección Premium</h3>
               <p className="text-[#7B5C73] mt-2 max-w-sm text-sm font-medium leading-relaxed">
                 Telas suaves, costuras delicadas y acabados perfectos. 
                 Nuestros vestidos están diseñados para no irritar la piel y permitir que jueguen con total libertad.
               </p>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-0">
               <span className="text-xs font-bold text-[#E85D9E] bg-[#FAD1E6]/40 px-4 py-1.5 rounded-full border border-[#FAD1E6]/50">Telas Suaves</span>
               <span className="text-xs font-bold text-[#E85D9E] bg-[#FAD1E6]/40 px-4 py-1.5 rounded-full border border-[#FAD1E6]/50">Acabados a Mano</span>
            </div>
          </div>

          {/* Animación continua de ola de fondo */}
          <motion.div 
             animate={{ y: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-0 right-0 w-2/3 h-1/2 pointer-events-none translate-z-0"
          >
             <svg className="w-full h-full stroke-[#FAD1E6] fill-[#FAD1E6]/30" viewBox="0 0 300 100" preserveAspectRatio="none">
               <path d="M0,100 C50,60 100,40 150,60 C200,80 250,40 300,50 L300,100 Z" strokeWidth="2" />
             </svg>
          </motion.div>

          {/* Estrellitas flotantes mágicas */}
          <motion.div animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="absolute top-10 right-20">
            <Star className="w-4 h-4 text-[#FFA8C5] fill-[#FFA8C5]" />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0], opacity: [0, 0.8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1.5 }} className="absolute bottom-20 right-10">
            <Star className="w-3 h-3 text-[#E85D9E] fill-[#E85D9E]" />
          </motion.div>
        </motion.div>

        {/* Card 2: Envíos Rápidos */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           whileHover={{ y: -8, scale: 1.02 }}
           transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
           className="relative rounded-[32px] border border-[#FAD1E6]/50 bg-white/60 backdrop-blur-xl p-8 flex flex-col justify-between min-h-[250px] shadow-[0_8px_30px_rgb(232,93,158,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(232,93,158,0.15)] hover:border-[#E85D9E]/30 group"
        >
           <div>
             <motion.div 
               whileHover={{ x: 5, scale: 1.1 }}
               className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAD1E6] to-white flex items-center justify-center mb-4 shadow-sm border border-white"
             >
               <Truck className="w-6 h-6 text-[#E85D9E]" />
             </motion.div>
             <h3 className="text-xl font-display font-bold text-[#33182B]">Envíos Seguros</h3>
             <p className="text-sm text-[#7B5C73] mt-2 font-medium">
               Despachamos tu pedido rápidamente para que la magia llegue a la puerta de tu casa.
             </p>
           </div>
           
           {/* Barra animada de progreso */}
           <div className="w-full h-2 bg-[#FAD1E6]/30 rounded-full overflow-hidden mt-4 relative">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#E85D9E] to-transparent rounded-full opacity-60" 
              />
           </div>
        </motion.div>

        {/* Card 3: Hecho con Amor */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           whileHover={{ y: -8, scale: 1.02 }}
           transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
           className="relative rounded-[32px] border border-[#FAD1E6]/50 bg-white/60 backdrop-blur-xl p-8 flex flex-col justify-between min-h-[250px] shadow-[0_8px_30px_rgb(232,93,158,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(232,93,158,0.15)] hover:border-[#E85D9E]/30 group"
        >
           <div>
             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-white border border-white flex items-center justify-center mb-4 shadow-sm">
               {/* Latido constante */}
               <motion.div
                 animate={{ scale: [1, 1.15, 1] }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               >
                 <Heart className="w-6 h-6 text-red-400 fill-red-400 drop-shadow-sm" />
               </motion.div>
             </div>
             <h3 className="text-xl font-display font-bold text-[#33182B]">Hecho con Amor</h3>
             <p className="text-sm text-[#7B5C73] mt-2 font-medium">
               Valoramos el trabajo artesanal. Muchas de nuestras prendas tienen detalles bordados con mucho cariño.
             </p>
           </div>
           
           <motion.div 
             whileHover={{ scale: 1.05 }}
             className="flex items-center gap-2 text-[#E85D9E] text-xs font-bold bg-white px-4 py-2 rounded-full w-fit shadow-[0_4px_10px_-2px_rgba(232,93,158,0.2)] border border-[#FAD1E6]"
           >
              <Sparkles className="w-3.5 h-3.5" />
              100% GARANTIZADO
           </motion.div>
        </motion.div>

        {/* Card 4: Colección Princesas (Grande Horizontal) */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           whileHover={{ y: -8, scale: 1.01 }}
           transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
           className="md:col-span-2 relative rounded-[32px] border border-[#FAD1E6]/50 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl p-8 flex items-center overflow-hidden min-h-[250px] shadow-[0_8px_30px_rgb(232,93,158,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(232,93,158,0.15)] hover:border-[#E85D9E]/30"
        >
             <div className="relative z-10 max-w-lg w-full">
                 <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-[#E85D9E]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E85D9E]">Tallas para todas</span>
                 </div>
                 
                 <h3 className="text-2xl font-display font-bold text-[#33182B] mb-2">Desde bebés hasta niñas</h3>
                 <p className="text-[#7B5C73] text-sm mb-6 max-w-sm font-medium">
                   Manejamos un amplio rango de tallas (desde la 0 hasta la 12) para acompañarlas en cada etapa de su crecimiento.
                 </p>

                 {/* Banner decorativo interactivo */}
                 <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative w-full overflow-hidden rounded-2xl bg-white border border-[#FAD1E6] p-4 flex items-center gap-3 shadow-sm cursor-pointer"
                 >
                    {/* Resplandor que pasa por el botón */}
                    <motion.div 
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                      className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-[#FAD1E6]/40 to-transparent skew-x-12"
                    />
                    
                    <Sparkles className="w-5 h-5 text-[#E85D9E] shrink-0 relative z-10" />
                    <p className="text-xs font-bold text-[#33182B] relative z-10 uppercase tracking-wide">
                        Pregunta por disponibilidad de colores y diseños
                    </p>
                 </motion.div>
             </div>
             
             {/* Decoración Circular Rotatoria en la esquina */}
             <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute right-[-60px] top-[-60px] opacity-10 pointer-events-none"
             >
                <div className="w-72 h-72 border-[40px] border-[#E85D9E] rounded-full border-dotted" />
             </motion.div>
        </motion.div>

      </div>
    </section>
  );
}