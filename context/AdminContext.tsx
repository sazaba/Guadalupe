"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isSidebarOpen: boolean;      // Para Mobile (abierto/cerrado)
  isSidebarCollapsed: boolean; // Para Desktop (mini/full)
  toggleSidebar: () => void;   // Toggle Mobile
  toggleCollapse: () => void;  // Toggle Desktop
  closeSidebar: () => void;    // Force close (al navegar en mobile)
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Cerrar sidebar automáticamente si la pantalla crece (resize)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setSidebarCollapsed(!isSidebarCollapsed);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <AdminContext.Provider value={{ 
      isSidebarOpen, 
      isSidebarCollapsed, 
      toggleSidebar, 
      toggleCollapse,
      closeSidebar
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}