"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
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
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setMobileOpen(false); // Cierra el menú y restaura el scroll
        setTimeout(() => {
           element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  const navLinks = [
    { name: "Catálogo", href: "/#catalog" },
    { name: "Novedades", href: "/#verification" },
    { name: "Tallas", href: "/#calculator" },
    { name: "Nosotros", href: "/#science" },
    { name: "FAQ", href: "/#faq" },
  ];

  const showNavbar = isVisible || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl py-3 shadow-[0_4px_25px_-10px_rgba(232,93,158,0.2)]"
          : "bg-transparent py-6"
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

          {/* ICONO DEL CARRITO EN MÓVIL (Al lado del menú hamburguesa) */}
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
            className="lg:hidden flex items-center justify-center p-2 text-[#33182B] hover:text-[#E85D9E] hover:bg-[#FAD1E6]/40 rounded-full active:scale-95 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-[#FAD1E6]/50 shadow-[0_10px_40px_-10px_rgba(232,93,158,0.15)] overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 70px)" }} 
          >
            <div className="p-6 flex flex-col gap-2 pb-10"> 
              
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-semibold text-[#33182B] p-4 rounded-2xl hover:bg-[#FAD1E6]/30 active:bg-[#FAD1E6]/50 active:text-[#E85D9E] transition-all"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-[#FAD1E6]/50">
                 <button className="w-full py-4 flex items-center justify-center gap-2 bg-[#FAD1E6]/30 hover:bg-[#FAD1E6]/60 rounded-2xl text-[#E85D9E] font-bold text-sm transition-all">
                    <Search className="w-5 h-5" /> Buscar productos
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}