"use client";
import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "../../context/AdminContext";
import { Menu } from "lucide-react";
import { motion } from "framer-motion"; // Añadido para consistencia en animaciones
import logo from "../../app/assets/logo.webp"; 

export default function MobileHeader() {
  const { toggleSidebar } = useAdmin();

  return (
    <header className="lg:hidden h-20 border-b border-[#FAD1E6]/40 bg-[#FFFDFE]/85 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30 shadow-[0_4px_20px_rgba(250,209,230,0.15)]">
        
        {/* Logo y Nombre de la Boutique */}
        <Link href="/" className="flex items-center gap-3 group">
             <motion.div 
               whileHover={{ rotate: [0, -10, 10, 0] }}
               transition={{ duration: 0.5 }}
               className="shrink-0 w-10 h-10 relative flex items-center justify-center bg-[#FAD1E6]/30 rounded-full p-1"
             >
                <Image 
                  src={logo} 
                  alt="Guadalupe Boutique Logo" 
                  fill 
                  className="object-contain drop-shadow-[0_2px_6px_rgba(232,93,158,0.2)]" 
                />
             </motion.div>
             <div className="flex flex-col justify-center">
                 <span className="font-display font-bold text-sm leading-none tracking-tight text-[#33182B] group-hover:text-[#E85D9E] transition-colors">
                    GUADALUPE
                 </span>
                 <span className="text-[#7B5C73] font-medium text-[10px] tracking-widest mt-1">
                    BOUTIQUE
                 </span>
             </div>
        </Link>
        
        {/* Botón de Menú Hamburguesa */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="p-2 text-[#7B5C73] hover:text-[#E85D9E] bg-[#FAD1E6]/20 hover:bg-[#FAD1E6]/40 rounded-full transition-colors outline-none shadow-[0_2px_8px_rgba(250,209,230,0.2)]"
          aria-label="Abrir menú"
        >
            <Menu className="w-5 h-5" />
        </motion.button>
    </header>
  );
}