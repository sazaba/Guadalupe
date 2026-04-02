"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ChevronLeft, Heart, Sparkles, AlertCircle } from "lucide-react";
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
            className="fixed inset-0 bg-[#33182B]/40 backdrop-blur-sm z-[100] touch-none"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-white/95 backdrop-blur-xl border-l border-[#FAD1E6]/50 shadow-[[-10px_0_30px_rgba(232,93,158,0.15)]] z-[101] flex flex-col"
          >
            {/* Header Mágico */}
            <div className="flex items-center justify-between p-6 border-b border-[#FAD1E6]/50 shrink-0 bg-white/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#FAD1E6]/40 rounded-xl text-[#E85D9E] border border-[#FAD1E6]">
                    <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-display font-bold text-[#33182B]">Mi Carrito</h2>
                <span className="bg-[#E85D9E] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {items.length} {items.length === 1 ? 'prenda' : 'prendas'}
                </span>
              </div>
              <button 
                onClick={toggleCart} 
                className="p-2 hover:bg-[#FAD1E6]/40 rounded-full transition-colors group"
              >
                <X className="w-5 h-5 text-[#7B5C73] group-hover:text-[#E85D9E]" />
              </button>
            </div>

            {/* Contenido del Carrito */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4 min-h-0 overscroll-y-contain custom-scrollbar bg-[#FFFDFE]/50">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-[#FAD1E6]/30 rounded-full flex items-center justify-center mb-2 relative">
                     <Heart className="w-10 h-10 text-[#E85D9E] opacity-50" />
                     <Sparkles className="absolute top-4 right-4 w-5 h-5 text-[#FFA8C5] animate-pulse" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#33182B]">Tu carrito está vacío</h3>
                  <p className="text-sm font-medium text-[#7B5C73] max-w-[200px]">Aún no has agregado ninguna prenda mágica a tu bolsa.</p>
                  
                  <Link href="/#catalog" onClick={toggleCart} className="mt-4">
                    <button className="px-8 py-3 bg-white border-2 border-[#E85D9E] text-[#E85D9E] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#E85D9E] hover:text-white transition-all shadow-sm">
                        Explorar Vestidos
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
                      className={`flex gap-4 bg-white border p-3.5 rounded-2xl relative group overflow-hidden transition-all shadow-[0_2px_10px_-4px_rgba(232,93,158,0.1)] hover:border-[#E85D9E]/30 hover:shadow-[0_8px_20px_-6px_rgba(232,93,158,0.15)] ${isItemOOS ? "border-red-200 bg-red-50" : "border-[#FAD1E6]/50"}`}
                    >
                      {/* Imagen del Producto */}
                      <div className={`relative w-24 h-28 bg-[#FAD1E6]/10 rounded-xl overflow-hidden border border-[#FAD1E6]/50 shrink-0 flex items-center justify-center ${isItemOOS ? "grayscale opacity-60" : ""}`}>
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>

                      {/* Detalles y Controles */}
                      <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                        <div className="flex justify-between items-start gap-2">
                          <div className="min-w-0 pr-2">
                              <h4 className={`font-display font-bold text-sm leading-snug mb-1 line-clamp-2 ${isItemOOS ? "text-red-500" : "text-[#33182B]"}`}>
                                  {item.name}
                              </h4>
                              {isItemOOS ? (
                                <span className="text-[9px] font-bold text-red-500 uppercase tracking-wide bg-red-100 px-2 py-0.5 rounded-md">Agotado</span>
                              ) : (
                                <p className="text-[10px] text-[#7B5C73] uppercase font-bold tracking-widest truncate">
                                    {item.category || "Vestido Exclusivo"}
                                </p>
                              )}
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[#7B5C73]/50 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all shrink-0"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-end justify-between mt-3">
                          {/* Botones de Cantidad */}
                          <div className={`flex items-center gap-3 bg-white rounded-xl border border-[#FAD1E6]/80 px-2 py-1 shadow-sm ${isItemOOS ? "opacity-40 pointer-events-none" : ""}`}>
                            <button 
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                                className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors p-1"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-bold w-4 text-center text-[#33182B]">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, Math.min(item.stock || 99, item.quantity + 1))} 
                                className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors p-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className={`text-lg font-bold ${isItemOOS ? "text-[#7B5C73]/50 line-through decoration-1" : "text-[#E85D9E]"}`}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer / Zona de Pago */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#FAD1E6]/50 bg-white space-y-5 shrink-0 pb-[calc(1.5rem+env(safe-area-inset-bottom))] rounded-t-3xl shadow-[0_-10px_30px_rgba(232,93,158,0.05)]">
                
                {hasInvalidItems && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs font-medium text-red-600 leading-snug">
                            Algunas prendas de tu carrito se agotaron. Por favor, elimínalas para poder continuar.
                        </p>
                    </div>
                )}

                {/* Resumen de Costos */}
                <div className="space-y-3 border-b border-[#FAD1E6]/50 pb-4">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[#7B5C73]">Subtotal vestidos</span>
                    <span className="text-[#33182B] font-bold">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-[#7B5C73] flex items-center gap-2">
                        Envío
                        {shippingTotal === 0 && <span className="text-[9px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">¡Gratis!</span>}
                    </span>
                    <span className={`font-bold ${shippingTotal === 0 ? "text-green-500" : "text-[#33182B]"}`}>
                        {shippingTotal === 0 ? "$0.00" : `$${shippingTotal.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold uppercase text-[#33182B]">Total Estimado</span>
                  <span className="text-2xl font-bold text-[#E85D9E]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>

                {/* Nota de seguridad dulce */}
                <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#7B5C73]">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFA8C5]" />
                    <span>Tu compra es 100% segura con nosotros</span>
                </div>

                {/* Botones de Acción */}
                <div className="grid gap-3 pt-2">
                    {hasInvalidItems ? (
                        <button 
                            disabled
                            className="w-full bg-gray-100 text-gray-400 py-4 rounded-full font-bold text-sm cursor-not-allowed flex items-center justify-center border border-gray-200"
                        >
                            Quita las prendas agotadas
                        </button>
                    ) : (
                        <Link href="/checkout" onClick={toggleCart} className="w-full">
                            <button className="w-full bg-[#E85D9E] text-white py-4 rounded-full font-bold tracking-wide hover:bg-[#D14D8B] transition-all shadow-[0_4px_15px_rgba(232,93,158,0.3)] hover:shadow-[0_8px_25px_rgba(232,93,158,0.4)] flex items-center justify-center gap-2 group active:scale-[0.98]">
                                Finalizar Compra
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                    )}
                    
                    <button 
                      onClick={toggleCart} 
                      className="w-full py-3 rounded-full font-bold text-xs text-[#7B5C73] hover:text-[#E85D9E] hover:bg-[#FAD1E6]/20 transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-[#FAD1E6]/50"
                    >
                        <ChevronLeft className="w-3.5 h-3.5" />
                        Seguir Mirando
                    </button>
                </div>

              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}