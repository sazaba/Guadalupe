"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const FAQS = [
  {
    q: "¿Cómo sé qué talla elegir?",
    a: "Nuestras tallas son estándar (0 a 12 años). Te recomendamos elegir la talla que tu pequeña usa normalmente. Si está entre dos tallas o es altita, sugerimos llevar la talla más grande para mayor comodidad."
  },
  {
    q: "¿Cuáles son los cuidados de lavado?",
    a: "Para que la magia dure mucho más, recomendamos lavar a mano o en ciclo delicado con agua fría. No usar blanqueador, no retorcer y secar a la sombra. Los vestidos de tul o con apliques siempre deben lavarse por el revés."
  },
  {
    q: "¿Cuánto tarda en llegar mi pedido?",
    a: "Despachamos todos los pedidos en un plazo de 24 horas hábiles. Dependiendo de tu ciudad, la transportadora puede tardar entre 2 y 5 días hábiles en entregar en tu puerta."
  },
  {
    q: "¿Tienen política de cambios?",
    a: "¡Sí! Si la prenda no le quedó, tienes 15 días calendario para solicitar un cambio por talla, siempre y cuando la prenda esté nueva, con etiquetas y sin señales de uso."
  }
];

export default function ProtocolFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display font-bold text-[#33182B] flex items-center justify-center gap-3">
            <MessageCircleQuestion className="text-[#E85D9E]" /> Dudas Frecuentes
        </h2>
        <p className="text-[#7B5C73] mt-2">Todo lo que necesitas saber antes de tu compra</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div key={index} className="border border-[#FAD1E6] rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between bg-white cursor-pointer"
            >
              <span className="font-bold text-[#33182B] text-left">{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-[#E85D9E] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-5 text-[#7B5C73] text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}