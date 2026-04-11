"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye, Sparkles, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CatalogModal from "./CatalogModal";

// Actualizamos el tipo a 'any' para evitar que TS moleste por el JSON
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: any; // <-- CAMBIO AQUÍ
  purity?: string;
  slug: string;
  description?: string;
  isFeatured?: boolean; 
}

const CATEGORIES = ["Todos", "Nueva Coleccion", "Vestidos", "Accesorios", "Zapatos", "Sport"];
const CATEGORY_MAP: Record<string, string> = {
  "Nueva Coleccion": "nueva coleccion",
  "Vestidos": "vestidos",
  "Accesorios": "accesorios",
  "Zapatos": "zapatos",
  "Sport": "sport"
};

// Formateador de moneda colombiana
const formatCOP = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(Number(price));
};

const BoutiqueImageWrapper = ({ image, name, isOOS }: { image: any, name: string, isOOS: boolean }) => {
  // --- SOLUCIÓN: EXTRAER FOTO PRINCIPAL DE FORMA SEGURA ---
  let mainImage = "";
  if (Array.isArray(image) && image.length > 0) {
      mainImage = String(image[0]);
  } else if (typeof image === 'string') {
      try {
          const parsed = JSON.parse(image);
          mainImage = Array.isArray(parsed) && parsed.length > 0 ? String(parsed[0]) : image;
      } catch {
          mainImage = image;
      }
  }

  return (
    <div className="relative w-40 h-48 md:w-44 md:h-56 mx-auto flex items-center justify-center mt-6 mb-8 transform-gpu">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-12px] md:inset-[-15px] rounded-full border border-dashed border-[#FAD1E6] opacity-60 pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-20px] md:inset-[-25px] rounded-full border border-[#FAD1E6]/30 pointer-events-none"
      >
        <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-[#E85D9E] rounded-full shadow-[0_0_8px_#E85D9E]" />
      </motion.div>

      <motion.div
        animate={{ y: [-6, 6, -6] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2rem] border-[3px] border-white shadow-[0_15px_30px_-8px_rgba(232,93,158,0.25)] flex items-center justify-center z-20 overflow-hidden group-hover:border-[#FAD1E6]/80 transition-colors duration-500"
      >
        {mainImage && (
            <Image 
            src={mainImage} 
            alt={name} 
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ${isOOS ? "grayscale opacity-50" : ""}`}
            priority={true}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default function ProductShowcase({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isCatalogOpen, setCatalogOpen] = useState(false);

  const inStockProducts = products.filter(p => p.stock > 0);

  const filteredProducts = activeCategory === "Todos" 
    ? inStockProducts 
    : inStockProducts.filter(p => p.category?.toLowerCase() === CATEGORY_MAP[activeCategory]?.toLowerCase());

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0; 
  });

  const displayProducts = sortedProducts.slice(0, 4);

  return (
    <>
    <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 bg-[#FFFDFE]" id="catalog">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 overflow-hidden">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-[#33182B] mb-4"
          >
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">Favoritos</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#7B5C73] max-w-md text-lg font-medium"
          >
            Descubre las prendas más hermosas, diseñadas para que brillen en cada momento.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex overflow-x-auto gap-2 pb-2 w-full md:w-auto md:justify-end md:flex-wrap snap-x scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap shrink-0 snap-start px-5 py-2.5 rounded-full text-xs font-bold tracking-wider capitalize border transition-all duration-300 active:scale-95 ${
                activeCategory === cat
                  ? "bg-[#E85D9E] text-white border-[#E85D9E] shadow-[0_4px_15px_-3px_rgba(232,93,158,0.4)]" 
                  : "bg-white text-[#7B5C73] border-[#FAD1E6] hover:border-[#E85D9E] hover:text-[#E85D9E]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {displayProducts.map((product, index) => {
            const isOOS = product.stock <= 0;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                className={`w-full group relative rounded-[2.5rem] transition-all duration-500 
                           bg-white/80 border backdrop-blur-xl transform-gpu
                           ${isOOS ? "border-gray-200" : "border-[#FAD1E6]/50 hover:border-[#E85D9E]/40 shadow-[0_8px_30px_rgb(232,93,158,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(232,93,158,0.15)]"}`}
              >
                <Link href={`/product/${product.slug}`} className="flex flex-col items-center text-center p-6 w-full h-full">
                    
                    {!isOOS && product.stock < 50 && (
                      <span className="absolute top-5 right-5 z-30 bg-gradient-to-r from-[#FFA8C5] to-[#E85D9E] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> MÁS VENDIDO
                      </span>
                    )}

                    <div className="relative z-10 w-full mb-2 mt-2">
                        <BoutiqueImageWrapper image={product.images} name={product.name} isOOS={isOOS} />
                    </div>

                    <div className="w-full px-2 relative z-10 mt-auto">
                        
                        <h3 className={`text-xl font-display font-bold mb-1 leading-tight ${isOOS ? "text-[#94A3B8]" : "text-[#33182B]"}`}>
                          {product.name}
                        </h3>
                        
                        <p className="text-xs text-[#7B5C73] font-medium mb-6 flex items-center justify-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 text-[#FFA8C5]" /> Diseño Exclusivo
                        </p>
                        
                        <div className="border-t border-[#FAD1E6]/50 pt-5 w-full">
                            <div className="flex justify-between items-center mb-5">
                                <span className={`text-2xl font-bold font-sans ${isOOS ? "text-[#94A3B8] line-through decoration-1" : "text-[#E85D9E]"}`}>
                                  {formatCOP(product.price)}
                                </span>
                                
                                {isOOS ? (
                                  <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                                      <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Agotado</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1.5 bg-[#FAD1E6]/30 px-3 py-1.5 rounded-full border border-[#FAD1E6]">
                                      <div className="w-1.5 h-1.5 rounded-full bg-[#E85D9E] animate-pulse"></div>
                                      <span className="text-[9px] uppercase font-bold text-[#E85D9E] tracking-wider">Disponible</span>
                                  </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center justify-center gap-1.5 bg-white border border-[#FAD1E6] text-[#7B5C73] px-3 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#FAD1E6]/20 transition-colors">
                                    <Eye className="w-4 h-4" /> Detalles
                                </div>
                                
                                <div 
                                    className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm touch-manipulation ${
                                        isOOS 
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                        : "bg-[#E85D9E] text-white hover:bg-[#D14D8B] hover:shadow-[0_4px_15px_-3px_rgba(232,93,158,0.4)] active:scale-95 cursor-pointer"
                                    }`}
                                >
                                    {isOOS ? "Agotado" : "Ver Tallas"}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-20 flex justify-center">
        <button 
          onClick={() => setCatalogOpen(true)}
          className="group relative px-8 md:px-12 py-4 md:py-5 bg-[#E85D9E] text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:bg-[#D14D8B] hover:shadow-[0_10px_30px_-5px_rgba(232,93,158,0.5)] active:scale-95 cursor-pointer flex items-center gap-3"
        >
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
          />
          
          <Sparkles className="w-5 h-5 text-pink-200 relative z-10" />
          <span className="relative z-10 text-base md:text-lg font-display tracking-wide">
            Ver Todo el Catálogo
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform relative z-10" />
        </button>
      </div>

    </section>

    <AnimatePresence>
      {isCatalogOpen && <CatalogModal products={products} onClose={() => setCatalogOpen(false)} />}
    </AnimatePresence>
    </>
  );
}