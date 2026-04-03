"use client";

import { useState, useRef, memo } from "react";
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
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50 mix-blend-screen">
      <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-pink-300/20 rounded-full blur-[80px] animate-pulse" />
      <div className="absolute top-[60%] right-[5%] w-80 h-80 bg-fuchsia-300/20 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[30%] left-[20%] w-2 h-2 rounded-full bg-[#E85D9E] shadow-[0_0_15px_#E85D9E] animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute top-[70%] right-[25%] w-3 h-3 rounded-full bg-[#FFA8C5] shadow-[0_0_20px_#FFA8C5] animate-pulse" style={{ animationDuration: '2s' }} />
      <div className="absolute bottom-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse" style={{ animationDuration: '4s' }} />
  </div>
));
MagicSparkles.displayName = "MagicSparkles";

// SVG Animado Decorativo
const AnimatedStarIcon = ({ className }: { className?: string }) => (
    <motion.svg 
        animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        className={className}
    >
        <path d="M12 2v20M17 5l-10 14M22 12H2M19 17L5 7" />
    </motion.svg>
);

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  material?: string; 
  color?: string;
  size?: string;
  description: string;
  slug: string;
}

export default function ProductTemplate({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isOutOfStock = product.stock <= 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.90]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    addItem(product, qty);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="bg-[#FFFDFE] min-h-screen text-[#33182B] transition-colors duration-300 overflow-x-hidden selection:bg-[#FAD1E6] selection:text-[#E85D9E]">
      <Navbar />

      <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-28 pb-16 lg:pt-0 lg:pb-0 perspective-1000">
        
        {/* Glow de fondo suave */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100/40 via-transparent to-transparent" />
        <MagicSparkles />
        
        {/* Marca de agua de fondo animada */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.02]">
          <motion.h2
            style={{ y: textParallax, WebkitTextStroke: "2px #E85D9E", color: "transparent" }}
            className="text-[25vw] font-handwriting font-bold whitespace-nowrap select-none tracking-tighter"
          >
             Magia
          </motion.h2>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full mt-10 lg:mt-20">

                {/* COLUMNA IZQUIERDA: Imagen Impactante */}
                <div className="lg:col-span-6 h-[50vh] sm:h-[60vh] lg:h-[75vh] flex items-center justify-center relative">
                    
                    {/* Elementos SVG decorativos flotantes */}
                    <AnimatedStarIcon className="absolute top-10 left-10 w-8 h-8 text-[#FFA8C5] opacity-60" />
                    <AnimatedStarIcon className="absolute bottom-20 right-5 w-6 h-6 text-[#E85D9E] opacity-40" />

                    {/* Marco Mágico */}
                    <div className="absolute inset-4 lg:inset-10 rounded-[3rem] border border-pink-200/50 bg-gradient-to-tr from-pink-50/50 to-white/30 backdrop-blur-sm -rotate-3 transition-transform duration-700 hover:rotate-0" />
                    <div className="absolute inset-4 lg:inset-10 rounded-[3rem] border border-white bg-white/40 backdrop-blur-md rotate-2 transition-transform duration-700 hover:rotate-0 shadow-[0_20px_50px_-15px_rgba(232,93,158,0.15)]" />

                    <motion.div 
                        style={{ scale: imageScale, y: imageY }} 
                        className="relative w-full h-full z-20 flex items-center justify-center rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden group p-8 lg:p-12"
                    >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={product.images}
                                alt={product.name}
                                fill
                                className={`object-cover transition-transform duration-1000 group-hover:scale-[1.03] ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* COLUMNA DERECHA: Información y Compra */}
                <div className="lg:col-span-6 flex flex-col gap-6 lg:gap-8 lg:pl-10">
                    
                    {/* Header del Producto */}
                    <div className="space-y-4 text-center lg:text-left">
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAD1E6]/40 border border-[#FAD1E6] text-[#E85D9E] text-xs font-bold uppercase tracking-wider">
                                <Crown className="w-3.5 h-3.5" />
                                {product.category}
                            </span>
                            {isOutOfStock ? (
                                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider border border-gray-200">
                                    Agotado
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider border border-green-200 flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                    En Stock
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-[#33182B] tracking-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-baseline justify-center lg:justify-start gap-4 mt-2">
                             <span className="text-4xl lg:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#D14D8B]">
                                {formatCOP(product.price)}
                             </span>
                        </div>
                    </div>

                    {/* Descripción COMPLETA Mágica */}
                    <p className="text-base text-[#7B5C73] font-medium leading-relaxed font-sans text-center lg:text-left bg-white/60 p-6 rounded-3xl border border-pink-100 shadow-[0_10px_30px_-15px_rgba(232,93,158,0.1)] backdrop-blur-md">
                        {product.description}
                    </p>

                    {/* Ficha Técnica (Tallas, Color, Material) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex flex-col bg-pink-50/50 border border-pink-100 p-3.5 rounded-xl items-center lg:items-start text-center lg:text-left transition-colors hover:bg-pink-50">
                            <span className="text-[10px] uppercase font-bold text-[#7B5C73] tracking-widest mb-1.5">Tallas</span>
                            <span className="text-sm font-bold text-[#33182B] leading-snug">{product.size || "Única"}</span>
                        </div>
                        <div className="flex flex-col bg-pink-50/50 border border-pink-100 p-3.5 rounded-xl items-center lg:items-start text-center lg:text-left transition-colors hover:bg-pink-50">
                            <span className="text-[10px] uppercase font-bold text-[#7B5C73] tracking-widest mb-1.5">Color</span>
                            <span className="text-sm font-bold text-[#33182B] leading-snug">{product.color || "Mágico"}</span>
                        </div>
                        <div className="flex flex-col bg-pink-50/50 border border-pink-100 p-3.5 rounded-xl items-center lg:items-start text-center lg:text-left transition-colors hover:bg-pink-50 md:col-span-1 col-span-2">
                            <span className="text-[10px] uppercase font-bold text-[#7B5C73] tracking-widest mb-1.5">Material</span>
                            <span className="text-sm font-bold text-[#33182B] leading-snug">{product.material || "Calidad Premium"}</span>
                        </div>
                    </div>

                    {/* Controles de Compra */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                        <div className={`flex items-center justify-between border-2 border-pink-200 bg-white rounded-full px-5 py-3 sm:w-36 h-14 shadow-sm transition-colors hover:border-[#E85D9E] ${isOutOfStock ? "opacity-40 pointer-events-none" : ""}`}>
                            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors p-1">
                                <Minus size={18} />
                            </button>
                            <span className="font-bold text-[#33182B] text-xl w-8 text-center">{qty}</span>
                            <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors p-1">
                                <Plus size={18} />
                            </button>
                        </div>
                        
                        <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock || isAdding}
                            className={`flex-1 h-14 rounded-full font-bold tracking-wider text-sm md:text-base transition-all flex items-center justify-center gap-3 group relative overflow-hidden
                                ${isOutOfStock 
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200" 
                                    : "bg-[#E85D9E] text-white shadow-[0_10px_20px_-5px_rgba(232,93,158,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(232,93,158,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer"
                                }`}
                        >
                            {/* Brillo del botón */}
                            {!isOutOfStock && (
                                <motion.div 
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                                />
                            )}

                            <AnimatePresence mode="wait">
                                {isOutOfStock ? (
                                    <motion.span key="oos">Prenda Agotada</motion.span>
                                ) : isAdding ? (
                                    <motion.span key="adding" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> ¡Añadido!
                                    </motion.span>
                                ) : (
                                    <motion.span key="default" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                                        <ShoppingBag className="w-5 h-5" /> Agregar al Carrito
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>

                    {/* Badges de Confianza */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 mt-4 pt-6 border-t border-pink-100/60">
                        <div className="flex items-center gap-2 text-xs font-bold text-[#7B5C73]">
                            <ShieldCheck className="w-4 h-4 text-[#FFA8C5]" /> Pago Seguro
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#7B5C73]">
                            <Gift className="w-4 h-4 text-[#FFA8C5]" /> Empaque Mágico
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#7B5C73]">
                            <Star className="w-4 h-4 text-[#FFA8C5]" /> Calidad Garantizada
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </section>

      {/* SECCIÓN INFERIOR BLANCA */}
      <section className="bg-white relative z-20 shadow-[0_-20px_50px_rgba(232,93,158,0.05)] border-t border-[#FAD1E6]/50">
        <div className="max-w-7xl mx-auto px-6 py-20">
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
                
                {/* NUEVA SECCIÓN: GUÍA DE CUIDADOS (Reemplaza la descripción repetida) */}
                <div className="bg-pink-50/40 border border-pink-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 opacity-5">
                        <Sparkles className="w-40 h-40 text-[#E85D9E]" />
                    </div>
                    
                    <h3 className="flex items-center gap-3 text-2xl font-display font-bold text-[#E85D9E] mb-6 relative z-10">
                        <Crown className="w-6 h-6" /> Guía de Cuidados
                    </h3>
                    
                    <p className="text-[#7B5C73] text-sm font-medium mb-8 relative z-10">
                        Nuestras prendas están hechas con detalles delicados y mucho amor. Para mantener la magia intacta por mucho tiempo, te recomendamos:
                    </p>
                    
                    <ul className="space-y-5 relative z-10">
                        <li className="flex items-center gap-4 text-sm text-[#33182B] font-bold">
                            <div className="bg-white p-2.5 rounded-full shadow-sm border border-pink-100"><Droplets className="w-4 h-4 text-[#E85D9E]"/></div>
                            Lavado a mano con agua fría y jabón suave.
                        </li>
                        <li className="flex items-center gap-4 text-sm text-[#33182B] font-bold">
                            <div className="bg-white p-2.5 rounded-full shadow-sm border border-pink-100"><Wind className="w-4 h-4 text-[#E85D9E]"/></div>
                            Secar a la sombra, sin retorcer la prenda.
                        </li>
                        <li className="flex items-center gap-4 text-sm text-[#33182B] font-bold">
                            <div className="bg-white p-2.5 rounded-full shadow-sm border border-pink-100"><SunMedium className="w-4 h-4 text-[#E85D9E]"/></div>
                            No usar blanqueador ni secadora automática.
                        </li>
                    </ul>
                </div>

                {/* LA PROMESA DE LA BOUTIQUE */}
                <div>
                   <ResearchChallenges /> 
                </div>
            </div>
            
            <div className="mb-20">
                 <ProtocolFAQ />
            </div>
            
            <div className="pt-10 border-t border-[#FAD1E6]/50">
                <ProductReviews />
            </div>
        </div>
      </section>

      {!isOutOfStock && <StickyPurchase product={{...product, price: product.price}} qty={qty} />}
      <Footer />
    </div>
  );
}