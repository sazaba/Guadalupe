"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircleHeart, Sparkles, MapPin } from "lucide-react";

// Datos de FAQ adaptados a Guadalupe Boutique Infantil
const FAQS = [
  {
    question: "¿Dónde están ubicados?",
    answer: "Nuestra boutique física está ubicada en el Centro Comercial El Progreso, Local 114, en Dosquebradas. ¡Te esperamos para que veas toda la magia en persona!"
  },
  {
    question: "¿Tienen envíos a todo el país?",
    answer: "¡Sí! Realizamos envíos nacionales a toda Colombia. Además, si estás en el Área Metropolitana (Pereira o Dosquebradas), contamos con servicio de pago Contra Entrega."
  },
  {
    question: "¿Qué tallas manejan?",
    answer: "Manejamos una amplia variedad para acompañar a las princesas en su crecimiento, desde la talla 0 (para bebés) hasta la talla 12."
  },
  {
    question: "¿Cómo puedo comprar un vestido que vi en Instagram?",
    answer: "Puedes agregar los productos que te gusten a tu carrito de compras aquí mismo en la página web, o si prefieres una atención más personalizada, puedes enviarnos un mensaje directo por Instagram o WhatsApp (en el link de nuestro perfil) y con gusto te asesoraremos."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 px-4 md:px-8 max-w-4xl mx-auto z-10" id="faq">
      
      {/* Header Boutique */}
      <div className="flex items-center gap-4 mb-12 border-b border-[#FAD1E6]/60 pb-6">
        <motion.div 
           whileHover={{ rotate: [0, -10, 10, 0] }}
           transition={{ duration: 0.5 }}
           className="p-3.5 bg-[#FAD1E6]/40 border border-[#FAD1E6] rounded-2xl shadow-sm"
        >
           <MessageCircleHeart className="w-7 h-7 text-[#E85D9E]" />
        </motion.div>
        <div>
           <h2 className="text-3xl md:text-4xl font-display font-bold text-[#33182B]">
             Dudas <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">Frecuentes</span>
           </h2>
           <p className="text-xs font-sans font-bold text-[#7B5C73] mt-1 uppercase tracking-widest flex items-center gap-1.5">
             <Sparkles className="w-3 h-3 text-[#E85D9E]" /> Resolvemos tus inquietudes
           </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ 
                      backgroundColor: isOpen ? "rgba(255, 255, 255, 0.9)" : "rgba(250, 209, 230, 0.2)",
                      borderColor: isOpen ? "#E85D9E" : "rgba(250, 209, 230, 0.5)"
                  }}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 transform-gpu ${
                    isOpen 
                      ? "shadow-[0_10px_30px_-10px_rgba(232,93,158,0.15)]" 
                      : "hover:border-[#E85D9E]/50 hover:bg-white/60"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left active:scale-[0.99] transition-transform duration-100 outline-none" 
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-3 pr-4">
                        <span className="text-[#E85D9E]/50 font-sans font-bold text-sm bg-[#FAD1E6]/30 px-2 py-0.5 rounded-md">
                          P0{index + 1}
                        </span>
                        <span className={`font-display text-sm md:text-base font-bold transition-colors ${
                          isOpen ? "text-[#E85D9E]" : "text-[#33182B]"
                        }`}>
                          {faq.question}
                        </span>
                    </div>
                    
                    <span className={`p-2 rounded-full transition-colors shrink-0 shadow-sm ${
                      isOpen ? "bg-[#E85D9E] text-white" : "bg-white text-[#7B5C73] border border-[#FAD1E6]"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} 
                        style={{ willChange: "height" }} 
                      >
                        <div className="px-6 pb-6 pt-0">
                          {/* Línea divisoria suave */}
                          <div className="h-px w-full bg-gradient-to-r from-[#FAD1E6] to-transparent mb-5" />
                          
                          {/* Contenido de la respuesta */}
                          <div className="text-[#7B5C73] font-medium leading-relaxed text-sm md:text-base">
                            
                            {/* Alerta bonita para la primera pregunta (Ubicación) */}
                            {index === 0 && ( 
                                <span className="flex items-center gap-1.5 text-[#E85D9E] font-bold text-xs uppercase mb-3 tracking-wide bg-[#FAD1E6]/40 p-2.5 rounded-lg w-fit border border-[#FAD1E6]">
                                    <MapPin className="w-4 h-4" /> Visítanos
                                </span>
                            )}
                            
                            <p>{faq.answer}</p>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
            </div>
          );
        })}
      </div>

    </section>
  );
}