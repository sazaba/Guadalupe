"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, Eye, Heart, Check, Sparkles, Crown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CatalogModal from "./CatalogModal";
import { useCart } from "@/context/CartContext";

// La interfaz se mantiene EXACTAMENTE igual para tu backend
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

// Componente visual de la imagen rediseñado
const BoutiqueImageWrapper = ({ image, name, isOOS }: { image: string, name: string, isOOS: boolean }) => {
  return (
    <div className="relative w-48 h-64 mx-auto flex items-center justify-center transform-gpu">
      {/* Fondo resplandeciente mágico */}
      <motion.div 
        className="absolute inset-0 z-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      >
         <div className="w-40 h-40 bg-gradient-to-tr from-[#FAD1E6] to-[#FFA8C5] rounded-full blur-[40px] opacity-40" />
      </motion.div>

      {/* Imagen del producto flotante */}
      <motion.div
        className="relative z-10 w-36 h-48 transform-gpu transition-transform duration-500 group-hover:scale-110"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-contain drop-shadow-[0_15px_25px_rgba(232,93,158,0.2)] transition-all duration-500 ${isOOS ? "grayscale opacity-50" : ""}`}
          priority={true}
        />
        {/* Sombra en el piso */}
        <div className="absolute -bottom-6 left-0 right-0 h-4 bg-black/5 blur-md rounded-full scale-x-75 group-hover:scale-x-90 group-hover:bg-[#E85D9E]/10 transition-all duration-500" />
      </motion.div>
    </div>
  );
};

export default function ProductShowcase({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [isCatalogOpen, setCatalogOpen] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const { addItem } = useCart();

  const inStockProducts = products.filter(p => p.stock > 0);

  const filteredProducts = activeCategory === "Todos" 
    ? inStockProducts 
    : inStockProducts.filter(p => p.category?.toLowerCase() === CATEGORY_MAP[activeCategory]?.toLowerCase());

  // Ordenamos para mostrar los destacados primero
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return 0; 
  });

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
    {/* PARTÍCULAS MÁGICAS AL AGREGAR AL CARRITO */}
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1, rotate: 0 }}
            animate={{ 
              x: typeof window !== 'undefined' ? window.innerWidth - 60 : 1000, 
              y: 60, 
              opacity: 0, 
              scale: 0.5,
              rotate: 360 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
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

    <section className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-10 bg-[#FFFDFE]" id="catalog">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-[#33182B] mb-4"
          >
            Nueva <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">Colección</span>
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
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border transition-all duration-300 active:scale-95 ${
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
                    
                    {/* Badge de Más Vendido */}
                    {!isOOS && product.stock < 50 && (
                      <span className="absolute top-5 right-5 z-30 bg-gradient-to-r from-[#FFA8C5] to-[#E85D9E] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> MÁS VENDIDO
                      </span>
                    )}

                    {/* Imagen */}
                    <div className="relative z-10 w-full mb-4 mt-4">
                        <BoutiqueImageWrapper image={product.images} name={product.name} isOOS={isOOS} />
                    </div>

                    <div className="w-full px-2 relative z-10 mt-auto">
                        
                        <h3 className={`text-xl font-display font-bold mb-1 leading-tight ${isOOS ? "text-[#94A3B8]" : "text-[#33182B]"}`}>
                          {product.name}
                        </h3>
                        
                        {/* Se reemplazó la pureza clínica por un indicador de diseño */}
                        <p className="text-xs text-[#7B5C73] font-medium mb-6 flex items-center justify-center gap-1.5">
                            <Crown className="w-3.5 h-3.5 text-[#FFA8C5]" /> Diseño Exclusivo
                        </p>
                        
                        <div className="border-t border-[#FAD1E6]/50 pt-5 w-full">
                            <div className="flex justify-between items-center mb-5">
                                <span className={`text-2xl font-bold font-sans ${isOOS ? "text-[#94A3B8] line-through decoration-1" : "text-[#E85D9E]"}`}>
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
                                          <motion.span key="oos" className="flex items-center gap-1">
                                            Agotado
                                          </motion.span>
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

      {/* BOTÓN ULTRA PREMIUM PARA VER EL CATÁLOGO COMPLETO */}
      <div className="mt-24 flex justify-center relative">
        <motion.div 
          className="absolute inset-0 bg-[#E85D9E] rounded-full blur-[50px] opacity-20 pointer-events-none mx-auto w-72 h-24"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <button 
          onClick={() => setCatalogOpen(true)}
          className="relative group p-[2px] rounded-full overflow-hidden shadow-2xl shadow-[#E85D9E]/10 hover:shadow-[#E85D9E]/30 transition-all duration-500 active:scale-95"
        >
          {/* Borde animado brillante */}
          <motion.div 
             className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,#E85D9E_360deg)] opacity-80"
             animate={{ rotate: 360 }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="relative flex items-center gap-6 bg-white/95 backdrop-blur-xl px-10 py-5 rounded-full transition-all group-hover:bg-white/90">
             
             <div className="flex flex-col text-left relative z-10">
                <span className="text-[10px] text-[#E85D9E] font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Ver más magia
                </span>
                <span className="text-[#33182B] text-lg font-display font-bold tracking-wide">
                  Explorar Catálogo Completo
                </span>
             </div>
             
             <div className="w-12 h-12 rounded-full bg-[#FAD1E6]/50 text-[#E85D9E] flex items-center justify-center relative z-10 group-hover:translate-x-2 group-hover:bg-[#E85D9E] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(232,93,158,0.4)] transition-all duration-300">
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