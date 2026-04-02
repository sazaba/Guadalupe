"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, ScanLine, Info, FlaskConical, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CatalogModal from "./CatalogModal";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string;
  purity?: string;
  slug: string;
  description?: string;
  isFeatured?: boolean; // <--- AGREGADO
}

const CATEGORIES = ["All", "Research Peptides", "Nootropics", "Supplements", "SARMs"];
const CATEGORY_MAP: Record<string, string> = {
  "Research Peptides": "peptides",
  "Nootropics": "nootropics",
  "Supplements": "supplements",
  "SARMs": "sarms"
};

const LabContainer = ({ image, name, isOOS }: { image: string, name: string, isOOS: boolean }) => {
  return (
    <div className="relative w-48 h-64 mx-auto flex items-center justify-center transform-gpu">
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-[var(--text-muted)] stroke-[0.5] group-hover:stroke-[1] transition-all">
          <circle cx="100" cy="100" r="90" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="70" strokeOpacity="0.5" />
          <path d="M100 20 L100 0 M200 100 L180 100 M100 180 L100 200 M20 100 L0 100" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="relative z-10 w-32 h-40 transform-gpu"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-contain drop-shadow-2xl filter contrast-110 saturate-100 transition-all duration-500 ${isOOS ? "grayscale opacity-40" : ""}`}
          priority={true}
        />
        <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent blur-md opacity-30 rounded-full scale-x-75" />
      </motion.div>
    </div>
  );
};

export default function ProductShowcase({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isCatalogOpen, setCatalogOpen] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const { addItem } = useCart();

  const inStockProducts = products.filter(p => p.stock > 0);

  const filteredProducts = activeCategory === "All" 
    ? inStockProducts 
    : inStockProducts.filter(p => p.category?.toLowerCase() === CATEGORY_MAP[activeCategory]?.toLowerCase());

  // ORDENAR: Ponemos los productos destacados primero
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0; 
  });

  // Tomamos los 4 primeros después de ordenarlos
  const displayProducts = sortedProducts.slice(0, 4);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle = {
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    setParticles((prev) => [...prev, newParticle]);
    setAddingId(product.id);
    addItem(product, 1);

    setTimeout(() => setAddingId(null), 1200);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 850);
  };

  return (
    <>
    {/* PARTICLES OVERLAY */}
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{ 
              x: typeof window !== 'undefined' ? window.innerWidth - 60 : 1000, 
              y: 60, 
              opacity: 0, 
              scale: 0.3,
              rotate: 360 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="absolute will-change-transform"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--color-brand-primary)] blur-xl w-12 h-12 -translate-x-1/2 -translate-y-1/2 opacity-40" />
              <FlaskConical className="w-6 h-6 text-[var(--color-brand-primary)] drop-shadow-[0_0_12px_var(--color-brand-primary)]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>

    <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 bg-[var(--bg-page)]" id="catalog">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-[var(--text-main)] mb-4">
            Active <span className="text-[var(--text-muted)]">Compounds</span>
          </h2>
          <p className="text-[var(--text-muted)] max-w-md text-lg font-sans">
            Research-grade peptides synthesized for maximum bioavailability.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border transition-all active:scale-95 ${
                activeCategory === cat
                  ? "bg-[var(--text-main)] text-[var(--bg-page)] border-[var(--text-main)]" 
                  : "bg-transparent text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[var(--text-muted)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor Grid Fijo para evitar saltos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {displayProducts.map((product) => {
            const isOOS = product.stock <= 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`w-full group relative rounded-[2.5rem] transition-all duration-300 
                           bg-[var(--glass-bg)] border backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-70 transform-gpu
                           ${isOOS ? "border-red-500/20 grayscale-[0.5]" : "border-[var(--glass-border)] hover:border-[var(--color-brand-primary)]/50 shadow-sm hover:shadow-lg"}`}
              >
                <Link href={`/product/${product.slug}`} className="flex flex-col items-center text-center p-5 w-full h-full">
                    {!isOOS && product.stock < 50 && (
                      <span className="absolute top-5 right-5 z-30 bg-[var(--text-main)] text-[var(--bg-page)] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          HIGH DEMAND
                      </span>
                    )}

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--accent-glow)] rounded-full blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10 w-full mb-2">
                        <LabContainer image={product.images} name={product.name} isOOS={isOOS} />
                    </div>

                    <div className="w-full px-1 relative z-10 mt-auto">
                        <div className="flex items-center justify-center gap-2 mb-3 opacity-60">
                            <ScanLine className="w-3 h-3 text-[var(--color-brand-primary)]" />
                            <p className="text-[10px] uppercase tracking-widest font-mono text-[var(--text-muted)]">
                                REF: {product.slug.slice(0,8)}
                            </p>
                        </div>
                        
                        <h3 className={`text-xl font-bold font-display mb-1 leading-tight ${isOOS ? "text-[var(--text-muted)]" : "text-[var(--text-main)]"}`}>
                          {product.name}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] font-mono mb-6 flex items-center justify-center gap-2">
                            <FlaskConical className="w-3 h-3" /> {product.purity || "Premium Grade"} 
                        </p>
                        
                        <div className="border-t border-[var(--glass-border)] pt-5 w-full">
                            <div className="flex justify-between items-center mb-4">
                                <span className={`text-xl font-bold font-mono ${isOOS ? "text-[var(--text-muted)] line-through" : "text-[var(--text-main)]"}`}>
                                  ${Number(product.price).toFixed(2)}
                                </span>
                                
                                {isOOS ? (
                                  <div className="flex items-center gap-1.5 bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
                                      <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                      <span className="text-[9px] uppercase font-bold text-red-500">Out of Stock</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                      <span className="text-[9px] uppercase font-bold text-emerald-600 dark:text-emerald-400">In Stock</span>
                                  </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center justify-center gap-1.5 border border-[var(--glass-border)] text-[var(--text-muted)] px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider active:bg-[var(--glass-border)] transition-colors">
                                    <Info className="w-3.5 h-3.5" /> Details
                                </div>
                                
                                <button 
                                    onClick={(e) => !isOOS && handleAddToCart(e, product)}
                                    className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg touch-manipulation ${
                                        isOOS 
                                        ? "bg-[var(--glass-border)] text-[var(--text-muted)] cursor-not-allowed"
                                        : addingId === product.id 
                                        ? "bg-emerald-500 text-white" 
                                        : "bg-[var(--text-main)] text-[var(--bg-page)] hover:scale-[1.02] active:scale-95 cursor-pointer"
                                    }`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isOOS ? (
                                          <motion.span key="oos" className="flex items-center gap-1">
                                            Sold Out
                                          </motion.span>
                                        ) : addingId === product.id ? (
                                            <motion.span key="ok" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-1">
                                                Added <Check className="w-3.5 h-3.5" />
                                            </motion.span>
                                        ) : (
                                            <motion.span key="add" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-center gap-1">
                                                Add <Plus className="w-3.5 h-3.5" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* BOTÓN ULTRA PREMIUM PARA VER EL CATÁLOGO COMPLETO */}
      <div className="mt-20 flex justify-center relative">
        <motion.div 
          className="absolute inset-0 bg-[var(--color-brand-primary)] rounded-full blur-[40px] opacity-20 pointer-events-none mx-auto w-64 h-20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <button 
          onClick={() => setCatalogOpen(true)}
          className="relative group p-[1px] rounded-full overflow-hidden shadow-2xl shadow-[var(--color-brand-primary)]/10 hover:shadow-[var(--color-brand-primary)]/30 transition-shadow duration-500 active:scale-95"
        >
          <motion.div 
             className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-brand-primary)_360deg)] opacity-70"
             animate={{ rotate: 360 }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative flex items-center gap-5 bg-[var(--bg-page)]/95 backdrop-blur-xl px-10 py-5 rounded-full transition-all group-hover:bg-[var(--bg-page)]/80">
             <motion.div 
               className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg]"
               animate={{ x: ["-300%", "400%"] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
             />
             
             <div className="flex flex-col text-left relative z-10">
                <span className="text-[10px] text-[var(--color-brand-primary)] font-bold uppercase tracking-widest mb-0.5">
                  Unlock Access
                </span>
                <span className="text-[var(--text-main)] text-base font-display font-bold tracking-wide">
                  Explore Full Catalog
                </span>
             </div>
             
             <div className="w-10 h-10 rounded-full bg-[var(--text-main)] text-[var(--bg-page)] flex items-center justify-center relative z-10 shadow-[0_0_15px_var(--color-brand-primary)] group-hover:translate-x-1.5 group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all duration-300">
               <ArrowRight className="w-5 h-5" />
             </div>
          </div>
        </button>
      </div>

    </section>

    <AnimatePresence>
      {isCatalogOpen && <CatalogModal products={products} onClose={() => setCatalogOpen(false)} />}
    </AnimatePresence>
    </>
  );
}