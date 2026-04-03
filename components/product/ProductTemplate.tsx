"use client";

import { useState, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Minus, Plus, CheckCircle2, Sparkles, Gift } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext";

// Componentes secundarios
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import ResearchChallenges from "./ResearchChallenges"; // Ahora es "Por qué elegirnos"
import ProtocolFAQ from "./ProtocolFAQ"; // Ahora es "Dudas Frecuentes"

// Partículas de fondo mágicas (en lugar de ruido estático)
const MagicSparkles = memo(() => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[#E85D9E] shadow-[0_0_10px_#E85D9E] animate-pulse" />
      <div className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-[#FFA8C5] shadow-[0_0_15px_#FFA8C5] animate-ping" style={{ animationDuration: '3s' }} />
      <div className="absolute bottom-[20%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#FAD1E6] shadow-[0_0_8px_#FAD1E6] animate-pulse" style={{ animationDuration: '4s' }} />
  </div>
));
MagicSparkles.displayName = "MagicSparkles";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  purity?: string; // Lo usaremos como material/calidad
  description: string;
  slug: string;
}

export default function ProductTemplate({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isOutOfStock = product.stock <= 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="bg-[#FFFDFE] min-h-screen text-[#33182B] transition-colors duration-300 overflow-x-hidden selection:bg-[#FAD1E6] selection:text-[#E85D9E]">
      <Navbar />

      <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-24 pb-12 lg:pt-0 lg:pb-0">
        
        {/* Glow de fondo suave */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-20 bg-gradient-to-tr from-[#FAD1E6] to-pink-100" />
            <MagicSparkles />
        </div>
        
        {/* Marca de agua de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-[0.03]">
          <motion.h2
            style={{ y: textParallax, WebkitTextStroke: "2px #E85D9E", color: "transparent" }}
            className="text-[20vw] font-handwriting font-bold whitespace-nowrap select-none"
          >
             Boutique
          </motion.h2>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                {/* COLUMNA IZQUIERDA: Textos */}
                <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
                    
                    <div className="flex items-center gap-3 text-[10px] font-sans text-[#7B5C73] uppercase tracking-widest font-bold">
                        <span>REF: {product.id ? product.id.slice(-4).toUpperCase() : "001"}</span>
                        <span className="h-px w-8 bg-[#FAD1E6]" />
                        <span className="text-[#E85D9E] bg-[#FAD1E6]/20 border border-[#FAD1E6] px-3 py-1 rounded-full">
                            {product.category}
                        </span>
                    </div>

                    <div>
                        <h1 className="text-4xl lg:text-6xl font-display font-bold leading-[1.1] mb-4 text-[#33182B]">
                            {product.name}
                        </h1>
                        <p className="text-sm lg:text-base text-[#7B5C73] font-medium leading-relaxed max-w-md font-sans">
                            {product.description.length > 180 
                                ? product.description.slice(0, 180) + "..." 
                                : product.description}
                        </p>
                    </div>

                    <div className="w-full max-w-sm flex flex-col gap-5 mt-2">
                        <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                             <span className="text-3xl lg:text-4xl font-display font-bold text-[#E85D9E]">
                                ${product.price.toLocaleString()}
                             </span>
                        </div>

                        <div className="flex gap-3 h-14">
                            <div className={`flex items-center justify-between border-2 border-[#FAD1E6] bg-white rounded-full px-4 w-32 ${isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-[#7B5C73] hover:text-[#E85D9E]">
                                    <Minus size={16} />
                                </button>
                                <span className="font-bold text-[#33182B] text-lg">{qty}</span>
                                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-[#7B5C73] hover:text-[#E85D9E]">
                                    <Plus size={16} />
                                </button>
                            </div>
                            
                            <button
                                onClick={() => !isOutOfStock && addItem(product, qty)}
                                disabled={isOutOfStock}
                                className={`flex-1 font-bold tracking-wider text-xs md:text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-2 group
                                    ${isOutOfStock 
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300" 
                                        : "bg-gradient-to-r from-[#E85D9E] to-[#D14D8B] text-white hover:scale-[1.02] hover:shadow-[0_10px_25px_-5px_rgba(232,93,158,0.4)] active:scale-95 cursor-pointer"
                                    }`}
                            >
                                <span>{isOutOfStock ? "Agotado" : "Agregar al Carrito"}</span>
                                {!isOutOfStock && <Heart className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform fill-white/20" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* COLUMNA CENTRAL: Imagen Mágica */}
                <div className="lg:col-span-4 order-1 lg:order-2 h-[45vh] lg:h-[65vh] flex items-center justify-center relative mt-8 lg:mt-0">
                    
                    {/* Anillos Rotatorios Estilo Hero */}
                    <div className="absolute w-[280px] h-[280px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-[#FAD1E6] animate-[spin_40s_linear_infinite] opacity-60" />
                    <div className="absolute w-[220px] h-[220px] lg:w-[340px] lg:h-[340px] rounded-full border border-[#FAD1E6]/40 animate-[spin_50s_linear_infinite_reverse]">
                        <div className="absolute top-4 right-10 w-2.5 h-2.5 bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5] rounded-full shadow-[0_0_12px_#E85D9E]" />
                    </div>
                    
                    {/* CORRECCIÓN APLICADA AQUÍ: style solo tiene scale, animate tiene 'y' */}
                    <motion.div 
                        style={{ scale: imageScale }} 
                        animate={{ y: [-10, 10, -10] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
                        className="relative w-[80%] h-[80%] lg:w-[85%] lg:h-[85%] z-20 flex items-center justify-center bg-white/40 backdrop-blur-md rounded-[2.5rem] lg:rounded-[4rem] border-[4px] border-white shadow-[0_25px_50px_-12px_rgba(232,93,158,0.25)] overflow-hidden group"
                    >
                        <Image
                            src={product.images}
                            alt={product.name}
                            fill
                            className={`object-cover transition-transform duration-700 group-hover:scale-110 ${isOutOfStock ? "grayscale opacity-50" : ""}`}
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/20 via-transparent to-transparent pointer-events-none" />
                    </motion.div>
                </div>

                {/* COLUMNA DERECHA: Specs y Detalles */}
                <div className="lg:col-span-4 order-3 lg:order-3 flex flex-col gap-8 text-center lg:text-right items-center lg:items-end">
                    
                    <div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#7B5C73] font-bold block mb-1">
                            Calidad & Material
                        </span>
                        <div className="flex items-center gap-2 justify-center lg:justify-end">
                            <span className="text-xl lg:text-2xl font-display font-bold text-[#33182B]">
                                {product.purity || "Algodón Premium"}
                            </span>
                            <CheckCircle2 size={20} className="text-[#E85D9E]" />
                        </div>
                    </div>

                    <div>
                        <span className="text-[10px] font-sans uppercase tracking-widest text-[#7B5C73] font-bold block mb-2">
                            Disponibilidad
                        </span>
                        <div className={`inline-flex items-center gap-3 border border-[#FAD1E6] bg-white px-5 py-2.5 rounded-full shadow-sm ${isOutOfStock ? "border-gray-300" : ""}`}>
                            <div className={`w-2 h-2 rounded-full ${!isOutOfStock ? "bg-[#E85D9E] animate-pulse" : "bg-gray-400"}`} />
                            <span className={`text-xs font-bold uppercase tracking-wider ${!isOutOfStock ? "text-[#E85D9E]" : "text-gray-500"}`}>
                                {!isOutOfStock ? `${product.stock} Unidades en Stock` : "Agotado Temporalmente"}
                            </span>
                        </div>
                    </div>

                    <div className="w-full lg:w-auto pt-6 border-t border-[#FAD1E6]">
                        <span className="text-[#E85D9E] text-[10px] uppercase tracking-widest font-sans font-bold block mb-4">
                            Por qué te encantará
                        </span>
                        <ul className="flex flex-col gap-3">
                            {[
                                { t: "Hecho con Amor", i: Heart }, 
                                { t: "Envíos a todo el país", i: Gift }, 
                                { t: "Diseños Exclusivos", i: Sparkles }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center justify-center lg:justify-end gap-2 text-sm font-bold text-[#33182B]">
                                    <item.i className="w-4 h-4 text-[#FFA8C5]" /> {item.t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
      </section>

      {/* SECCIÓN INFERIOR BLANCA */}
      <section className="bg-white relative z-20 shadow-[0_-20px_50px_rgba(232,93,158,0.05)] border-t border-[#FAD1E6]/50">
        <div className="max-w-7xl mx-auto px-6 py-20">
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                <div className="prose prose-pink max-w-none">
                    <h3 className="flex items-center gap-2 text-xl font-display font-bold text-[#E85D9E] mb-6">
                        <Sparkles className="w-5 h-5" /> Detalles Mágicos
                    </h3>
                    <p className="whitespace-pre-line text-[#7B5C73] leading-relaxed text-sm md:text-base font-medium">
                        {product.description}
                    </p>
                </div>
                <div>
                   <ResearchChallenges /> {/* Se renombró internamente a Por qué elegirnos */}
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

      {!isOutOfStock && <StickyPurchase product={product} qty={qty} />}
      <Footer />
    </div>
  );
}