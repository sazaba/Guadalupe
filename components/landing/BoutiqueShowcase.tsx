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

// 1. NUEVOS TAGS CATEGORÍAS (Actualizados según tu petición)
const CATEGORIES = ["Todos", "Nueva Coleccion", "Vestidos", "Accesorios", "Zapatos", "Sport"];
const CATEGORY_MAP: Record<string, string> = {
  "Nueva Coleccion": "nueva coleccion",
  "Vestidos": "vestidos",
  "Accesorios": "accesorios",
  "Zapatos": "zapatos",
  "Sport": "sport"
};

// 2. EFECTO HERO REPLICADO EN LOS PRODUCTOS
const BoutiqueImageWrapper = ({ image, name, isOOS }: { image: string, name: string, isOOS: boolean }) => {
  return (
    <div className="relative w-40 h-48 md:w-44 md:h-56 mx-auto flex items-center justify-center mt-6 mb-8 transform-gpu">
      
      {/* Anillos rotatorios decorativos (El "algo que las rodea" del Hero) */}
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

      {/* Contenedor de la imagen: Bordes muy redondos, borde blanco y sombra */}
      <motion.div
        animate={{ y: [-6, 6, -6] }} // Animación flotante suave
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-[2rem] border-[3px] border-white shadow-[0_15px_30px_-8px_rgba(232,93,158,0.25)] flex items-center justify-center z-20 overflow-hidden group-hover:border-[#FAD1E6]/80 transition-colors duration-500"
      >
        <Image 
          src={image} 
          alt={name} 
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          // object-cover y scale-105 replicado del hero
          className={`object-cover scale-105 group-hover:scale-110 transition-transform duration-700 ${isOOS ? "grayscale opacity-50" : ""}`}
          priority={true}
        />
        {/* Filtro suave sobre la imagen replicado del Hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#33182B]/10 to-transparent pointer-events-none" />
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

        {/* --- TAGS ACTUALIZADOS --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 md:justify-end"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider capitalize border transition-all duration-300 active:scale-95 ${
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

                    {/* Imagen con el nuevo Wrapper estilo Hero */}
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