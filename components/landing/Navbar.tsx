"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, Search, Globe } from "lucide-react";
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
  
  const [currentLang, setCurrentLang] = useState('es'); // Lo pasé a 'es' por defecto visualmente
  
  const { toggleCart, cartCount } = useCart();
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
    
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
      const cookieValue = match ? match[2] : null;

      const localTranslate = window.localStorage.getItem('googtrans');

      if ((cookieValue && cookieValue.includes('en')) || (localTranslate && localTranslate.includes('en'))) {
        setCurrentLang('en');
      } else {
        setCurrentLang('es');
      }
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode === currentLang) return;
    
    setCurrentLang(langCode);
    
    const host = window.location.hostname;
    const rootDomain = host.split('.').length > 2 ? host.substring(host.indexOf('.')) : `.${host}`;
    
    if (langCode === 'en') {
      const expireStr = "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans${expireStr}`;
      document.cookie = `googtrans${expireStr} domain=${host};`;
      document.cookie = `googtrans${expireStr} domain=.${host};`;
      document.cookie = `googtrans${expireStr} domain=${rootDomain};`; 
      
      window.localStorage.removeItem('googtrans');
      window.sessionStorage.removeItem('googtrans');

      document.documentElement.classList.remove('translating');
      document.documentElement.classList.remove('translated-ltr');
    } else {
      const translateValue = `/es/${langCode}`;
      document.cookie = `googtrans=${translateValue}; path=/; domain=${host};`;
      document.cookie = `googtrans=${translateValue}; path=/; domain=.${host};`;
      document.cookie = `googtrans=${translateValue}; path=/; domain=${rootDomain};`;
      window.localStorage.setItem('googtrans', translateValue);
    }
    
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"; 
      document.body.style.touchAction = "none"; 
    } else {
      document.body.style.overflow = ""; 
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 0) return;

      setScrolled(currentScrollY > 20);

      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
         if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
           setIsVisible(false); 
         } else {
           setIsVisible(true); 
         }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        setMobileOpen(false);
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Nombres adaptados a la boutique, manteniendo las rutas del boilerplate
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-[var(--bg-page)]/90 backdrop-blur-xl border-b border-[var(--glass-border)] py-3 shadow-sm"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
            <Link 
                href="/" 
                className="relative w-10 h-10 md:w-11 md:h-11 shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
                <Image 
                    src={logo} 
                    alt="Logo Guadalupe" 
                    fill 
                    className="object-contain"
                    priority
                />
            </Link>

            <div className={`hidden md:block h-8 w-[1px] bg-[var(--text-muted)] opacity-20`} />

            <Link href="/" className="flex flex-col justify-center cursor-pointer group">
                <span className="font-display font-bold text-lg md:text-xl leading-none tracking-tight text-[var(--text-main)] mb-1.5 transition-colors group-hover:text-[var(--color-brand-primary)]">
                    GUADALUPE
                </span>
                
                {/* Cambiado el estilo "hacker" por uno de boutique */}
                <div className="flex items-center justify-center px-3 py-0.5 rounded-full bg-pink-100 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 w-fit shadow-sm">
                    <span className="font-sans text-[9px] md:text-[10px] uppercase font-bold text-pink-600 dark:text-pink-400 tracking-[0.15em] leading-none">
                        Boutique Infantil
                    </span>
                </div>
            </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors py-2 relative group cursor-pointer" 
            >
              {link.name}
              {/* La línea animada inferior ahora usa el color primario (rosa) definido en globals */}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-brand-primary)] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden md:flex items-center gap-2">
              
              {/* Botón de idioma modificado a tonos rosa/palo de rosa */}
              <div 
                className={`relative flex items-center bg-[var(--text-muted)]/10 p-1 mr-2 rounded-full cursor-pointer notranslate border border-[var(--glass-border)] shadow-inner w-[90px] h-[30px] transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => mounted && changeLanguage(currentLang === 'es' ? 'en' : 'es')}
              >
                {mounted && (
                  <>
                    <motion.div
                      className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-pink-400 to-pink-500 rounded-full shadow-md"
                      initial={false}
                      animate={{
                        left: currentLang === 'es' ? '4px' : 'calc(50% + 0px)',
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                    
                    <span className={`relative z-10 w-1/2 text-center text-[10px] font-bold flex items-center justify-center gap-1 transition-colors duration-300 ${currentLang === 'es' ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                      <span>🇪🇸</span> ES
                    </span>
                    <span className={`relative z-10 w-1/2 text-center text-[10px] font-bold flex items-center justify-center gap-1 transition-colors duration-300 ${currentLang === 'en' ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                      <span>🇺🇸</span> EN
                    </span>
                  </>
                )}
              </div>

              <button className="p-2 text-[var(--text-main)] hover:bg-pink-100 dark:hover:bg-pink-500/10 rounded-full transition-colors cursor-pointer">
                 <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={toggleCart} 
                className="relative p-2 text-[var(--text-main)] hover:bg-pink-100 dark:hover:bg-pink-500/10 rounded-full transition-colors group cursor-pointer"
              >
                 <ShoppingCart className="w-5 h-5 group-hover:text-[var(--color-brand-primary)] transition-colors" />
                 {cartCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[var(--bg-page)] animate-bounce">
                        {cartCount}
                    </span>
                 )}
              </button>
          </div>

          <button
            className="lg:hidden flex items-center justify-center p-2 -mr-2 text-[var(--text-main)] active:scale-95 transition-transform"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            style={{ minWidth: "44px", minHeight: "44px" }} 
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }} 
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-[var(--bg-page)] border-b border-[var(--glass-border)] shadow-2xl overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 80px)" }} 
          >
            <div className="p-6 flex flex-col gap-4 pb-20"> 
              
              <div className="flex items-center justify-between p-4 bg-[var(--text-muted)]/5 rounded-xl border border-[var(--glass-border)] mb-2 notranslate">
                <div className="flex items-center gap-2 text-[var(--text-main)]">
                  <Globe className="w-5 h-5 text-pink-500" />
                  <span className="font-bold text-sm">Idioma</span>
                </div>
                
                <div 
                  className={`relative flex items-center bg-[var(--bg-page)] p-1 rounded-lg border border-[var(--glass-border)] cursor-pointer w-[140px] h-[36px] transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                  onClick={() => mounted && changeLanguage(currentLang === 'es' ? 'en' : 'es')}
                >
                  {mounted && (
                    <>
                      <motion.div
                        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-pink-400 to-pink-500 rounded-md shadow-sm"
                        initial={false}
                        animate={{
                          left: currentLang === 'es' ? '4px' : 'calc(50% + 0px)',
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                      
                      <span className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ${currentLang === 'es' ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                        🇪🇸 ES
                      </span>
                      <span className={`relative z-10 w-1/2 text-center text-xs font-bold transition-colors duration-300 ${currentLang === 'en' ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                        🇺🇸 EN
                      </span>
                    </>
                  )}
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-[var(--text-main)] py-4 border-b border-[var(--glass-border)] last:border-0 active:text-[var(--color-brand-primary)] transition-colors"
                  onClick={(e) => handleScrollTo(e, link.href)}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-[var(--glass-border)]">
                 <button className="flex-1 py-4 flex items-center justify-center gap-2 bg-[var(--text-muted)]/10 hover:bg-pink-100 dark:hover:bg-pink-500/10 rounded-lg text-[var(--text-main)] font-bold text-sm active:bg-[var(--text-muted)]/20 transition-colors">
                    <Search className="w-5 h-5" /> Buscar
                 </button>
                 
                 <button 
                    onClick={() => {
                        setMobileOpen(false);
                        toggleCart();
                    }}
                    className="flex-1 py-4 flex items-center justify-center gap-2 bg-[var(--color-brand-primary)] hover:bg-pink-600 text-white rounded-lg font-bold text-sm active:scale-95 transition-transform relative shadow-md shadow-pink-500/20"
                 >
                    <ShoppingCart className="w-5 h-5" /> Carrito 
                    {cartCount > 0 && <span className="ml-1 opacity-90">({cartCount})</span>}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}