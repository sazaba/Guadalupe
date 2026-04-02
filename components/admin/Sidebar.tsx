"use client";
import Link from "next/link";
import Image from "next/image"; 
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useAdmin } from "../../context/AdminContext";
import { 
  LayoutDashboard, 
  FlaskConical, 
  ShoppingBag, 
  LogOut, 
  X,
  Home 
} from "lucide-react";
import clsx from "clsx";

// Ajusta la ruta a tu logo si es necesario
import logo from "../../app/assets/logo.webp"; 

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: FlaskConical },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
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
      {/* Mobile Backdrop (Fondo oscuro solo en celular) */}
      <div 
        className={clsx(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <aside 
        className={clsx(
          "fixed top-0 left-0 h-screen bg-[var(--bg-page)] border-r border-[var(--glass-border)] z-50 transition-transform duration-300 ease-in-out flex flex-col w-64",
          // En Desktop (lg) siempre se muestra. En Mobile usa la clase dinámica.
          `lg:translate-x-0 ${mobileClasses}`
        )}
      >
        
        {/* 1. Header con Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[var(--glass-border)] relative">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 overflow-hidden group">
             <div className="shrink-0 w-10 h-10 relative flex items-center justify-center">
                <Image 
                  src={logo} 
                  alt="Transcendent Logo" 
                  fill 
                  className="object-contain drop-shadow-[0_0_10px_rgba(var(--color-brand-primary-rgb),0.5)]" 
                />
             </div>
             
             <div>
                <h2 className="font-display font-bold text-sm leading-none tracking-tight text-[var(--text-main)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                  TRANSCENDENT <br/> <span className="text-[var(--text-muted)]">LABS</span>
                </h2>
             </div>
          </Link>

          {/* Botón de cerrar (Solo visible en Mobile) */}
          <button onClick={closeSidebar} className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text-main)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Navegación */}
        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-hide">
          
          {/* Botón explícito para ir a Home */}
          <Link 
            href="/"
            className="group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 mb-6 border border-transparent hover:border-[var(--glass-border)] bg-[var(--text-main)]/5"
            title="Go to Website"
          >
             <div className="flex items-center gap-3">
                <Home className="shrink-0 text-[var(--color-brand-primary)] w-4.5 h-4.5" />
                <span className="text-sm font-bold text-[var(--text-main)]">
                   Go to Website
                </span>
             </div>
          </Link>

          <div className="w-full h-[1px] bg-[var(--glass-border)] my-4 opacity-50" />

          <p className="px-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 opacity-50">Admin Menu</p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link 
                key={item.href} 
                href={item.href}
                onClick={() => closeSidebar()} // Cierra sidebar en mobile al navegar
                className={clsx(
                  "group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]" 
                    : "text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)]"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="shrink-0 w-4.5 h-4.5 transition-colors" />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* 3. Footer (User & Logout) */}
        <div className="p-4 border-t border-[var(--glass-border)] bg-[var(--bg-page)]/50">
          <div className="flex items-center gap-3 mb-4 px-2">
              <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-brand-primary)] to-cyan-400 p-[1px]">
                  <div className="w-full h-full rounded-full bg-[var(--bg-page)] flex items-center justify-center text-[10px] font-bold">
                      AD
                  </div>
              </div>
              <div className="overflow-hidden">
                  <p className="text-sm font-bold text-[var(--text-main)] truncate">{user?.name || "Admin"}</p>
              </div>
          </div>
          
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-900/30 text-red-400 hover:bg-red-900/10 hover:border-red-900/50 transition-all text-xs font-bold uppercase tracking-wider px-4 py-2"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}