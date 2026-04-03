"use client";

import { motion } from "framer-motion";
import { Check, Star, Heart } from "lucide-react";

const REVIEWS = [
  { id: "fb-001", user: "María Camila M.", role: "Mamá Feliz", rating: 5, text: "¡El vestido es hermoso! La tela es súper suave y a mi hija le encantó. Definitivamente volveré a comprar aquí para su próximo cumpleaños.", date: "Hace 2 días" },
  { id: "fb-002", user: "Daniela R.", role: "Tía Orgullosa", rating: 5, text: "Llegó súper rápido y empacado divino. Se nota el amor que le ponen a cada detalle. Recomendadísimo.", date: "Hace 5 días" },
  { id: "fb-003", user: "Laura V.", role: "Mamá Feliz", rating: 5, text: "La talla le quedó perfecta. Es muy difícil encontrar ropa tan linda y cómoda a la vez. ¡10/10!", date: "Hace 1 semana" },
  { id: "fb-004", user: "Patricia G.", role: "Abuela", rating: 5, text: "Compré este conjunto para mi nieta y quedó encantada. Los colores son idénticos a la foto y la calidad es excelente.", date: "Hace 2 semanas" },
  { id: "fb-005", user: "Valentina O.", role: "Cliente Frecuente", rating: 4, text: "Siempre compro la ropa de mi nena aquí, las costuras son súper delicadas y no le pican para nada.", date: "Hace 1 mes" },
];

const AnimatedStar = ({ delay }: { delay: number }) => (
  <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm">
    <motion.path 
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      initial={{ pathLength: 0, opacity: 0, scale: 0.5 }}
      whileInView={{ pathLength: 1, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    />
  </motion.svg>
);

export default function ProductReviews() {
  return (
    <div className="w-full relative py-8">
       <div className="mb-8 px-4 text-center">
         <h3 className="text-3xl font-display font-bold text-[#33182B] mb-2">Princesas Felices</h3>
         <p className="text-[#7B5C73] text-sm">Lo que dicen nuestras clientas sobre esta prenda</p>
       </div>

       <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 px-4 md:px-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] cursor-grab active:cursor-grabbing">
          {REVIEWS.map((review, i) => (
             <motion.div
               key={review.id}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.4, delay: i * 0.1 }}
               className="snap-center shrink-0 w-[300px] md:w-[340px]"
             >
                <div className="h-full bg-white border border-[#FAD1E6] rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-[#E85D9E]/50 transition-all duration-300 hover:shadow-[0_15px_30px_-10px_rgba(232,93,158,0.15)]">
                   
                   <div className="absolute top-0 right-0 w-24 h-24 bg-[#FAD1E6]/20 rounded-full blur-2xl" />

                   <div className="flex justify-between items-start relative z-10">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FAD1E6] to-pink-100 flex items-center justify-center text-[#E85D9E] font-display font-bold text-lg shadow-sm">
                            {review.user.charAt(0)}
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-[#33182B]">{review.user}</h4>
                            <div className="flex items-center gap-1 text-[10px] text-[#7B5C73] font-bold uppercase tracking-wider">
                               <Heart className="w-3 h-3 text-[#FFA8C5] fill-[#FFA8C5]" /> {review.role}
                            </div>
                         </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#7B5C73] bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                         {review.date}
                      </span>
                   </div>

                   <div className="flex gap-1 my-1">
                      {[...Array(5)].map((_, starIndex) => (
                         <AnimatedStar key={starIndex} delay={0.2 + (starIndex * 0.1)} />
                      ))}
                   </div>

                   <p className="text-sm text-[#7B5C73] font-medium leading-relaxed italic relative z-10">
                      &quot;{review.text}&quot;
                   </p>

                   <div className="mt-auto pt-4 border-t border-[#FAD1E6]/50 flex justify-end items-center relative z-10">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#E85D9E] bg-[#FAD1E6]/30 px-2 py-1.5 rounded-full border border-[#FAD1E6]">
                         <Check className="w-3 h-3" /> Compra Verificada
                      </div>
                   </div>

                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
}