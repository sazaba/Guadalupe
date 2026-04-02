"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Plus, Check, Crown, Heart, Sparkles, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

// --- INTERFAZ BACKEND (SIN CAMBIOS) ---
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
    isFeatured?: boolean; 
}

// Categorías adaptadas a tu boutique
const CATEGORIES = ["Todos", "Vestidos", "Conjuntos", "Accesorios", "Zapatos"];
const CATEGORY_MAP: Record<string, string> = {
  "Vestidos": "vestidos",
  "Conjuntos": "conjuntos",
  "Accesorios": "accesorios",
  "Zapatos": "zapatos"
};

export default function CatalogModal({ products, onClose }: { products: Product[], onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [filtered, setFiltered] = useState(products);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const { addItem } = useCart();

  useEffect(() => {
    let result = products;
    if (selectedCategory !== "Todos") {
      result = result.filter(p => p.category?.toLowerCase() === CATEGORY_MAP[selectedCategory]?.toLowerCase());
    }
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Ordenar para que los destacados salgan primero
    result.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
    });

    setFiltered(result);
  }, [searchTerm, selectedCategory, products]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.stock <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const newParticle = { id: Date.now(), x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };

    setParticles((prev) => [...prev, newParticle]);
    setAddingId(product.id);
    addItem(product, 1);

    setTimeout(() => setAddingId(null), 1200);
    setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== newParticle.id)), 850);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(10px)" }} 
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} 
      exit={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-[#FFFDFE]/95 backdrop-blur-3xl overflow-hidden flex flex-col h-[100dvh] w-screen transform-gpu"
    >
        {/* PARTÍCULAS MÁGICAS (CORAZONES) */}
        <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, opacity: 1, scale: 1, rotate: 0 }}
                animate={{ x: typeof window !== 'undefined' ? window.innerWidth - 60 : 1000, y: 60, opacity: 0, scale: 0.5, rotate: 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="absolute will-change-transform"
              >
                <Heart className="w-8 h-8 text-[#E85D9E] fill-[#E85D9E] drop-shadow-[0_0_15px_rgba(232,93,158,0.8)]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GLOW DE FONDO (MAGIA BOUTIQUE) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}
              className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#FAD1E6]/50 rounded-full blur-[120px]" 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, delay: 0.2 }}
              className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FFA8C5]/30 rounded-full blur-[120px]" 
            />
        </div>

        {/* HEADER */}
        <div className="relative z-10 flex items-center justify-between p-5 md:p-8 border-b border-[#FAD1E6]/50 shrink-0 bg-white/60 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAD1E6] to-white border border-white text-[#E85D9E] flex items-center justify-center shadow-[0_4px_15px_-3px_rgba(232,93,158,0.2)]">
                    <Crown className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-[#33182B]">Catálogo Mágico</h2>
                    <p className="text-[10px] md:text-xs font-sans font-bold text-[#7B5C73] uppercase tracking-widest">{filtered.length} Diseños Hermosos</p>
                </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-10 h-10 rounded-full border border-[#FAD1E6] bg-white flex items-center justify-center text-[#7B5C73] hover:bg-[#E85D9E] hover:text-white hover:border-[#E85D9E] transition-all shadow-sm active:scale-95"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* CONTROLES (BUSCADOR Y CATEGORÍAS) */}
        <div className="relative z-10 px-5 md:px-8 py-6 grid gap-4 md:grid-cols-[1fr_auto] shrink-0 border-b border-[#FAD1E6]/30">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B5C73]/60 group-focus-within:text-[#E85D9E] transition-colors" />
                <input 
                    type="text" 
                    placeholder="Buscar vestido, talla o color..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-[#FAD1E6] rounded-2xl py-3.5 pl-12 pr-4 text-[#33182B] focus:border-[#E85D9E] focus:ring-2 focus:ring-[#FAD1E6] outline-none transition-all shadow-[0_2px_10px_-4px_rgba(232,93,158,0.1)] font-medium" 
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide pt-1">
                {CATEGORIES.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2.5 rounded-2xl text-[11px] font-bold uppercase transition-all border shrink-0 ${
                            selectedCategory === cat 
                            ? "bg-[#E85D9E] text-white border-[#E85D9E] shadow-[0_4px_10px_-2px_rgba(232,93,158,0.4)]" 
                            : "bg-white text-[#7B5C73] border-[#FAD1E6] hover:border-[#E85D9E] hover:text-[#E85D9E]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className="flex-1 overflow-y-auto px-5 md:px-8 pt-6 pb-24 relative z-10 custom-scrollbar overscroll-contain">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                    {filtered.map((product) => {
                        const isOOS = product.stock <= 0;
                        
                        return (
                        <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`group relative bg-white border rounded-3xl transition-all overflow-hidden ${
                                isOOS 
                                ? "border-gray-200 grayscale-[0.2] opacity-80" 
                                : "border-[#FAD1E6]/60 hover:border-[#E85D9E]/40 hover:shadow-[0_15px_30px_-10px_rgba(232,93,158,0.15)] active:scale-[0.98]"
                            }`}
                        >
                            <Link href={`/product/${product.slug}`} className="flex gap-4 p-3 md:p-4 w-full h-full items-center">
                                {/* Imagen Miniatura */}
                                <div className="relative w-24 h-28 md:w-28 md:h-32 shrink-0 bg-[#FAD1E6]/10 rounded-2xl flex items-center justify-center overflow-hidden">
                                    <Image 
                                      src={product.images} 
                                      alt={product.name} 
                                      fill 
                                      sizes="120px" 
                                      className={`object-cover transition-transform duration-700 ${!isOOS && "group-hover:scale-110"}`} 
                                    />
                                    {product.isFeatured && !isOOS && (
                                       <div className="absolute top-1.5 left-1.5 bg-[#E85D9E] p-1 rounded-full shadow-sm">
                                         <Sparkles className="w-2.5 h-2.5 text-white" />
                                       </div>
                                    )}
                                </div>

                                {/* Detalles del producto */}
                                <div className="flex flex-col flex-1 h-full py-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className="font-display font-bold text-[#33182B] text-sm md:text-base line-clamp-2 pr-2">{product.name}</h4>
                                    </div>
                                    <p className="text-[10px] text-[#7B5C73] font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                                        {product.category}
                                    </p>
                                    
                                    <div className="mt-auto flex justify-between items-end">
                                        <div>
                                            {isOOS ? (
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded-md">Agotado</span>
                                            ) : (
                                                <span className="text-lg md:text-xl font-bold text-[#E85D9E]">
                                                    ${Number(product.price).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <button 
                                            onClick={(e) => !isOOS && handleAddToCart(e, product)}
                                            disabled={isOOS}
                                            className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all shadow-sm ${
                                                isOOS 
                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                                : addingId === product.id 
                                                ? "bg-green-400 text-white shadow-green-400/30" 
                                                : "bg-[#E85D9E] text-white hover:bg-[#D14D8B] hover:shadow-[0_4px_10px_rgba(232,93,158,0.3)]"
                                            }`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {isOOS ? (
                                                    <motion.div key="oos" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><X className="w-4 h-4 md:w-5 md:h-5" /></motion.div>
                                                ) : addingId === product.id ? (
                                                    <motion.div key="ok" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}><Check className="w-4 h-4 md:w-5 md:h-5" /></motion.div>
                                                ) : (
                                                    <motion.div key="add" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }}><Plus className="w-4 h-4 md:w-5 md:h-5" /></motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* ESTADO VACÍO */}
            {filtered.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-[40vh] text-[#7B5C73]"
                >
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-20 text-[#E85D9E]" />
                    <h3 className="text-xl font-display font-bold text-[#33182B] mb-2">No encontramos resultados</h3>
                    <p className="text-sm font-medium">Intenta buscando con otras palabras o selecciona otra categoría.</p>
                </motion.div>
            )}
        </div>
    </motion.div>
  );
}