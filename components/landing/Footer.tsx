"use client";
import Image from "next/image";
import Link from "next/link"; 
import { 
  Instagram, 
  MapPin, 
  Phone,
  Mail,
  Heart,
  Lock,           
  LayoutDashboard,
  LogOut          
} from "lucide-react";

import { useAuth } from "../../context/AuthContext"; 
import logo from "../../app/assets/logo.webp";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated, logout } = useAuth(); 

  return (
    <footer className="relative bg-[#FFFDFE] border-t border-[#FAD1E6]/50 pt-20 pb-10 overflow-hidden z-10">
      
      {/* Grid de fondo suave (Corazones/Puntos) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[size:30px_30px] bg-[radial-gradient(#E85D9E_1px,transparent_1px)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-16">
           
             {/* --- BLOQUE DE MARCA BOUTIQUE --- */}
            <div className="flex-shrink-0 w-full lg:w-auto flex flex-col items-start">
                
                <div className="relative group mb-6">
                  {/* Resplandor suave detrás del logo */}
                  <div className="absolute inset-0 bg-[#FAD1E6] blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity duration-700 rounded-full" />
                  
                  <div className="relative bg-white/80 backdrop-blur-xl border border-[#FAD1E6]/50 p-6 rounded-[2rem] shadow-sm flex items-center justify-center overflow-hidden w-24 h-24 md:w-32 md:h-32">
                      <Image src={logo} alt="Guadalupe Logo" fill className="object-contain p-2" />
                  </div>
                </div>

                <div>
                  <h2 className="font-display font-bold text-3xl tracking-tight text-[#33182B] leading-none mb-1">
                    GUADALUPE
                  </h2>
                  <h2 className="font-sans font-bold text-xs tracking-[0.2em] uppercase text-[#E85D9E] leading-none mb-4">
                    Boutique Infantil
                  </h2>
                  <p className="text-sm text-[#7B5C73] max-w-xs leading-relaxed font-medium">
                      Moda, vestidos y accesorios diseñados con amor para las princesas de la casa.
                  </p>
                </div>
            </div>

            {/* --- ENLACES BOUTIQUE --- */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 w-full pt-4">
                
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#33182B] border-b border-[#FAD1E6] pb-2 w-fit flex items-center gap-2">
                      <Heart className="w-3 h-3 text-[#E85D9E]" /> Tienda
                    </h4>
                    <a href="#catalog" className="text-sm text-[#7B5C73] hover:text-[#E85D9E] transition-colors font-medium">Nueva Colección</a>
                    <a href="#gallery" className="text-sm text-[#7B5C73] hover:text-[#E85D9E] transition-colors font-medium">Galería Mágica</a>
                    <a href="#sizes" className="text-sm text-[#7B5C73] hover:text-[#E85D9E] transition-colors font-medium">Guía de Tallas</a>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#33182B] border-b border-[#FAD1E6] pb-2 w-fit flex items-center gap-2">
                      <Phone className="w-3 h-3 text-[#E85D9E]" /> Contacto
                    </h4>
                    <a href="https://wa.link/sf1xkm" target="_blank" rel="noopener noreferrer" className="text-sm text-[#7B5C73] hover:text-[#E85D9E] transition-colors font-medium">WhatsApp</a>
                    <span className="text-sm text-[#7B5C73] font-medium flex items-center gap-2">
                       <MapPin className="w-4 h-4 opacity-50" /> CC El Progreso
                    </span>
                    <span className="text-sm text-[#7B5C73] font-medium opacity-80">Local 114, Dosquebradas</span>
                </div>
                 
                 <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#33182B] border-b border-[#FAD1E6] pb-2 w-fit flex items-center gap-2">
                      <Mail className="w-3 h-3 text-[#E85D9E]" /> Ayuda
                    </h4>
                    <a href="#faq" className="text-sm text-[#7B5C73] hover:text-[#E85D9E] transition-colors font-medium">Dudas Frecuentes</a>
                    <a href="#" className="text-sm text-[#7B5C73] hover:text-[#E85D9E] transition-colors font-medium">Envíos y Entregas</a>
                </div>
            </div>
        </div>

        {/* --- BARRA INFERIOR --- */}
        <div className="pt-8 border-t border-[#FAD1E6]/60 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-xs text-[#7B5C73] text-center md:text-left max-w-lg leading-relaxed font-medium">
              Vestimos princesas con exclusividad y amor. <br className="hidden md:block"/>
              Envíos nacionales a toda Colombia.
           </p>

           <div className="flex flex-col md:flex-row items-center gap-6">
               {/* Redes Sociales */}
               <div className="flex items-center gap-5">
                  <a href="https://instagram.com/exclusivosguadalupe" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#FAD1E6]/30 rounded-full text-[#E85D9E] hover:bg-[#E85D9E] hover:text-white transition-all duration-300">
                    <Instagram className="w-4.5 h-4.5" />
                  </a>
               </div>
               
               <div className="flex items-center gap-4">
                  <p className="text-xs text-[#7B5C73] font-bold">
                     © {currentYear} Guadalupe Boutique.
                  </p>

                  {/* --- ACCESO OCULTO AL PANEL DE ADMIN --- */}
                  {/* Se mantiene la lógica exacta pero con colores de la boutique */}
                  <div className="ml-4 pl-4 border-l border-[#FAD1E6] flex items-center gap-2">
                    {!isAuthenticated ? (
                       <Link 
                         href="/login" 
                         className="opacity-10 hover:opacity-100 transition-all duration-500 text-[#7B5C73] hover:text-[#E85D9E]"
                         title="Acceso Boutique"
                       >
                         <Lock className="w-3.5 h-3.5" />
                       </Link>
                    ) : (
                       <div className="flex items-center gap-3 animate-in fade-in duration-300">
                          <Link 
                            href="/admin" 
                            className="bg-[#E85D9E] text-white p-1.5 rounded-md hover:bg-[#D14D8B] transition-colors shadow-sm"
                            title="Panel de Administración"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5" />
                          </Link>
                          <button 
                            onClick={logout}
                            className="text-[#7B5C73] hover:text-red-500 transition-colors"
                            title="Cerrar Sesión"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    )}
                  </div>
               </div>
           </div>
        </div>

      </div>
    </footer>
  );
}