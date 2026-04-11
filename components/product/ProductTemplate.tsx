"use client";

import { useState, useRef, memo, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Minus, Plus, CheckCircle2, Sparkles, Gift, Crown, Star, ShieldCheck, ShoppingBag, Droplets, Wind, SunMedium } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext";

// Componentes secundarios
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import ResearchChallenges from "./ResearchChallenges"; 
import ProtocolFAQ from "./ProtocolFAQ"; 

// Formateador de moneda colombiana
const formatCOP = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Number(price));
};

// Partículas de fondo mágicas
const MagicSparkles = memo(() => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 mix-blend-screen transform-gpu">
      <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-pink-300/20 rounded-full blur-[80px]" />
      <div className="absolute top-[60%] right-[5%] w-80 h-80 bg-fuchsia-300/20 rounded-full blur-[100px]" />
      <div className="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-[#E85D9E] shadow-[0_0_15px_#E85D9E] animate-ping" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[70%] right-[25%] w-3 h-3 rounded-full bg-[#FFA8C5] shadow-[0_0_20px_#FFA8C5] animate-pulse" style={{ animationDuration: '3s' }} />
  </div>
));
MagicSparkles.displayName = "MagicSparkles";

// SVG Animado Decorativo
const AnimatedStarIcon = ({ className }: { className?: string }) => (
    <div className={className}>
      <motion.svg 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          className="w-full h-full transform-gpu"
      >
          <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
      </motion.svg>
    </div>
);

interface Variation {
  id: string;
  size: string;
  price: number;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  category: string;
  images: string;
  material?: string; 
  color?: string;
  description: string;
  slug: string;
  variations: Variation[];
}

export default function ProductTemplate({ product }: { product: Product }) {
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(product.variations[0] || null);
  
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const currentPrice = selectedVariation ? selectedVariation.price : 0;
  const currentStock = selectedVariation ? selectedVariation.stock : 0;
  const isOutOfStock = currentStock <= 0;

  useEffect(() => {
    setQty(1);
  }, [selectedVariation]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const handleAddToCart = () => {
    if (isOutOfStock || !selectedVariation) return;
    setIsAdding(true);
    addItem(product, selectedVariation, qty);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="bg-[#FFFDFE] min-h-screen text-[#33182B] transition-colors duration-300 overflow-x-hidden selection:bg-[#FAD1E6] selection:text-[#E85D9E]">
      <Navbar />

      <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-0 perspective-1000">
        
        {/* Glow de fondo suave */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100/40 via-transparent to-transparent" />
        <MagicSparkles />
        
        {/* Marca de agua de fondo animada */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.02]">
          <motion.h2
            style={{ y: textParallax, WebkitTextStroke: "2px #E85D9E", color: "transparent" }}
            className="text-[25vw] font-handwriting font-bold whitespace-nowrap select-none tracking-tighter will-change-transform"
          >
             Magia
          </motion.h2>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">

                {/* COLUMNA IZQUIERDA: Imagen Impactante Mejorada */}
                <div className="lg:col-span-6 h-[50vh] sm:h-[60vh] lg:h-[75vh] flex items-center justify-center relative mt-4 lg:mt-0">
                    <AnimatedStarIcon className="absolute top-0 left-4 lg:top-8 lg:left-8 w-6 h-6 lg:w-8 lg:h-8 text-[#FFA8C5] opacity-60 z-30" />
                    <AnimatedStarIcon className="absolute bottom-8 right-2 lg:bottom-16 lg:right-4 w-5 h-5 lg:w-6 lg:h-6 text-[#E85D9E] opacity-40 z-30" />

                    {/* Marcos decorativos traseros */}
                    <div className="absolute inset-2 lg:inset-6 rounded-[2.5rem] lg:rounded-[3.5rem] border border-pink-200/50 bg-gradient-to-tr from-pink-100/40 to-white/30 backdrop-blur-sm -rotate-2 scale-[0.98]" />
                    <div className="absolute inset-2 lg:inset-6 rounded-[2.5rem] lg:rounded-[3.5rem] border border-white/80 bg-white/40 backdrop-blur-md rotate-1 shadow-[0_20px_50px_-15px_rgba(232,93,158,0.15)] scale-[0.98]" />

                    {/* Contenedor principal de la imagen con bordes curvos reales */}
                    <motion.div 
                        style={{ y: imageY }} 
                        className="relative w-full h-full z-20 flex items-center justify-center p-3 lg:p-5 will-change-transform group"
                    >
                        {/* AQUÍ ESTÁ LA MAGIA DEL BORDE REDONDO */}
                        <div className="relative w-full h-full rounded-[2rem] lg:rounded-[3rem] overflow-hidden bg-white shadow-inner border-[6px] border-white ring-1 ring-pink-100/50">
                            <Image
                                src={product.images}
                                alt={product.name}
                                fill
                                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                quality={95} 
                            />
                            {/* Gradiente sutil interno para darle volumen a la foto */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/10 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* COLUMNA DERECHA: Información y Compra */}
                <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8 pt-4 lg:pt-0">
                    
                    {/* Header del Producto */}
                    <div className="space-y-4 text-center lg:text-left">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAD1E6]/40 border border-[#FAD1E6] text-[#E85D9E] text-[11px] font-bold uppercase tracking-widest shadow-sm">
                                <Crown className="w-3.5 h-3.5" />
                                {product.category}
                            </span>
                            {isOutOfStock ? (
                                <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold uppercase tracking-widest border border-gray-200 shadow-sm">
                                    Talla Agotada
                                </span>
                            ) : (
                                <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[11px] font-bold uppercase tracking-widest border border-green-200 shadow-sm flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    En Stock
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold leading-[1.1] text-[#33182B] tracking-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline justify-center lg:justify-start gap-4 pt-1">
                             <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] drop-shadow-sm">
                                {formatCOP(currentPrice)}
                             </span>
                        </div>
                    </div>

                    {/* Descripción COMPLETA Mágica */}
                    <p className="text-sm sm:text-base text-[#7B5C73] font-medium leading-relaxed font-sans text-center lg:text-left bg-white/70 p-6 lg:p-8 rounded-[2rem] border border-pink-100 shadow-[0_8px_30px_-10px_rgba(232,93,158,0.1)] backdrop-blur-md">
                        {product.description}
                    </p>

                    {/* Ficha Técnica: TALLAS DE FORMA DINÁMICA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Selector de Tallas Mejorado */}
                        <div className="flex flex-col bg-white border border-pink-100 p-5 rounded-[2rem] shadow-sm md:col-span-2">
                            <div className="flex items-center justify-between mb-4 text-center lg:text-left">
                                <span className="text-[11px] uppercase font-bold text-[#7B5C73] tracking-widest">Elige la Talla</span>
                                {selectedVariation && (
                                    <span className="text-[10px] font-bold text-pink-400 bg-pink-50 px-2 py-1 rounded-md">
                                        Quedan {currentStock} unidades
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                {product.variations.map((v) => {
                                    const isSelected = selectedVariation?.id === v.id;
                                    const isVariationOOS = v.stock <= 0;
                                    return (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariation(v)}
                                            className={`min-w-[4rem] px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 
                                                ${isSelected 
                                                    ? 'bg-[#E85D9E] text-white border-[#E85D9E] shadow-[0_5px_15px_rgba(232,93,158,0.3)] transform scale-105' 
                                                    : 'bg-pink-50/50 text-[#7B5C73] border-transparent hover:border-pink-200 hover:bg-pink-50'
                                                }
                                                ${isVariationOOS && !isSelected ? 'opacity-40 grayscale cursor-not-allowed' : ''}
                                            `}
                                        >
                                            {v.size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex flex-col bg-white border border-pink-100 p-5 rounded-[1.5rem] items-center lg:items-start text-center lg:text-left shadow-sm">
                            <span className="text-[10px] uppercase font-bold text-pink-400 tracking-widest mb-1.5 flex items-center gap-1.5"><Sparkles className="w-3 h-3"/> Color</span>
                            <span className="text-sm font-bold text-[#33182B] leading-snug">{product.color || "Mágico"}</span>
                        </div>
                        <div className="flex flex-col bg-white border border-pink-100 p-5 rounded-[1.5rem] items-center lg:items-start text-center lg:text-left shadow-sm">
                            <span className="text-[10px] uppercase font-bold text-pink-400 tracking-widest mb-1.5 flex items-center gap-1.5"><Gift className="w-3 h-3"/> Material</span>
                            <span className="text-sm font-bold text-[#33182B] leading-snug">{product.material || "Calidad Premium"}</span>
                        </div>
                    </div>

                    {/* Controles de Compra */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-4">
                        {/* Selector de cantidad */}
                        <div className={`flex items-center justify-between border-2 border-pink-100 bg-white rounded-full px-5 py-3 h-14 md:h-16 shadow-sm w-full sm:w-40 flex-shrink-0 ${isOutOfStock ? "opacity-40 pointer-events-none" : ""}`}>
                            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors p-2 -ml-2 bg-pink-50 rounded-full">
                                <Minus size={16} />
                            </button>
                            <span className="font-bold text-[#33182B] text-xl w-10 text-center">{qty}</span>
                            <button onClick={() => setQty(q => Math.min(currentStock, q + 1))} className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors p-2 -mr-2 bg-pink-50 rounded-full">
                                <Plus size={16} />
                            </button>
                        </div>
                        
                        {/* Botón Agregar */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock || isAdding}
                            className={`w-full h-14 md:h-16 rounded-full font-bold tracking-widest text-sm md:text-base uppercase transition-all flex items-center justify-center gap-3 relative overflow-hidden flex-grow
                                ${isOutOfStock 
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                                    : "bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] text-white shadow-[0_10px_25px_-5px_rgba(232,93,158,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(232,93,158,0.6)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                }`}
                        >
                            {!isOutOfStock && (
                                <div className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shimmer_3s_infinite]" />
                            )}

                            <AnimatePresence mode="wait">
                                {isOutOfStock ? (
                                    <motion.span key="oos">Talla Agotada</motion.span>
                                ) : isAdding ? (
                                    <motion.span key="adding" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> ¡Añadido al Carrito!
                                    </motion.span>
                                ) : (
                                    <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5" /> Agregar al Carrito
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>

                    {/* Badges de Confianza */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 mt-4 pt-8 pb-4 border-t border-pink-100/80">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#7B5C73] bg-pink-50/50 px-4 py-2 rounded-full border border-pink-100/50">
                            <ShieldCheck className="w-4 h-4 text-[#FFA8C5]" /> Pago 100% Seguro
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#7B5C73] bg-pink-50/50 px-4 py-2 rounded-full border border-pink-100/50">
                            <Gift className="w-4 h-4 text-[#FFA8C5]" /> Empaque Mágico
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </section>

      {/* SECCIÓN INFERIOR BLANCA */}
      <section className="bg-white relative z-20 shadow-[0_-10px_30px_rgba(232,93,158,0.05)] border-t border-[#FAD1E6]/50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24">
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center">
                
                {/* GUÍA DE CUIDADOS */}
                <div className="bg-pink-50/40 border border-pink-100 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                        <Sparkles className="w-32 h-32 lg:w-40 lg:h-40 text-[#E85D9E]" />
                    </div>
                    
                    <h3 className="flex items-center gap-3 text-xl lg:text-2xl font-display font-bold text-[#E85D9E] mb-5 relative z-10">
                        <Crown className="w-5 h-5 lg:w-6 lg:h-6" /> Guía de Cuidados
                    </h3>
                    
                    <p className="text-[#7B5C73] text-sm font-medium mb-6 lg:mb-8 relative z-10 leading-relaxed">
                        Nuestras prendas están hechas con detalles delicados y mucho amor. Para mantener la magia intacta por mucho tiempo, te recomendamos:
                    </p>
                    
                    <ul className="space-y-4 relative z-10">
                        <li className="flex items-center gap-3 lg:gap-4 text-sm text-[#33182B] font-bold bg-white p-4 rounded-2xl border border-pink-50 shadow-sm">
                            <div className="bg-pink-50 p-2.5 rounded-full shrink-0"><Droplets className="w-4 h-4 text-[#E85D9E]"/></div>
                            <span>Lavado a mano con agua fría y jabón suave.</span>
                        </li>
                        <li className="flex items-center gap-3 lg:gap-4 text-sm text-[#33182B] font-bold bg-white p-4 rounded-2xl border border-pink-50 shadow-sm">
                            <div className="bg-pink-50 p-2.5 rounded-full shrink-0"><Wind className="w-4 h-4 text-[#E85D9E]"/></div>
                            <span>Secar a la sombra, sin retorcer la prenda.</span>
                        </li>
                        <li className="flex items-center gap-3 lg:gap-4 text-sm text-[#33182B] font-bold bg-white p-4 rounded-2xl border border-pink-50 shadow-sm">
                            <div className="bg-pink-50 p-2.5 rounded-full shrink-0"><SunMedium className="w-4 h-4 text-[#E85D9E]"/></div>
                            <span>No usar blanqueador ni secadora automática.</span>
                        </li>
                    </ul>
                </div>

                {/* LA PROMESA DE LA BOUTIQUE */}
                <div>
                   <ResearchChallenges /> 
                </div>
            </div>
            
            <div className="mb-16 lg:mb-20">
                 <ProtocolFAQ />
            </div>
            
            <div className="pt-10 border-t border-[#FAD1E6]/50">
                <ProductReviews />
            </div>
        </div>
      </section>

      {/* Estilos globales para la animación shimmer ultra-ligera */}
      <style jsx global>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(50%); }
        }
      `}</style>

      {/* Pasamos el precio dinámico y la TALLA al widget Sticky inferior si existe */}
{!isOutOfStock && <StickyPurchase product={{...product, price: currentPrice} as any} qty={qty} variation={selectedVariation} />}
      <Footer />
    </div>
  );
}