"use client";
import { motion } from "framer-motion";
import { Sparkles, Truck, Heart, Scissors, Crown } from "lucide-react";

export default function BoutiqueFeaturesGrid() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto z-10">
      
      {/* Encabezado de Sección */}
      <div className="mb-12 md:flex justify-between items-end border-b border-[#FAD1E6]/60 pb-6">
        <div className="max-w-xl">
          <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#E85D9E] font-sans text-xs font-bold tracking-widest uppercase mb-2 block"
          >
              Nuestra Promesa
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-[#33182B] mb-4 leading-tight">
            Magia en <span className="text-[#E85D9E]">cada detalle</span>
          </h2>
          <p className="text-[#7B5C73] text-sm md:text-base leading-relaxed font-medium">
            Seleccionamos cuidadosamente cada prenda para asegurar que las princesas de la casa 
            se sientan hermosas y cómodas en sus momentos más especiales.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
            <span className="font-sans font-bold text-[10px] text-[#E85D9E] border border-[#FAD1E6] px-4 py-2 rounded-full bg-[#FAD1E6]/30 backdrop-blur-md uppercase tracking-wider">
                Vestidos Exclusivos
            </span>
        </div>
      </div>

      {/* Grid Layout (Bento Box) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[300px]">
        
        {/* Card 1: Calidad y Detalles (Grande) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 relative rounded-[32px] border border-[#FAD1E6]/50 bg-white/60 backdrop-blur-md overflow-hidden group hover:border-[#E85D9E]/30 transition-colors duration-500 min-h-[300px] shadow-[0_8px_30px_rgb(232,93,158,0.04)]"
        >
          <div className="p-8 relative z-10 h-full flex flex-col justify-between">
            <div>
               <div className="w-14 h-14 rounded-2xl bg-[#FAD1E6]/50 flex items-center justify-center mb-5">
                  <Scissors className="w-7 h-7 text-[#E85D9E]" />
               </div>
               <h3 className="text-2xl font-display font-bold text-[#33182B]">Confección Premium</h3>
               <p className="text-[#7B5C73] mt-2 max-w-sm text-sm font-medium leading-relaxed">
                 Telas suaves, costuras delicadas y acabados perfectos. 
                 Nuestros vestidos están diseñados para no irritar la piel y permitir que jueguen con total libertad.
               </p>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-0">
               <span className="text-xs font-bold text-[#E85D9E] bg-[#FAD1E6]/40 px-4 py-1.5 rounded-full">Telas Suaves</span>
               <span className="text-xs font-bold text-[#E85D9E] bg-[#FAD1E6]/40 px-4 py-1.5 rounded-full">Acabados a Mano</span>
            </div>
          </div>

          {/* Gráfico SVG Animado de fondo (Curva suave estilo ola) */}
          <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none translate-z-0">
             <svg className="w-full h-full stroke-[#FAD1E6] fill-[#FAD1E6]/20" viewBox="0 0 300 100" preserveAspectRatio="none">
               <motion.path
                 d="M0,100 C50,60 100,40 150,60 C200,80 250,40 300,50 L300,100 Z"
                 strokeWidth="2"
                 initial={{ y: 20, opacity: 0 }}
                 whileInView={{ y: 0, opacity: 1 }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
               />
             </svg>
          </div>
        </motion.div>

        {/* Card 2: Envíos Rápidos */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="relative rounded-[32px] border border-[#FAD1E6]/50 bg-white/60 backdrop-blur-md p-8 flex flex-col justify-between hover:border-[#E85D9E]/30 transition-colors duration-500 min-h-[250px] shadow-[0_8px_30px_rgb(232,93,158,0.04)]"
        >
           <div>
             <div className="w-12 h-12 rounded-2xl bg-[#FAD1E6]/50 flex items-center justify-center mb-4 shadow-sm">
               <Truck className="w-6 h-6 text-[#E85D9E]" />
             </div>
             <h3 className="text-xl font-display font-bold text-[#33182B]">Envíos Seguros</h3>
             <p className="text-sm text-[#7B5C73] mt-2 font-medium">
               Despachamos tu pedido rápidamente para que la magia llegue a la puerta de tu casa.
             </p>
           </div>
           
           {/* Barra de progreso simulando un caminito rosa */}
           <div className="w-full h-2.5 bg-[#FAD1E6]/30 rounded-full overflow-hidden mt-4">
              <div className="h-full w-3/4 bg-gradient-to-r from-[#FFA8C5] to-[#E85D9E] rounded-full animate-pulse" />
           </div>
        </motion.div>

        {/* Card 3: Hecho con Amor */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="relative rounded-[32px] border border-[#FAD1E6]/50 bg-white/60 backdrop-blur-md p-8 flex flex-col justify-between hover:border-[#E85D9E]/30 transition-colors duration-500 min-h-[250px] shadow-[0_8px_30px_rgb(232,93,158,0.04)]"
        >
           <div>
             <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
               <Heart className="w-6 h-6 text-red-400 fill-red-400" />
             </div>
             <h3 className="text-xl font-display font-bold text-[#33182B]">Hecho con Amor</h3>
             <p className="text-sm text-[#7B5C73] mt-2 font-medium">
               Valoramos el trabajo artesanal. Muchas de nuestras prendas tienen detalles bordados y aplicados con mucho cariño.
             </p>
           </div>
           <div className="flex items-center gap-2 text-[#E85D9E] text-xs font-bold bg-[#FAD1E6]/30 px-3 py-1.5 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              100% GARANTIZADO
           </div>
        </motion.div>

        {/* Card 4: Colección Princesas (Grande Horizontal) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="md:col-span-2 relative rounded-[32px] border border-[#FAD1E6]/50 bg-white/60 backdrop-blur-md p-8 flex items-center overflow-hidden hover:border-[#E85D9E]/30 transition-colors duration-500 min-h-[250px] shadow-[0_8px_30px_rgb(232,93,158,0.04)]"
        >
             <div className="relative z-10 max-w-lg w-full">
                 <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-[#E85D9E]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#E85D9E]">Tallas para todas</span>
                 </div>
                 
                 <h3 className="text-2xl font-display font-bold text-[#33182B] mb-2">Desde bebés hasta niñas</h3>
                 <p className="text-[#7B5C73] text-sm mb-6 max-w-sm font-medium">
                   Manejamos un amplio rango de tallas (desde la talla 0 hasta la 12) para acompañarlas en cada etapa de su crecimiento.
                 </p>

                 {/* Banner decorativo - Reemplazo de la cinta de advertencia */}
                 <div className="relative w-full overflow-hidden rounded-2xl bg-[#FAD1E6]/30 border border-[#FAD1E6] p-3.5 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-[#E85D9E] shrink-0 relative z-10" />
                    <p className="text-xs font-bold text-[#33182B] relative z-10 uppercase tracking-wide">
                        Pregunta por disponibilidad de colores y diseños.
                    </p>
                 </div>
             </div>
             
             {/* Decoración Floral/Circular Abstracta en la esquina */}
             <div className="absolute right-[-60px] top-[-60px] opacity-10 rotate-12 pointer-events-none">
                <div className="w-72 h-72 border-[40px] border-[#E85D9E] rounded-full border-dotted" />
             </div>
        </motion.div>

      </div>
    </section>
  );
}