"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function StickyPurchase({ product, qty }: { product: any, qty: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) document.body.classList.add("sticky-active");
    else document.body.classList.remove("sticky-active");
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
            <div className="bg-white/90 backdrop-blur-xl border-t border-[#FAD1E6] pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 px-5 shadow-[0_-10px_40px_rgba(232,93,158,0.15)] rounded-t-3xl">
                
                <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-bold text-[#7B5C73] uppercase tracking-wider truncate">
                                {product.name}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="font-display font-bold text-[#E85D9E] text-xl">
                                ${product.price.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <button 
                        onClick={() => addItem(product, qty)} 
                        className="bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] text-white h-12 px-6 rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
                    >
                        <Heart className="w-4 h-4 fill-white/20" />
                        <span>Comprar</span>
                    </button>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}