"use client";
import { motion } from "framer-motion";
import { Heart, Star, Truck, Sparkles, Tag, Crown } from "lucide-react";

// Datos de la marquesina adaptados a la boutique
const ITEMS = [
  { icon: Crown, text: "DISEÑOS EXCLUSIVOS" },
  { icon: Heart, text: "HECHOS CON AMOR" },
  { icon: Truck, text: "ENVÍOS A TODO EL PAÍS" },
  { icon: Star, text: "CALIDAD PREMIUM" },
  { icon: Tag, text: "TALLAS DE LA 0 A LA 12" },
  { icon: Sparkles, text: "ATENCIÓN PERSONALIZADA" },
];

export default function TrustTicker() {
  return (
    <div className="w-full bg-[#FFFDFE] border-b border-[#FAD1E6]/60 py-3 relative z-20 overflow-hidden shadow-sm">
      
      <div className="max-w-7xl mx-auto flex items-center">
        
        {/* --- 1. ELEMENTO ESTÁTICO (NUEVA COLECCIÓN) --- */}
        <div className="hidden md:flex items-center gap-2 pr-6 border-r border-[#FAD1E6]/60 shrink-0 z-20 bg-[#FFFDFE]">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E85D9E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E85D9E]"></span>
            </div>
            <span className="text-[10.5px] font-bold tracking-[0.2em] text-[#E85D9E] uppercase">
                Nueva Colección
            </span>
        </div>

        {/* Versión Móvil del indicador estático (Icono solo) */}
        <div className="md:hidden flex items-center pr-4 border-r border-[#FAD1E6]/60 shrink-0 z-20 bg-[#FFFDFE] pl-4">
             <Crown className="w-5 h-5 text-[#E85D9E]" />
        </div>

        {/* --- 2. MARQUESINA (SCROLL INFINITO) --- */}
        <div className="relative flex-1 overflow-hidden">
            {/* Máscaras de desvanecimiento para que el texto aparezca/desaparezca suavemente */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-[#FFFDFE] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-[#FFFDFE] to-transparent z-10 pointer-events-none" />

            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{
                    duration: 35, // Velocidad suave y elegante
                    repeat: Infinity,
                    ease: "linear",
                }}
                // OPTIMIZACIÓN SAFARI
                style={{ willChange: "transform", backfaceVisibility: "hidden" }}
                className="flex gap-4 md:gap-8 whitespace-nowrap px-4"
            >
                {/* Renderizamos varias veces para asegurar loop infinito perfecto en pantallas anchas */}
                {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
                    
                    /* --- 3. ETIQUETAS "CHIPS" ESTILO BOUTIQUE --- */
                    <div 
                        key={i} 
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAD1E6]/30 border border-[#FAD1E6]/50 shadow-[0_2px_10px_-4px_rgba(232,93,158,0.1)] min-w-fit transition-transform hover:scale-105"
                    >
                        <item.icon className="w-3.5 h-3.5 text-[#E85D9E] shrink-0" />
                        <span className="text-[10px] md:text-[11px] font-sans font-bold tracking-widest text-[#33182B] uppercase">
                            {item.text}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
}