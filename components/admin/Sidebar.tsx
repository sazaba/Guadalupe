"use client";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";
import { 
  Crown, 
  Sparkles, 
  ShoppingBag, 
  LogOut, 
  X,
  Heart 
} from "lucide-react";
import clsx from "clsx";
import { motion } from "framer-motion";

// Ajusta la ruta a tu logo si es necesario
import logo from "../../app/assets/logo.webp"; 

const menuItems = [
  { name: "Panel", href: "/admin", icon: Crown },
  { name: "Productos", href: "/admin/products", icon: Sparkles },
  { name: "Pedidos", href: "/admin/orders", icon: ShoppingBag },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { 
    isSidebarOpen, 
    closeSidebar 
  } = useAdmin();

  // En Desktop siempre será visible (translate-x-0). En Mobile depende del estado.
  const mobileClasses = isSidebarOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <>
      {/* Mobile Backdrop - Glassmorphism suave con tono marrón/rosado oscuro */}
      <div 
        className={clsx(
          "fixed inset-0 bg-[#33182B]/20 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* SIDEBAR - Fondo premium con glassmorphism */}
      <aside 
        className={clsx(
          "fixed top-0 left-0 h-screen bg-[#FFFDFE]/85 backdrop-blur-xl border-r border-[#FAD1E6]/60 z-50 transition-transform duration-300 ease-in-out flex flex-col w-64 shadow-[4px_0_24px_rgba(250,209,230,0.15)]",
          `lg:translate-x-0 ${mobileClasses}`
        )}
      >
        
        {/* 1. Header con Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#FAD1E6]/40 relative">
          
          <Link href="/" className="flex items-center gap-3 overflow-hidden group">
             <motion.div 
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="shrink-0 w-10 h-10 relative flex items-center justify-center bg-[#FAD1E6]/30 rounded-full p-1"
             >
                <Image 
                  src={logo} 
                  alt="Guadalupe Boutique Logo" 
                  fill 
                  className="object-contain drop-shadow-[0_2px_8px_rgba(232,93,158,0.2)]" 
                />
             </motion.div>
             
             <div>
                <h2 className="font-display font-bold text-sm leading-none tracking-tight text-[#33182B] group-hover:text-[#E85D9E] transition-colors">
                  GUADALUPE <br/> <span className="text-[#7B5C73] font-medium text-xs">BOUTIQUE</span>
                </h2>
             </div>
          </Link>

          <button onClick={closeSidebar} className="lg:hidden text-[#7B5C73] hover:text-[#E85D9E] transition-colors bg-[#FAD1E6]/20 p-1.5 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Navegación */}
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          
          {/* Botón explícito para ir a Home */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              href="/"
              className="group flex items-center justify-between px-4 py-3 rounded-3xl transition-all duration-300 mb-6 bg-gradient-to-r from-[#FAD1E6]/30 to-transparent border border-[#FAD1E6]/50 hover:border-[#E85D9E]/30 hover:shadow-[0_4px_12px_rgba(250,209,230,0.4)]"
              title="Ir a la Tienda"
            >
               <div className="flex items-center gap-3">
                  <Heart className="shrink-0 text-[#E85D9E] fill-[#E85D9E]/20 group-hover:fill-[#E85D9E]/40 transition-all w-5 h-5" />
                  <span className="text-sm font-bold text-[#33182B]">
                     Ir a la Tienda
                  </span>
               </div>
            </Link>
          </motion.div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FAD1E6] to-transparent my-4 opacity-60" />

          <p className="px-3 text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest mb-3 opacity-70">Menú Admin</p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => closeSidebar()}
                className="relative group flex items-center justify-between px-4 py-3 rounded-3xl outline-none"
              >
                {/* Animación de fondo flotante para el tab activo */}
                {isActive && (
                  <motion.div
                    layoutId="activeAdminTab"
                    className="absolute inset-0 bg-[#FAD1E6]/40 border border-[#FAD1E6] rounded-3xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Hover effect para inactivos */}
                {!isActive && (
                  <div className="absolute inset-0 bg-[#FAD1E6]/0 group-hover:bg-[#FAD1E6]/20 rounded-3xl transition-colors duration-300" />
                )}

                <div className="relative z-10 flex items-center gap-3">
                  <Icon 
                    className={clsx(
                      "shrink-0 w-5 h-5 transition-all duration-300",
                      isActive 
                        ? "text-[#E85D9E] drop-shadow-[0_0_8px_rgba(232,93,158,0.4)]" 
                        : "text-[#7B5C73] group-hover:text-[#E85D9E]"
                    )} 
                  />
                  <span 
                    className={clsx(
                      "text-sm transition-colors duration-300",
                      isActive 
                        ? "font-bold text-[#33182B]" 
                        : "font-medium text-[#7B5C73] group-hover:text-[#33182B]"
                    )}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* 3. Footer (User & Logout) */}
        <div className="p-4 border-t border-[#FAD1E6]/40 bg-gradient-to-t from-[#FAD1E6]/10 to-transparent">
          <div className="flex items-center gap-3 mb-4 px-2">
              <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-tr from-[#E85D9E] to-[#FFA8C5] p-[2px] shadow-[0_2px_8px_rgba(232,93,158,0.3)]">
                  <div className="w-full h-full rounded-full bg-[#FFFDFE] flex items-center justify-center text-[10px] font-bold text-[#E85D9E]">
                      GB
                  </div>
              </div>
              <div className="overflow-hidden">
                  <p className="text-sm font-bold text-[#33182B] truncate">{user?.name || "Admin Boutique"}</p>
              </div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-full border border-[#FAD1E6] text-[#7B5C73] hover:bg-[#FAD1E6]/30 hover:text-[#E85D9E] hover:border-[#E85D9E]/40 transition-colors text-xs font-bold uppercase tracking-widest px-4 py-2.5 group"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Cerrar Sesión</span>
          </motion.button>
        </div>
      </aside>
    </>
  );
}