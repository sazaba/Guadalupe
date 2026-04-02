"use client";

import { useState, useRef, memo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingCart, Minus, Plus, CheckCircle2, Activity, AlertCircle } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext";

// Componentes secundarios
import ProductReviews from "./ProductReviews";
import StickyPurchase from "./StickyPurchase";
import ResearchChallenges from "./ResearchChallenges";
import ProtocolFAQ from "./ProtocolFAQ";

const StaticNoise = memo(() => (
  <div 
    className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
    }}
  />
));
StaticNoise.displayName = "StaticNoise";

const getAccentColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case "peptides": return "#00C9FF";
    case "nootropics": return "#92FE9D";
    default: return "#00C9FF";
  }
};

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
  
  const accentColor = getAccentColor(product.category);
  const isOutOfStock = product.stock <= 0;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div className="bg-[var(--bg-page)] min-h-screen text-[var(--text-main)] transition-colors duration-300 overflow-x-hidden selection:bg-[var(--color-brand-primary)] selection:text-white">
      <Navbar />

      <section ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-center pt-24 pb-12 lg:pt-0 lg:pb-0">
        
        <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20"
              style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
            />
            <StaticNoise />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-10">
          <motion.h2
            style={{ 
                y: textParallax,
                WebkitTextStroke: "1px var(--text-muted)", 
                color: "transparent"
            }}
            className="text-[18vw] font-display font-black uppercase leading-none whitespace-nowrap select-none"
          >
             {product.slug?.split("-")[0] || "LABS"}
          </motion.h2>
        </div>

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">

                <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
                    
                    <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)]">
                        <span>ID_{product.id ? product.id.slice(-4).toUpperCase() : "001"}</span>
                        <span className="h-px w-8 bg-[var(--glass-border)]" />
                        <span style={{ color: accentColor }} className="font-bold uppercase tracking-widest bg-[var(--glass-bg)] border border-[var(--glass-border)] px-2 py-0.5 rounded-sm">
                            {product.category}
                        </span>
                    </div>

                    <div>
                        <h1 className="text-5xl lg:text-7xl font-display font-black leading-[0.9] tracking-tighter mb-4 text-[var(--text-main)]">
                            {product.name}
                        </h1>
                        <p className="text-sm lg:text-base text-[var(--text-muted)] leading-relaxed max-w-md font-sans">
                            {product.description.length > 180 
                                ? product.description.slice(0, 180) + "..." 
                                : product.description}
                        </p>
                    </div>

                    <div className="w-full max-w-sm flex flex-col gap-5 mt-2">
                        <div className="flex items-baseline gap-2 justify-center lg:justify-start">
                             <span className="text-4xl font-display font-black tracking-tighter text-[var(--text-main)]">
                                ${product.price.toLocaleString()}
                             </span>
                             <span className="text-[10px] font-mono uppercase text-[var(--text-muted)]">
                                USD / Lyophilized
                             </span>
                        </div>

                        <div className="flex gap-3 h-12">
                            <div className={`flex items-center justify-between border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md rounded px-3 w-32 ${isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}>
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                                    <Minus size={14} />
                                </button>
                                <span className="font-mono font-bold text-[var(--text-main)]">{qty}</span>
                                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="text-[var(--text-muted)] hover:text-[var(--text-main)]">
                                    <Plus size={14} />
                                </button>
                            </div>
                            
                            <button
                                onClick={() => !isOutOfStock && addItem(product, qty)}
                                disabled={isOutOfStock}
                                className={`flex-1 font-bold uppercase tracking-widest text-[10px] md:text-xs rounded shadow-lg transition-all flex items-center justify-center gap-2 group
                                    ${isOutOfStock 
                                        ? "bg-[var(--glass-border)] text-[var(--text-muted)] cursor-not-allowed" 
                                        : "bg-[var(--text-main)] text-[var(--bg-page)] hover:opacity-90 active:scale-95"
                                    }`}
                            >
                                <span>{isOutOfStock ? "Temporarily Depleted" : "Add to Lab Cart"}</span>
                                {!isOutOfStock && <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 order-1 lg:order-2 h-[40vh] lg:h-[60vh] flex items-center justify-center relative">
                    <div 
                        className="absolute w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] rounded-full border border-[var(--glass-border)] animate-[spin_20s_linear_infinite]"
                        style={{ borderTopColor: accentColor }}
                    />
                    <div className="absolute w-[220px] h-[220px] lg:w-[320px] lg:h-[320px] rounded-full border border-dashed border-[var(--glass-border)] animate-[spin_30s_linear_infinite_reverse] opacity-40" />
                    
                    <motion.div style={{ scale: imageScale }} className="relative w-[85%] h-[85%] z-20 flex items-center justify-center">
                        <Image
                            src={product.images}
                            alt={product.name}
                            fill
                            className={`object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${isOutOfStock ? "grayscale opacity-50" : ""}`}
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </motion.div>
                </div>

                <div className="lg:col-span-4 order-3 lg:order-3 flex flex-col gap-8 text-center lg:text-right items-center lg:items-end">
                    
                    <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] block mb-1">
                            HPLC Purity
                        </span>
                        <div className="flex items-center gap-2 justify-center lg:justify-end">
                            <span className="text-3xl font-display font-bold text-[var(--text-main)]">
                                {product.purity || "99.8%"}
                            </span>
                            <CheckCircle2 size={18} color={accentColor} />
                        </div>
                    </div>

                    <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] block mb-2">
                            Inventory Status
                        </span>
                        <div className={`inline-flex items-center gap-3 border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 rounded-full backdrop-blur-sm ${isOutOfStock ? "border-red-500/30" : ""}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${!isOutOfStock ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                            <span className={`text-xs font-bold ${!isOutOfStock ? "text-[var(--text-main)]" : "text-red-500"}`}>
                                {!isOutOfStock ? `${product.stock} Vials Available` : "OUT OF STOCK"}
                            </span>
                        </div>
                    </div>

                    <div className="w-full lg:w-auto pt-6 border-t border-[var(--glass-border)]">
                        <span style={{ color: accentColor }} className="text-[9px] uppercase tracking-widest font-mono block mb-3">
                            Specifications
                        </span>
                        <ul className="flex flex-col gap-2">
                            {["Research Grade", "Sterile Vial", "Mass Spec Verified"].map((item, i) => (
                                <li key={i} className="text-sm font-bold uppercase tracking-wide text-[var(--text-main)]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
      </section>

      <section className="border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-20">
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                <div className="prose dark:prose-invert max-w-none">
                    <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] mb-6 text-[var(--text-muted)]">
                        <Activity className="w-4 h-4" /> Comprehensive Abstract
                    </h3>
                    <p className="whitespace-pre-line text-[var(--text-muted)] leading-relaxed text-sm md:text-base">
                        {product.description}
                    </p>
                </div>
                <div>
                   <ResearchChallenges />
                </div>
            </div>
            
            <div className="mb-20">
                 <ProtocolFAQ />
            </div>
            
            <div className="pt-10 border-t border-[var(--glass-border)]">
                <ProductReviews />
            </div>
        </div>
      </section>

      {!isOutOfStock && <StickyPurchase product={product} qty={qty} />}
      <Footer />
    </div>
  );
}