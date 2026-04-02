"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Al cargar, verificar si hay sesión (simple check visual)
  useEffect(() => {
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!res.ok) return false;

      const data = await res.json();
      
      // Guardamos datos básicos del usuario para la UI
      setUser(data.user);
      localStorage.setItem("user_data", JSON.stringify(data.user));
      
      router.push("/admin"); // Redirigir al panel
      router.refresh();      // Refrescar para que el Middleware detecte la cookie
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

const logout = async () => {
    try {
      // 1. Avisar al Backend para matar la cookie
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }

    // 2. Limpieza Visual (Frontend)
    setUser(null);
    localStorage.removeItem("user_data");
    
    // 3. Redirigir
    router.push("/");
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}