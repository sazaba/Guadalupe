"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Terminal, ShieldAlert } from "lucide-react";

const FAQS = [
  {
    question: "WHAT IS THE PURITY STANDARD?",
    answer: "All compounds are synthesized to a minimum purity of 99% as verified by HPLC (High-Performance Liquid Chromatography) and Mass Spectrometry analysis. COAs (Certificates of Analysis) are available for every batch upon request."
  },
  {
    question: "STORAGE & HANDLING PROTOCOLS",
    answer: "Lyophilized peptides remain stable at room temperature for up to 90 days. For long-term storage, -20°C is recommended. Once reconstituted with bacteriostatic water, they must be refrigerated (2-8°C) and used within 30 days to prevent degradation."
  },
  {
    question: "SHIPPING & DISCRETION",
    answer: "We utilize discreet, plain packaging with no external branding related to peptides. Orders are shipped via Priority Mail. Tracking numbers are generated automatically and sent via encrypted email upon dispatch."
  },
  {
    question: "IS THIS FOR HUMAN CONSUMPTION?",
    answer: "STRICTLY FOR LABORATORY RESEARCH USE ONLY. Transcendent Labs products are not intended for human consumption, medical diagnosis, or treatment. Any communication suggesting human use will result in order cancellation and blacklisting."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 px-4 md:px-8 max-w-4xl mx-auto z-10" id="faq">
      
      {/* Header técnico */}
      <div className="flex items-center gap-4 mb-12 border-b border-[var(--glass-border)] pb-6">
        <div className="p-3 bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg">
           <Terminal className="w-6 h-6 text-[var(--color-brand-primary)]" />
        </div>
        <div>
           <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)]">
             Research <span className="text-[var(--text-muted)]">Protocols</span>
           </h2>
           <p className="text-xs font-mono text-[var(--color-brand-secondary)] mt-1 uppercase tracking-widest">
             // Knowledge_Base_v1.0
           </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="flex flex-col gap-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="overflow-hidden"> {/* Wrapper para evitar overflow issues en animación */}
                <motion.div
                  initial={false}
                  animate={{ 
                      backgroundColor: isOpen ? "rgba(var(--bg-page-rgb), 0.8)" : "rgba(var(--bg-page-rgb), 0.3)",
                      borderColor: isOpen ? "var(--color-brand-primary)" : "var(--glass-border)"
                  }}
                  className={`border rounded-xl overflow-hidden transition-all duration-300 transform-gpu ${
                    isOpen 
                      ? "bg-[var(--bg-page)]/80 shadow-[0_0_20px_rgba(0,201,255,0.1)]" 
                      : "bg-[var(--bg-page)]/30 hover:border-[var(--text-muted)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left active:scale-[0.99] transition-transform duration-100" // Feedback táctil en móvil
                    style={{ WebkitTapHighlightColor: "transparent" }} // Quita el flash gris en iOS
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pr-4">
                        <span className="text-[var(--text-muted)] font-mono text-xs opacity-50">0{index + 1}.</span>
                        <span className={`font-mono text-sm md:text-base uppercase tracking-wider font-bold transition-colors ${
                          isOpen ? "text-[var(--color-brand-primary)]" : "text-[var(--text-main)]"
                        }`}>
                          {faq.question}
                        </span>
                    </div>
                    
                    <span className={`p-2 rounded-full transition-colors shrink-0 ${
                      isOpen ? "bg-[var(--color-brand-primary)] text-[var(--bg-page)]" : "bg-[var(--glass-border)] text-[var(--text-muted)]"
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
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }} // Curva "Spring" suave para iOS
                        style={{ willChange: "height" }} // Optimización crítica para Safari
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="h-px w-full bg-gradient-to-r from-[var(--color-brand-primary)]/50 to-transparent mb-4" />
                          
                          {/* Contenido de la respuesta */}
                          <div className="text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
                            {index === 3 && ( 
                                <span className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase mb-2 tracking-widest bg-amber-500/10 p-2 rounded w-fit border border-amber-500/20">
                                    <ShieldAlert className="w-4 h-4" /> Compliance Warning
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