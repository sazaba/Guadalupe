"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, ChevronLeft, AlertCircle } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; 
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, removeItem, updateQuantity, cartSubtotal, shippingTotal, cartTotal } = useCart();
  
  // Verificamos si hay algún producto que se quedó sin stock en el carrito
  const hasInvalidItems = items.some(item => (item.stock || 0) <= 0);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden"; 
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] touch-none"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-[var(--bg-page)]/95 backdrop-blur-xl border-l border-[var(--glass-border)] shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--glass-border)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--color-brand-primary)]/10 rounded-lg text-[var(--color-brand-primary)]">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-display font-bold text-[var(--text-main)]">Research Cart</h2>
                <span className="bg-[var(--text-main)] text-[var(--bg-page)] text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.length}
                </span>
              </div>
              <button 
                onClick={toggleCart} 
                className="p-2 hover:bg-[var(--glass-border)] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0 overscroll-y-contain custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
                  <ShoppingBag className="w-16 h-16 text-[var(--text-muted)]" />
                  <p className="text-sm font-mono uppercase tracking-widest">Cart Empty</p>
                  
                  <Link href="/#catalog" onClick={toggleCart}>
                    <button className="px-6 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[var(--text-main)] hover:text-[var(--bg-page)] transition-colors">
                        Browse Protocols
                    </button>
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const isItemOOS = (item.stock || 0) <= 0;
                  
                  return (
                    <motion.div 
                      layout
                      key={item.id} 
                      className={`flex gap-3 bg-[var(--glass-bg)] border p-3 rounded-xl relative group overflow-hidden transition-colors ${isItemOOS ? "border-red-500/30 bg-red-500/5" : "border-[var(--glass-border)]"}`}
                    >
                      {/* Imagen con filtro si está agotado */}
                      <div className={`relative w-20 h-24 bg-[var(--bg-page)] rounded-lg overflow-hidden border border-[var(--glass-border)] shrink-0 ${isItemOOS ? "grayscale opacity-50" : ""}`}>
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>

                      {/* Info + Controles */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0">
                              <h4 className={`font-bold text-sm leading-tight mb-1 line-clamp-2 ${isItemOOS ? "text-red-400" : "text-[var(--text-main)]"}`}>
                                  {item.name}
                              </h4>
                              {isItemOOS ? (
                                <span className="text-[9px] font-bold text-red-500 uppercase tracking-tighter bg-red-500/10 px-1.5 py-0.5 rounded">Out of Stock</span>
                              ) : (
                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider truncate">
                                    {item.category || "Research Peptide"}
                                </p>
                              )}
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-400/60 hover:text-red-500 hover:bg-red-500/10 p-1.5 rounded-md transition-all shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-end justify-between mt-2">
                          <div className={`flex items-center gap-3 bg-[var(--bg-page)] rounded-lg border border-[var(--glass-border)] px-2 py-1 ${isItemOOS ? "opacity-30 pointer-events-none" : ""}`}>
                            <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                                className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, Math.min(item.stock || 99, item.quantity + 1))} 
                                className="text-[var(--text-muted)] hover:text-[var(--text-main)]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className={`font-mono font-bold ${isItemOOS ? "text-[var(--text-muted)] line-through" : "text-[var(--color-brand-primary)]"}`}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--glass-border)] bg-[var(--glass-bg)]/50 space-y-4 shrink-0 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                
                {hasInvalidItems && (
                    <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-red-400 leading-tight">
                            Some items in your cart are currently out of stock. Please remove them to proceed with your order.
                        </p>
                    </div>
                )}

                {/* Desglose de precios modificado con indicador "Free" */}
                <div className="space-y-2 border-b border-[var(--glass-border)] pb-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[var(--text-muted)]">Subtotal</span>
                    <span className="font-mono font-bold">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[var(--text-muted)] flex items-center gap-2">
                        Shipping 
                        {shippingTotal === 0 && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Free!</span>}
                    </span>
                    <span className={`font-mono font-bold ${shippingTotal === 0 ? "text-emerald-500" : ""}`}>
                        ${shippingTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-[var(--text-muted)] tracking-widest">Total Estimated</span>
                  <span className="text-2xl font-mono font-bold text-[var(--text-main)]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--text-muted)] bg-emerald-500/5 py-2 rounded border border-emerald-500/10">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    <span>Secure Encrypted Checkout</span>
                </div>

                <div className="grid gap-3">
                    {hasInvalidItems ? (
                        <button 
                            disabled
                            className="w-full bg-[var(--glass-border)] text-[var(--text-muted)] py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            Checkout Disabled (OOS Items)
                        </button>
                    ) : (
                        <Link href="/checkout" onClick={toggleCart} className="w-full">
                            <button className="w-full bg-[var(--text-main)] text-[var(--bg-page)] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[var(--color-brand-primary)] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 group">
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    )}
                    
                    <Link href="/#catalog" onClick={toggleCart} className="w-full">
                        <button className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)] transition-colors flex items-center justify-center gap-2">
                            <ChevronLeft className="w-3 h-3" />
                            Continue Browsing
                        </button>
                    </Link>
                </div>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}