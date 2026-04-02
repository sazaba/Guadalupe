"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Ruler, Sparkles, Info } from "lucide-react";

// Datos de las tallas (En centímetros)
const SIZES = [
  { size: "0-3 Meses", chest: "43", waist: "43", length: "38" },
  { size: "3-6 Meses", chest: "45", waist: "45", length: "40" },
  { size: "6-9 Meses", chest: "47", waist: "47", length: "42" },
  { size: "12 Meses (Talla 1)", chest: "50", waist: "50", length: "45" },
  { size: "Talla 2", chest: "53", waist: "51", length: "50" },
  { size: "Talla 4", chest: "58", waist: "54", length: "58" },
  { size: "Talla 6", chest: "63", waist: "57", length: "66" },
  { size: "Talla 8", chest: "68", waist: "60", length: "73" },
  { size: "Talla 10", chest: "73", waist: "62", length: "80" },
  { size: "Talla 12", chest: "78", waist: "64", length: "86" },
];

export default function SizeGuide() {
  const [unit, setUnit] = useState<"cm" | "in">("cm");

  // Función para convertir a pulgadas si el usuario hace toggle
  const convert = (cm: string) => unit === "cm" ? cm : (Number(cm) * 0.393701).toFixed(1);

  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 max-w-5xl mx-auto z-10" id="sizes">
      
      {/* Encabezado y Toggle */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-10 gap-6">
        <div className="text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-[#33182B] mb-2 flex items-center justify-center md:justify-start gap-3"
          >
            Guía de <span className="text-[#E85D9E]">Tallas</span> <Ruler className="w-8 h-8 text-[#FFA8C5]" />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#7B5C73] text-sm md:text-base font-medium max-w-lg"
          >
            Encuentra la medida perfecta. Te recomendamos medir a la princesa con una cinta métrica flexible para asegurar un ajuste mágico.
          </motion.p>
        </div>

        {/* Toggle CM / Pulgadas */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center bg-[#FAD1E6]/30 p-1.5 rounded-full border border-[#FAD1E6]"
        >
           <button 
             onClick={() => setUnit("cm")}
             className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${unit === "cm" ? "bg-white text-[#E85D9E] shadow-sm" : "text-[#7B5C73] hover:text-[#E85D9E]"}`}
           >
             Centímetros
           </button>
           <button 
             onClick={() => setUnit("in")}
             className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${unit === "in" ? "bg-white text-[#E85D9E] shadow-sm" : "text-[#7B5C73] hover:text-[#E85D9E]"}`}
           >
             Pulgadas
           </button>
        </motion.div>
      </div>

      {/* Tabla Premium Glassmorphism */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full overflow-x-auto pb-4"
      >
        <div className="min-w-[600px] bg-white/70 backdrop-blur-xl border border-[#FAD1E6]/50 rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(232,93,158,0.1)]">
          
          {/* Cabecera de la tabla */}
          <div className="grid grid-cols-4 bg-[#FAD1E6]/40 p-5 md:p-6 border-b border-[#FAD1E6]">
             <div className="text-left font-display font-bold text-[#33182B] uppercase tracking-wider text-sm">Talla / Edad</div>
             <div className="text-center font-display font-bold text-[#33182B] uppercase tracking-wider text-sm flex items-center justify-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#E85D9E]" /> Pecho</div>
             <div className="text-center font-display font-bold text-[#33182B] uppercase tracking-wider text-sm flex items-center justify-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#E85D9E]" /> Cintura</div>
             <div className="text-center font-display font-bold text-[#33182B] uppercase tracking-wider text-sm flex items-center justify-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#E85D9E]" /> Largo Total</div>
          </div>

          {/* Filas de tallas */}
          <div className="flex flex-col">
            {SIZES.map((row, index) => (
              <motion.div 
                key={index}
                whileHover={{ backgroundColor: "rgba(250, 209, 230, 0.2)", scale: 1.01 }}
                className={`grid grid-cols-4 p-4 md:p-5 transition-all duration-300 border-b border-[#FAD1E6]/30 last:border-0 ${index % 2 === 0 ? "bg-white/40" : "bg-transparent"}`}
              >
                <div className="text-left font-bold text-[#E85D9E] text-sm md:text-base flex items-center">
                    {row.size}
                </div>
                <div className="text-center font-sans font-medium text-[#7B5C73] text-sm md:text-base flex items-center justify-center">
                    {convert(row.chest)} <span className="text-[10px] ml-1 opacity-60">{unit}</span>
                </div>
                <div className="text-center font-sans font-medium text-[#7B5C73] text-sm md:text-base flex items-center justify-center">
                    {convert(row.waist)} <span className="text-[10px] ml-1 opacity-60">{unit}</span>
                </div>
                <div className="text-center font-sans font-medium text-[#7B5C73] text-sm md:text-base flex items-center justify-center">
                    {convert(row.length)} <span className="text-[10px] ml-1 opacity-60">{unit}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>

      {/* Nota de ayuda */}
      <div className="mt-6 flex items-start gap-2 max-w-2xl mx-auto md:mx-0 p-4 bg-[#FAD1E6]/20 rounded-2xl border border-[#FAD1E6]/40">
         <Info className="w-5 h-5 text-[#E85D9E] shrink-0 mt-0.5" />
         <p className="text-xs md:text-sm text-[#7B5C73] font-medium leading-relaxed">
           <strong>Nota:</strong> Las medidas pueden variar ligeramente dependiendo del diseño del vestido (ej. si la falda es esponjosa o tiene tul). Si la niña está entre dos tallas, recomendamos elegir la talla superior.
         </p>
      </div>

    </section>
  );
}