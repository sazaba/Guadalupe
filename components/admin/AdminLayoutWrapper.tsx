"use client";
import { useAdmin } from "../../context/AdminContext";
import AdminSidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import clsx from "clsx";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useAdmin();

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col lg:flex-row">
      
      {/* Sidebar (Fixed) */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div 
        className={clsx(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          // En desktop, el margen izquierdo cambia según si el sidebar está colapsado o no
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
         {/* Mobile Header (Solo visible en pantallas chicas) */}
         <MobileHeader />

         {/* Contenido Real */}
         <main className="flex-1 relative p-6 md:p-8 lg:p-12">
             {/* Fondo Grid Decorativo */}
             <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,var(--text-main)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-main)_1px,transparent_1px)]" />
             
             <div className="relative z-10 max-w-7xl mx-auto">
                {children}
             </div>
         </main>
      </div>
    </div>
  );
}