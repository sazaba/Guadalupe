"use client";

import { useState, useRef, memo } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useAnimation, Variants } from "framer-motion";
import { Heart, Minus, Plus, CheckCircle2, Sparkles, Gift, Star, ShieldCheck, Crown } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext";

// Componentes secundarios
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import ResearchChallenges from "./ResearchChallenges"; 
import ProtocolFAQ from "./ProtocolFAQ"; 

// --- COMPONENTES VISUALES PRO ---

// 1. Fondo SVG Animado (Líneas fluidas)
const AnimatedLuxuryBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
    <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        d="M0,50 Q25,20 50,50 T100,50"
        fill="none"
        stroke="url(#gradient-pink)"
        strokeWidth="0.2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5, y: [-2, 2, -2] }}
        transition={{ pathLength: { duration: 5, ease: "easeInOut" }, y: { duration: 8, repeat: Infinity } }}
      />
      <motion.path
        d="M0,70 Q40,90 60,40 T100,70"
        fill="none"
        stroke="url(#gradient-pink)"
        strokeWidth="0.1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3, y: [2, -2, 2] }}
        transition={{ pathLength: { duration: 7, ease: "easeInOut", delay: 1 }, y: { duration: 10, repeat: Infinity } }}
      />
      <defs>
        <linearGradient id="gradient-pink" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E85D9E" />
          <stop offset="50%" stopColor="#FFA8C5" />
          <stop offset="100%" stopColor="#FAD1E6" />
        </linearGradient>
      </defs>
    </svg>
    {/* Orbes de luz desenfocados */}
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-gradient-to-tr from-[#FAD1E6]/40 to-pink-200/40 rounded-full blur-[100px]" />
    <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-gradient-to-bl from-[#FFA8C5]/30 to-purple-100/30 rounded-full blur-[120px]" />
  </div>
));
AnimatedLuxuryBackground.displayName = "AnimatedLuxuryBackground";

// 2. Partículas Flotantes Interactivas
const FloatingParticles = memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ y: "110vh", x: Math.random() * 100 + "vw", opacity: 0, scale: Math.random() * 0.5 + 0.5 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0], rotate: 360 }}
          transition={{ duration: Math.random() * 10 + 15, repeat: Infinity, delay: Math.random() * 5, ease: "linear" }}
        >
          {i % 3 === 0 ? <Sparkles className="text-[#E85D9E]/30 w-6 h-6" /> : <div className="w-2 h-2 rounded-full bg-[#FFA8C5]/40 shadow-[0_0_10px_#FFA8C5]" />}
        </motion.div>
      ))}
    </div>
  );
});
FloatingParticles.displayName = "FloatingParticles";

// --- INTERFAZ ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  purity?: string; 
  description: string;
  slug: string;
}

export default function ProductTemplate({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const isOutOfStock = product.stock <= 0;

  // --- VARIANTES DE ANIMACIÓN TIPADAS PARA TYPESCRIPT ---
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#33182B] overflow-x-hidden selection:bg-[#FAD1E6] selection:text-[#E85D9E] font-sans">
      <Navbar />

      <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-24 pb-12 lg:pt-0 lg:pb-0 overflow-hidden">
        
        {/* Fondos Pro */}
        <AnimatedLuxuryBackground />
        <FloatingParticles />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                {/* --- COLUMNA 1: TEXTOS (Izquierda) --- */}
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer}
                    className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start z-20"
                >
                    <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md border border-white px-4 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <Crown className="w-4 h-4 text-[#E85D9E]" />
                        <span className="text-[10px] font-bold text-[#7B5C73] uppercase tracking-[0.2em]">Colección Exclusiva</span>
                        <div className="w-1 h-1 rounded-full bg-[#D14D8B]" />
                        <span className="text-[10px] font-bold text-[#D14D8B] uppercase tracking-widest">{product.category}</span>
                    </motion.div>

                    <motion.div variants={fadeUpVariant}>
                        <h1 className="text-5xl lg:text-7xl font-serif font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#33182B] to-[#7B5C73] mb-4 drop-shadow-sm">
                            {product.name}
                        </h1>
                        <p className="text-base lg:text-lg text-[#7B5C73]/80 font-medium leading-relaxed max-w-md">
                            {product.description.length > 180 ? product.description.slice(0, 180) + "..." : product.description}
                        </p>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="w-full max-w-sm flex flex-col gap-6 mt-4 p-6 bg-white/40 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl shadow-[#FAD1E6]/20">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#7B5C73]">Precio</span>
                            <span className="text-4xl font-serif font-bold text-[#E85D9E]">${product.price.toLocaleString()}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className={`flex items-center justify-between border-2 border-white bg-white/80 backdrop-blur-sm rounded-full px-4 h-14 w-full sm:w-36 shadow-sm ${isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors"><Minus size={18} /></button>
                                <span className="font-bold text-[#33182B] text-xl">{qty}</span>
                                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-[#7B5C73] hover:text-[#E85D9E] transition-colors"><Plus size={18} /></button>
                            </div>
                            
                            <button
                                onClick={() => !isOutOfStock && addItem(product, qty)}
                                disabled={isOutOfStock}
                                className={`flex-1 h-14 font-bold tracking-wider text-sm rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden
                                    ${isOutOfStock ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#33182B] text-white hover:scale-[1.02] hover:shadow-[0_15px_30px_-5px_rgba(51,24,43,0.4)] active:scale-95 cursor-pointer"}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10">{isOutOfStock ? "Agotado" : "Añadir al Carrito"}</span>
                                {!isOutOfStock && <Heart className="relative z-10 w-5 h-5 group-hover:scale-110 transition-transform" />}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* --- COLUMNA 2: IMAGEN CENTRAL WOW (Centro) --- */}
                <div className="lg:col-span-4 order-1 lg:order-2 h-[50vh] lg:h-[75vh] flex items-center justify-center relative mt-8 lg:mt-0 perspective-[1000px]">
                    
                    {/* Anillos de luz orbitales */}
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-[300px] h-[300px] lg:w-[480px] lg:h-[480px] rounded-full border border-dashed border-[#E85D9E]/30 opacity-60" />
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute w-[240px] h-[240px] lg:w-[380px] lg:h-[380px] rounded-full border border-[#FAD1E6]/50">
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#E85D9E] border-2 border-[#E85D9E]" />
                    </motion.div>
                    
                    {/* Contenedor de Imagen con Glassmorphism */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring", stiffness: 50 }}
                        whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                        className="relative w-[85%] h-[85%] lg:w-[90%] lg:h-[90%] z-20 bg-white/20 backdrop-blur-xl rounded-[2.5rem] lg:rounded-[4rem] border-[8px] border-white/80 shadow-[0_40px_80px_-20px_rgba(232,93,158,0.3)] overflow-visible group"
                    >
                        {/* Badges Flotantes sobre la imagen */}
                        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-6 top-10 z-30 bg-white p-3 rounded-2xl shadow-xl border border-white flex items-center gap-2">
                            <div className="bg-[#FAD1E6] p-2 rounded-full"><Star className="w-4 h-4 text-[#E85D9E] fill-[#E85D9E]" /></div>
                            <span className="text-xs font-bold text-[#33182B] whitespace-nowrap hidden sm:block">Premium</span>
                        </motion.div>

                        <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-6 bottom-20 z-30 bg-white p-3 rounded-2xl shadow-xl border border-white flex items-center gap-2">
                            <div className="bg-green-100 p-2 rounded-full"><ShieldCheck className="w-4 h-4 text-green-600" /></div>
                            <span className="text-xs font-bold text-[#33182B] whitespace-nowrap hidden sm:block">Garantizado</span>
                        </motion.div>

                        {/* Imagen Real */}
                        <div className="relative w-full h-full rounded-[1.8rem] lg:rounded-[3.2rem] overflow-hidden">
                            <Image
                                src={product.images}
                                alt={product.name}
                                fill
                                className={`object-cover transition-transform duration-1000 group-hover:scale-110 ${isOutOfStock ? "grayscale opacity-60" : ""}`}
                                priority
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/40 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </div>

                {/* --- COLUMNA 3: SPECS (Derecha) --- */}
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer}
                    className="lg:col-span-4 order-3 lg:order-3 flex flex-col gap-8 text-center lg:text-right items-center lg:items-end z-20"
                >
                    <motion.div variants={fadeUpVariant} className="bg-white/50 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-lg w-full max-w-sm">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7B5C73] block mb-2">Material & Acabado</span>
                        <div className="flex items-center gap-3 justify-center lg:justify-end">
                            <span className="text-2xl font-serif font-black text-[#33182B]">{product.purity || "Algodón Orgánico"}</span>
                            <div className="bg-[#E85D9E]/10 p-2 rounded-full"><CheckCircle2 size={24} className="text-[#E85D9E]" /></div>
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="w-full max-w-sm">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7B5C73] block mb-3">Disponibilidad Inmediata</span>
                        <div className={`relative overflow-hidden flex items-center justify-between border border-white bg-white/60 backdrop-blur-md p-4 rounded-2xl shadow-sm ${isOutOfStock ? "opacity-70" : ""}`}>
                            <div className="flex items-center gap-3 z-10">
                                <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] ${!isOutOfStock ? "text-[#E85D9E] bg-[#E85D9E] animate-pulse" : "text-gray-400 bg-gray-400"}`} />
                                <span className={`text-sm font-black uppercase tracking-wider ${!isOutOfStock ? "text-[#33182B]" : "text-gray-500"}`}>
                                    {!isOutOfStock ? "En Stock" : "Agotado"}
                                </span>
                            </div>
                            <span className="text-2xl font-black text-[#E85D9E] z-10 opacity-30">{product.stock}</span>
                            {!isOutOfStock && <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#E85D9E] to-[#FAD1E6]" style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }} />}
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUpVariant} className="w-full max-w-sm pt-6 border-t border-[#FAD1E6]/50">
                        <ul className="flex flex-col gap-4">
                            {[
                                { t: "Confección Premium Hecha a Mano", i: Heart }, 
                                { t: "Empaque de Lujo para Regalo", i: Gift }, 
                                { t: "Diseño Exclusivo de Autor", i: Sparkles }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center justify-center lg:justify-end gap-3 text-sm font-bold text-[#7B5C73] group cursor-default">
                                    <span className="group-hover:text-[#E85D9E] transition-colors">{item.t}</span>
                                    <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-[#E85D9E] group-hover:text-white transition-all">
                                        <item.i className="w-4 h-4" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

            </div>
        </div>
      </section>

      {/* SECCIÓN INFERIOR: Transición suave de cristal a sólido */}
      <section className="bg-white relative z-20 shadow-[0_-30px_60px_rgba(232,93,158,0.08)] rounded-t-[3rem] lg:rounded-t-[5rem] mt-[-2rem] pt-24 border-t border-white">
        <div className="max-w-7xl mx-auto px-6 pb-20">
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="prose prose-pink max-w-none bg-[#FAFAFA] p-8 md:p-12 rounded-[2.5rem] border border-[#FAD1E6]/30 shadow-inner"
                >
                    <h3 className="flex items-center gap-3 text-2xl font-serif font-black text-[#33182B] mb-6">
                        <Sparkles className="w-6 h-6 text-[#E85D9E]" /> La Magia en los Detalles
                    </h3>
                    <p className="whitespace-pre-line text-[#7B5C73] leading-relaxed text-base font-medium">
                        {product.description}
                    </p>
                </motion.div>
                <div className="flex flex-col justify-center">
                   <ResearchChallenges /> 
                </div>
            </div>
            
            <div className="mb-20">
                 <ProtocolFAQ />
            </div>
            
            <div className="pt-16 border-t border-[#FAD1E6]/30">
                <ProductReviews />
            </div>
        </div>
      </section>

      {!isOutOfStock && <StickyPurchase product={product} qty={qty} />}
      <Footer />
    </div>
  );
}