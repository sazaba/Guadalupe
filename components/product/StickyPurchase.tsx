"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function StickyPurchase({ product, qty }: { product: any, qty: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();

  // 1. Detectar Scroll para mostrar/ocultar la barra
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. NUEVO: Comunicación con el body para ocultar el Theme Toggle
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("sticky-active");
    } else {
      document.body.classList.remove("sticky-active");
    }
    // Limpieza al desmontar el componente
    return () => document.body.classList.remove("sticky-active");
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
            {/* Panel Blur con Borde Superior Técnico */}
            <div className="bg-[var(--bg-page)]/80 backdrop-blur-xl border-t border-[var(--glass-border)] pb-[calc(1rem+env(safe-area-inset-bottom))] p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
                
                {/* Progress Line decorativa */}
                <div className="absolute top-0 left-0 h-[1px] bg-[var(--color-brand-primary)] w-1/3" />

                <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest truncate">
                                Protocol: {product.name}
                            </span>
                            {product.stock < 20 && <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="font-mono font-bold text-[var(--text-main)] text-xl">
                                ${product.price.toFixed(2)}
                            </span>
                            <span className="text-[9px] text-[var(--text-muted)] font-mono">/UNIT</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => addItem(product, qty)} 
                        className="bg-[var(--text-main)] text-[var(--bg-page)] h-12 px-6 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-transform hover:bg-[var(--color-brand-primary)] hover:text-white"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Acquire</span>
                    </button>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}