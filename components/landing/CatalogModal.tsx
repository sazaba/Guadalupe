"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Plus, Check, Crown, Heart, Sparkles, ShoppingBag, Eye } from "lucide-react";
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

// 1. ETIQUETAS ACTUALIZADAS (Igual al ProductShowcase)
const CATEGORIES = ["Todos", "Nueva Coleccion", "Vestidos", "Accesorios", "Zapatos", "Sport"];
const CATEGORY_MAP: Record<string, string> = {
  "Nueva Coleccion": "nueva coleccion",
  "Vestidos": "vestidos",
  "Accesorios": "accesorios",
  "Zapatos": "zapatos",
  "Sport": "sport"
};

// 2. EFECTO DE IMAGEN MÁGICA REPLICADO
const BoutiqueImageWrapper = ({ image, name, isOOS }: { image: string, name: string, isOOS: boolean }) => {
  return (
    <div className="relative w-32 h-40 md:w-40 md:h-52 mx-auto flex items-center justify-center mt-4 mb-6 transform-gpu">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-10px] md:inset-[-15px] rounded-full border border-dashed border-[#FAD1E6] opacity-60 pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[-18px] md:inset-[-25px] rounded-full border border-[#FAD1E6]/30 pointer-events-none"
      >
        <div className="absolute top-2 right-4 w-1.5 h-1.5 bg-[#E85D9E] rounded-full shadow-[0_0_8px_#E85D9E]" />
      </motion.div>

      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2rem] border-[3px] border-white shadow-[0_15px_30px_-8px_rgba(232,93,158,0.25)] flex items-center justify-center z-20 overflow-hidden group-hover:border-[#FAD1E6]/80 transition-colors duration-500"
      >
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ${isOOS ? "grayscale opacity-50" : ""}`}
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/10 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
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
        {/* PARTÍCULAS MÁGICAS AL AGREGAR */}
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
                <div className="relative">
                  <div className="absolute inset-0 bg-[#E85D9E] blur-xl w-12 h-12 -translate-x-1/2 -translate-y-1/2 opacity-50" />
                  <Heart className="w-8 h-8 text-[#E85D9E] fill-[#E85D9E] drop-shadow-[0_0_15px_rgba(232,93,158,0.8)]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GLOW DE FONDO */}
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
              className="w-10 h-10 rounded-full border border-[#FAD1E6] bg-white flex items-center justify-center text-[#7B5C73] hover:bg-[#E85D9E] hover:text-white hover:border-[#E85D9E] transition-all shadow-sm active:scale-95 cursor-pointer"
            >
                <X className="w-5 h-5" />
            </button>
        </div>

        {/* CONTROLES (BUSCADOR Y CATEGORÍAS) */}
        <div className="relative z-10 px-5 md:px-8 py-6 grid gap-4 md:grid-cols-[1fr_auto] shrink-0 border-b border-[#FAD1E6]/30 bg-white/40 backdrop-blur-sm">
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
                        className={`px-5 py-2.5 rounded-2xl text-[11px] font-bold uppercase transition-all border shrink-0 cursor-pointer ${
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

        {/* GRID DE PRODUCTOS (Estructura idéntica al ProductShowcase) */}
        <div className="flex-1 overflow-y-auto px-5 md:px-8 pt-8 pb-24 relative z-10 custom-scrollbar overscroll-contain">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
                <AnimatePresence mode="popLayout">
                    {filtered.map((product) => {
                        const isOOS = product.stock <= 0;
                        
                        return (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            whileHover={{ y: -8 }}
                            className={`w-full group relative rounded-[2.5rem] transition-all duration-500 
                                       bg-white/80 border backdrop-blur-xl transform-gpu
                                       ${isOOS ? "border-gray-200" : "border-[#FAD1E6]/50 hover:border-[#E85D9E]/40 shadow-[0_8px_30px_rgb(232,93,158,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(232,93,158,0.15)]"}`}
                          >
                            <Link href={`/product/${product.slug}`} className="flex flex-col items-center text-center p-5 md:p-6 w-full h-full">
                                
                                {/* Badge de Más Vendido */}
                                {!isOOS && product.stock < 50 && (
                                  <span className="absolute top-5 right-5 z-30 bg-gradient-to-r from-[#FFA8C5] to-[#E85D9E] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                                      <Sparkles className="w-3 h-3" /> MÁS VENDIDO
                                  </span>
                                )}

                                {/* Imagen con el Wrapper estilo Hero */}
                                <div className="relative z-10 w-full mb-2 mt-2">
                                    <BoutiqueImageWrapper image={product.images} name={product.name} isOOS={isOOS} />
                                </div>

                                <div className="w-full px-1 relative z-10 mt-auto">
                                    
                                    <h3 className={`text-lg md:text-xl font-display font-bold mb-1 leading-tight line-clamp-2 ${isOOS ? "text-[#94A3B8]" : "text-[#33182B]"}`}>
                                      {product.name}
                                    </h3>
                                    
                                    <p className="text-[10px] md:text-xs text-[#7B5C73] font-medium mb-5 flex items-center justify-center gap-1.5">
                                        <Crown className="w-3.5 h-3.5 text-[#FFA8C5]" /> {product.category}
                                    </p>
                                    
                                    <div className="border-t border-[#FAD1E6]/50 pt-5 w-full">
                                        <div className="flex justify-between items-center mb-5">
                                            <span className={`text-xl md:text-2xl font-bold font-sans ${isOOS ? "text-[#94A3B8] line-through decoration-1" : "text-[#E85D9E]"}`}>
                                              ${Number(product.price).toFixed(2)}
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
                                            
                                            <button 
                                                onClick={(e) => !isOOS && handleAddToCart(e, product)}
                                                className={`flex items-center justify-center gap-1.5 px-3 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm touch-manipulation ${
                                                    isOOS 
                                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                                    : addingId === product.id 
                                                    ? "bg-green-400 text-white shadow-green-400/30" 
                                                    : "bg-[#E85D9E] text-white hover:bg-[#D14D8B] hover:shadow-[0_4px_15px_-3px_rgba(232,93,158,0.4)] active:scale-95 cursor-pointer"
                                                }`}
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isOOS ? (
                                                      <motion.span key="oos" className="flex items-center gap-1">Agotado</motion.span>
                                                    ) : addingId === product.id ? (
                                                        <motion.span key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-1">
                                                            ¡Listo! <Check className="w-4 h-4" />
                                                        </motion.span>
                                                    ) : (
                                                        <motion.span key="add" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center gap-1">
                                                            Agregar <Plus className="w-4 h-4" />
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

            {/* ESTADO VACÍO */}
            {filtered.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-[50vh] text-[#7B5C73]"
                >
                    <ShoppingBag className="w-20 h-20 mb-5 opacity-20 text-[#E85D9E]" />
                    <h3 className="text-2xl font-display font-bold text-[#33182B] mb-2">No encontramos resultados</h3>
                    <p className="text-base font-medium">Intenta buscando con otras palabras o selecciona otra categoría.</p>
                </motion.div>
            )}
        </div>
    </motion.div>
  );
}