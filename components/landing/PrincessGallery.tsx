"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles, Instagram } from "lucide-react";

// 📸 AQUÍ IMPORTAS TUS FOTOS MANUALMENTE (Asegúrate de que la ruta sea correcta)
// Ejemplo: import foto1 from "@/app/assets/galeria-1.jpg";
// Por ahora usaré strings vacíos o placeholders para que no te dé error antes de subirlas.
import img1 from "@/app/assets/PG1.webp"; // Cambia el nombre al archivo real
import img2 from "@/app/assets/PG2.webp";
import img3 from "@/app/assets/PG3.webp";
import img4 from "@/app/assets/PG4.webp";
import img5 from "@/app/assets/PG5.webp";
import img6 from "@/app/assets/PG6.webp";

// Agrega tus variables de imágenes al array
const GALLERY_IMAGES = [img1, img2, img3, img4, img5, img6];

export default function PrincessGallery() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto z-10" id="gallery">
      
      {/* Encabezado */}
      <div className="text-center mb-12 md:mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-3"
        >
          <Sparkles className="w-4 h-4 text-[#E85D9E]" />
          <span className="text-[#E85D9E] font-sans text-xs font-bold tracking-widest uppercase">
             Princesas Reales
          </span>
          <Sparkles className="w-4 h-4 text-[#E85D9E]" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-display font-bold text-[#33182B] mb-4"
        >
          Nuestras <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">Clientas Felices</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#7B5C73] max-w-2xl mx-auto text-sm md:text-base font-medium"
        >
          Nada nos hace más felices que verlas brillar con sus vestidos de Guadalupe. 
          Etiquétanos en Instagram para aparecer en nuestra galería mágica.
        </motion.p>
      </div>

      {/* Grid de Imágenes 1080x1080 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {GALLERY_IMAGES.map((imgSrc, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative aspect-square rounded-2xl md:rounded-[32px] overflow-hidden group shadow-md hover:shadow-xl hover:shadow-[#E85D9E]/20 transition-all duration-500 cursor-pointer bg-[#FAD1E6]/20 border border-[#FAD1E6]/50"
          >
            {/* Si aún no tienes las imágenes, esto evitará que se rompa, mostrando un fondo rosa por defecto */}
            {imgSrc ? (
              <Image 
                src={imgSrc} 
                alt={`Clienta feliz ${index + 1}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-[#E85D9E] opacity-50">
                  Foto {index + 1}
               </div>
            )}

            {/* Overlay Mágico al pasar el mouse */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/60 via-[#E85D9E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <motion.div 
                 whileHover={{ scale: 1.2 }} 
                 className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50"
               >
                 <Heart className="w-6 h-6 text-white fill-white drop-shadow-md" />
               </motion.div>
            </div>
            
            {/* Icono pequeño de Instagram en la esquina inferior */}
            <div className="absolute bottom-3 md:bottom-4 right-3 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
               <Instagram className="w-5 h-5 text-white drop-shadow-md" />
            </div>
          </motion.div>
        ))}
      </div>
      
    </section>
  );
}