"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

const formatCOP = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(Number(price));
};

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
            <div className="bg-white/80 backdrop-blur-2xl border-t border-pink-100/50 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 px-6 shadow-[0_-15px_40px_rgba(232,93,158,0.1)] rounded-t-[2rem]">
                
                <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest truncate">
                                {product.name}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="font-display font-black text-[#E85D9E] text-2xl">
                                {formatCOP(product.price)}
                            </span>
                        </div>
                    </div>

                    <button 
                        onClick={() => addItem(product, qty)} 
                        className="bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] text-white h-14 px-8 rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 shadow-[0_8px_20px_rgba(232,93,158,0.3)] active:scale-95 transition-all cursor-pointer"
                    >
                        <ShoppingBag className="w-4 h-4 fill-white/10" />
                        <span>Comprar</span>
                    </button>
                </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}