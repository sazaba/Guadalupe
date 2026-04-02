"use client";
import { motion } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";
import Image from "next/image";

// 📸 1. IMPORTA AQUÍ TUS PANTALLAZOS DESDE ASSETS
import chat1 from "@/app/assets/Testimony1.webp"; 
import chat2 from "@/app/assets/Testimony2.webp";
import chat3 from "@/app/assets/Testimony3.webp";
import chat4 from "@/app/assets/Testimony4.webp";
import chat5 from "@/app/assets/Testimony5.webp";

// 2. ASIGNA LAS IMÁGENES IMPORTADAS AL ARRAY
const REVIEWS = [
  { id: 1, image: chat1 },
  { id: 2, image: chat2 },
  { id: 3, image: chat3 },
  { id: 4, image: chat4 },
  { id: 5, image: chat5 },
];

export default function CustomerReviews() {
  // 🪄 EL TRUCO: Cuadruplicamos para pantallas ultra anchas
  // Al tener 4 sets, si movemos exactamente un 25%, creamos un loop matemáticamente perfecto
  const duplicatedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="relative py-24 overflow-hidden bg-[#FFFDFE] z-10" id="reviews">
      
      {/* Encabezado Mágico */}
      <div className="text-center max-w-2xl mx-auto px-4 mb-16 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAD1E6]/30 border border-[#FAD1E6] mb-4"
        >
          <Star className="w-4 h-4 text-[#E85D9E] fill-[#E85D9E]" />
          <span className="text-xs font-bold text-[#E85D9E] uppercase tracking-widest">Clientes Felices</span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold text-[#33182B] mb-4"
        >
          Mamás <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">Enamoradas</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#7B5C73] font-medium text-lg"
        >
          No lo decimos nosotros, lo dicen las sonrisas de nuestras princesas.
        </motion.p>
      </div>

      {/* Track del Carrusel Infinito */}
      <div className="relative w-full flex items-center justify-center">
        
        {/* Difuminado a los lados para ocultar la entrada/salida de fotos */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#FFFDFE] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#FFFDFE] to-transparent z-20 pointer-events-none" />

        {/* Contenedor Animado */}
        <motion.div 
          animate={{ x: ["0%", "-25%"] }} // -25% de 4 sets = 1 set exacto
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          // w-max obliga a tomar el ancho de todo, pr-X compensa el gap exacto
          className="flex w-max gap-10 md:gap-16 pr-10 md:pr-16 pl-0 py-10"
        >
          {duplicatedReviews.map((review, index) => (
            <div key={`${review.id}-${index}`} className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] shrink-0 flex items-center justify-center">
              
              {/* Anillo punteado exterior */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-15px] md:inset-[-20px] rounded-[3rem] md:rounded-[3.5rem] border border-dashed border-[#FAD1E6] opacity-60 pointer-events-none"
              />
              
              {/* Anillo sólido interior con lucecita */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-25px] md:inset-[-30px] rounded-[3rem] md:rounded-[3.5rem] border border-[#FAD1E6]/40 pointer-events-none"
              >
                <div className="absolute top-8 right-0 w-2 h-2 bg-[#E85D9E] rounded-full shadow-[0_0_10px_#E85D9E]" />
              </motion.div>

              {/* Contenedor del Pantallazo (Proporción Cuadrada) */}
              <motion.div
                animate={{ y: [-10, 10, -10] }} 
                transition={{ duration: 5 + (index % 3), repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] md:rounded-[3rem] border-[4px] border-white shadow-[0_20px_40px_-10px_rgba(232,93,158,0.2)] overflow-hidden group"
              >
                {/* Imagen del pantallazo local */}
                <Image 
                  src={review.image} 
                  alt="Review de cliente" 
                  fill
                  placeholder="blur" 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradiente sutil para darle profundidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/30 via-transparent to-transparent pointer-events-none" />

                {/* Decoración flotante sobre la imagen */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-2xl flex items-center justify-between border border-white/50 shadow-lg pointer-events-none">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FFA8C5] fill-[#FFA8C5]" />
                    ))}
                  </div>
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#E85D9E]" />
                </div>
              </motion.div>

            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}