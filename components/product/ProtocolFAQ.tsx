"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  { q: "Is shipping discreet?", a: "Yes. All parcels are shipped in plain packaging with no reference to contents or 'peptides'. The label indicates 'Research Reagents' for customs clearance." },
  { q: "What is the purity guarantee?", a: "Every batch undergoes HPLC and Mass Spectrometry analysis. We guarantee >99% purity. COA (Certificate of Analysis) is available upon request for institutional buyers." },
  { q: "Do you ship internationally?", a: "Yes. We utilize specialized logistics partners for global delivery (USA, EU, LatAm). Delivery success rate is 98.7%." },
  { q: "How should I store the product?", a: "Upon receipt, store lyophilized vials at -20°C. Once reconstituted, keep at 4°C and use within 14-21 days for optimal integrity." },
];

export default function ProtocolFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mb-16">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6 flex items-center gap-2">
         <HelpCircle className="w-3 h-3" /> Protocol Database / FAQ
      </h3>
      
      <div className="grid gap-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--glass-border)]/30 transition-colors"
            >
              <span className="font-mono text-sm font-bold text-[var(--text-main)]">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-[var(--color-brand-primary)] transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-4 pt-0 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--glass-border)]/50">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}