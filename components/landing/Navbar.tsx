"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  Search, 
  Sparkles, 
  Crown, 
  ShoppingBag, 
  Ruler, 
  Heart, 
  MessageCircleQuestion 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.webp"; 
import { useCart } from "@/context/CartContext"; 

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const { toggleCart, cartCount } = useCart();
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear el scroll de forma segura cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "unset"; 
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Manejo de la aparición/desaparición del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Aseguramos no disparar eventos raros en el tope de la página
      if (currentScrollY <= 0) {
        setIsVisible(true);
        setScrolled(false);
        return;
      }

      setScrolled(currentScrollY > 20);

      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
         if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
           setIsVisible(false); // Esconde al bajar
         } else {
           setIsVisible(true); // Muestra al subir
         }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll suave hacia las secciones
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Extraemos el ID de la url (ej. "/#catalog" -> "catalog")
    if (href.includes("#")) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId);
      
      if (element) {
        setMobileOpen(false); // Cierra el menú en móviles
        
        setTimeout(() => {
           // Scroll suave calculando el header
           const offset = 80; // Espacio extra para que el navbar no tape el título
           const elementPosition = element.getBoundingClientRect().top + window.scrollY;
           window.scrollTo({
             top: elementPosition - offset,
             behavior: "smooth"
           });
        }, 150); // Pequeño delay para dejar que la animación del menú termine
      }
    }
  };

  // Enlaces enlazados a los IDs reales de tu Home
  const navLinks = [
    { name: "Catálogo", href: "/#catalog", icon: ShoppingBag },
    { name: "Novedades", href: "/#gallery", icon: Sparkles }, // Apuntando a la galería de ensueño
    { name: "Tallas", href: "/#sizes", icon: Ruler },
    { name: "Nosotros", href: "/#about", icon: Heart },
    { name: "FAQ", href: "/#faq", icon: MessageCircleQuestion },
  ];

  const showNavbar = isVisible || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl py-3 shadow-[0_4px_25px_-10px_rgba(232,93,158,0.2)]"
          : "bg-white py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-2 md:gap-3">
            <Link 
                href="/" 
                className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 cursor-pointer hover:scale-105 transition-transform duration-300"
            >
                <Image 
                    src={logo} 
                    alt="Logo Guadalupe" 
                    fill 
                    className="object-contain drop-shadow-sm"
                    priority
                />
            </Link>

            <Link href="/" className="flex flex-col justify-center cursor-pointer group">
                <span className="font-display font-bold text-lg md:text-xl leading-none tracking-wide text-[#33182B] group-hover:text-[#E85D9E] transition-colors duration-300">
                    GUADALUPE
                </span>
                <span className="font-sans text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-[#7B5C73] mt-0.5 md:mt-1 group-hover:text-[#E85D9E]/70 transition-colors duration-300">
                    Boutique Infantil
                </span>
            </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-[13px] font-semibold text-[#7B5C73] hover:text-[#E85D9E] hover:bg-[#FAD1E6]/40 px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer" 
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* ICONS & ACTIONS */}
        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden md:flex items-center gap-1">
              <button className="p-2.5 text-[#7B5C73] hover:text-[#E85D9E] hover:bg-[#FAD1E6]/40 rounded-full transition-all duration-300 cursor-pointer">
                 <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={toggleCart} 
                className="relative p-2.5 text-[#7B5C73] hover:text-[#E85D9E] hover:bg-[#FAD1E6]/40 rounded-full transition-all duration-300 group cursor-pointer"
              >
                 <ShoppingCart className="w-5 h-5" />
                 {cartCount > 0 && mounted && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#E85D9E] text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm animate-in zoom-in">
                        {cartCount}
                    </span>
                 )}
              </button>
          </div>

          {/* ICONO DEL CARRITO EN MÓVIL */}
          <button 
                onClick={toggleCart} 
                className="lg:hidden relative p-2 text-[#33182B] hover:text-[#E85D9E] hover:bg-[#FAD1E6]/40 rounded-full transition-all duration-300"
          >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && mounted && (
                 <span className="absolute top-0 right-0 w-4 h-4 bg-[#E85D9E] text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm animate-in zoom-in">
                     {cartCount}
                 </span>
              )}
          </button>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden flex items-center justify-center p-2 text-[#33182B] hover:text-[#E85D9E] hover:bg-[#FAD1E6]/40 rounded-full active:scale-95 transition-all relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - DISEÑO PRINCESA */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // Fondo con gradiente mágico y bordes suaves
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-gradient-to-b from-white via-[#FFFDFE] to-[#FFF0F7] border-b-2 border-[#FAD1E6] shadow-[0_20px_50px_-10px_rgba(232,93,158,0.2)] overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 70px)" }} 
          >
            <div className="p-6 flex flex-col gap-3 pb-10 relative overflow-hidden"> 
              
              {/* Detalle mágico en el fondo */}
              <Crown className="absolute -top-4 -right-4 w-32 h-32 text-[#FAD1E6]/20 rotate-12 pointer-events-none" />
              
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-4 text-[17px] font-bold text-[#7B5C73] p-4 rounded-[2rem] hover:bg-[#FAD1E6]/40 hover:text-[#E85D9E] active:bg-[#FAD1E6]/70 active:text-[#E85D9E] transition-all relative overflow-hidden"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  <div className="bg-white p-2.5 rounded-full shadow-sm text-[#E85D9E] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  {link.name}
                  <Sparkles className="w-4 h-4 text-[#FAD1E6] ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )})}
              
              <div className="flex flex-col gap-3 mt-4 pt-6 border-t-2 border-dashed border-[#FAD1E6]/60">
                 <button className="w-full py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-[#E85D9E] to-[#F188B9] text-white rounded-[2rem] font-bold text-[15px] shadow-[0_8px_20px_-6px_rgba(232,93,158,0.5)] active:scale-95 transition-all">
                    <Search className="w-5 h-5" /> Buscar vestido ideal
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}