"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Ajusta la ruta si lo guardaste en otro lado
import { Crown, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import Image from "next/image";
// Ruta corregida a assets según tu indicación
import logo from "../../assets/logo.webp"; 
import { AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    
    // Llamamos a la función real del AuthContext (Mantenemos funcionalidad backend)
    const success = await login(email, password);

    if (!success) {
      setError("Acceso denegado. Credenciales incorrectas.");
      setLoading(false);
      setPassword(""); 
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FFFDFE] relative flex items-center justify-center overflow-hidden selection:bg-pink-100 selection:text-pink-900">
      
      {/* Fondo Decorativo Suave (Cambiamos el grid técnico por puntos sutiles) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#E85D9E_1px,transparent_1px)] [background-size:30px_30px]" />
      
      {/* Glow Palo de Rosa suave de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FAD1E6] opacity-20 blur-[130px] rounded-full pointer-events-none" />

      {/* Tarjeta de Login Refactorizada */}
      <div className="relative z-10 w-full max-w-md p-6 md:p-8">
        
        {/* Cabecera Boutique */}
        <div className="text-center mb-10 flex flex-col items-center">
          {/* Contenedor del Logo Premium */}
          <div className="relative group mb-8">
            {/* Resplandor detrás del logo */}
            <div className="absolute inset-0 bg-[#FAD1E6] blur-[40px] opacity-60 group-hover:opacity-80 transition-opacity duration-700 rounded-full" />
            
            <div className="relative bg-white border border-[#FAD1E6]/60 p-5 rounded-[2.5rem] shadow-sm flex items-center justify-center overflow-hidden w-28 h-28 md:w-32 md:h-32">
                <Image 
                    src={logo} 
                    alt="Logo Guadalupe Boutique" 
                    fill 
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    priority 
                />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-[#33182B] tracking-tight leading-none mb-2">
            Panel <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D9E] to-[#FFA8C5]">Interno</span>
          </h1>
          <p className="text-[#7B5C73] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 bg-[#FAD1E6]/30 px-3 py-1 rounded-full border border-[#FAD1E6]/50">
             <Crown className="w-3.5 h-3.5 text-[#FFA8C5]" /> Solo Personal Autorizado
          </p>
        </div>

        {/* Formulario Estilo Glassmorphism Suave */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 backdrop-blur-xl border border-[#FAD1E6]/50 p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(232,93,158,0.1)] relative overflow-hidden">
          
          {/* Mensaje de Error (Refactorizado con AlertHeart) */}
          <AnimatePresence>
            {error && (
              <div className="absolute top-0 left-0 w-full bg-red-50 border-b border-red-200 p-3 flex items-center justify-center gap-2 animate-in slide-in-from-top-2 fade-in duration-300">
                 <AlertCircle className="w-4.5 h-4.5 text-red-500" />
                 <p className="text-xs font-bold text-red-600 tracking-tight">{error}</p>
              </div>
            )}
          </AnimatePresence>

          {/* Input: Email (Cambiamos Identifier por Correo) */}
          <div className={`space-y-2 ${error ? "pt-5" : ""}`}>
            <label className="text-xs font-bold text-[#7B5C73] uppercase tracking-wider ml-1">Correo Electrónico</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-[#7B5C73]/60 group-focus-within:text-[#E85D9E] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@guadalupe.com"
                className="w-full bg-white border border-[#FAD1E6] rounded-xl py-3.5 pl-12 pr-4 text-[#33182B] placeholder:text-[#7B5C73]/40 focus:outline-none focus:border-[#E85D9E] focus:ring-2 focus:ring-[#FAD1E6] transition-all shadow-sm font-medium text-sm"
              />
            </div>
          </div>

          {/* Input: Password (Cambiamos Access Key por Contraseña) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#7B5C73] uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none text-[#7B5C73]/60 group-focus-within:text-[#E85D9E] transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-white border border-[#FAD1E6] rounded-xl py-3.5 pl-12 pr-4 text-[#33182B] placeholder:text-[#7B5C73]/40 focus:outline-none focus:border-[#E85D9E] focus:ring-2 focus:ring-[#FAD1E6] transition-all shadow-sm font-medium text-sm"
              />
            </div>
          </div>

          {/* Botón Submit (Refactorizado con color Palo de Rosa) */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full group relative overflow-hidden bg-[#E85D9E] text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed shadow-md shadow-[#E85D9E]/20 hover:shadow-lg hover:shadow-[#E85D9E]/30"
          >
            {/* Brillo suave al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700 pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-center gap-2 text-sm tracking-wide uppercase">
              {loading ? "Verificando..." : "Iniciar Sesión Mágica"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />}
            </div>
          </button>

        </form>

        {/* Footer Boutique */}
        <p className="text-center text-[10px] text-[#7B5C73] mt-8 opacity-70 font-medium tracking-wide">
          Acceso exclusivo para el personal de Guadalupe Boutique Infantil. <br/>
          CC El Progreso &bull; Dosquebradas, Risaralda.
        </p>

      </div>
    </div>
  );
}