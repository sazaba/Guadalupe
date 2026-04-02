"use client";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Ajusta la ruta si lo guardaste en otro lado
import { FlaskConical, Atom, ArrowRight, ScanFace, AlertCircle } from "lucide-react";
import Image from "next/image";
// Asegúrate de que la ruta a tu logo sea correcta según tu estructura
import logo from "../../assets/logo.webp"; 

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Limpiar errores previos
    
    // Llamamos a la función real del AuthContext
    // Si el login es exitoso, el Context se encarga de redirigir a /admin
    const success = await login(email, password);

    if (!success) {
      setError("Acceso denegado. Credenciales inválidas.");
      setLoading(false);
      setPassword(""); // Limpiar contraseña por seguridad
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--bg-page)] relative flex items-center justify-center overflow-hidden">
      
      {/* Fondo Animado */}
      <div className="absolute inset-0 opacity-[0.03] bg-[size:60px_60px] bg-[linear-gradient(to_right,var(--text-main)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-main)_1px,transparent_1px)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-brand-primary)] opacity-10 blur-[120px] rounded-full pointer-events-none" />

      {/* Tarjeta de Login */}
      <div className="relative z-10 w-full max-w-md p-8">
        
        {/* Cabecera */}
        <div className="text-center mb-10 space-y-2">
          {/* Logo animado */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--bg-page)] border border-[var(--glass-border)] shadow-xl mb-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--color-brand-primary)]/10 group-hover:bg-[var(--color-brand-primary)]/20 transition-colors" />
            <FlaskConical className="w-8 h-8 text-[var(--color-brand-primary)] animate-pulse" />
          </div>
          
          <h1 className="text-3xl font-display font-black text-[var(--text-main)] tracking-tight">
            SYSTEM ACCESS
          </h1>
          <p className="text-[var(--text-muted)] text-sm uppercase tracking-widest">
            Transcendent Labs &bull; Internal Only
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--bg-page)]/40 backdrop-blur-xl border border-[var(--glass-border)] p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          
          {/* Mensaje de Error (solo si existe) */}
          {error && (
            <div className="absolute top-0 left-0 w-full bg-red-500/10 border-b border-red-500/20 p-3 flex items-center justify-center gap-2 animate-in slide-in-from-top-2 fade-in duration-300">
               <AlertCircle className="w-4 h-4 text-red-400" />
               <p className="text-xs font-bold text-red-400">{error}</p>
            </div>
          )}

          {/* Input: Email */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1">Identifier</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--color-brand-primary)] transition-colors">
                <ScanFace className="w-5 h-5" />
              </div>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@transcendent.com"
                className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl py-3 pl-12 pr-4 text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
              />
            </div>
          </div>

          {/* Input: Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1">Access Key</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[var(--text-muted)] group-focus-within:text-[var(--color-brand-primary)] transition-colors">
                <Atom className="w-5 h-5" />
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-xl py-3 pl-12 pr-4 text-[var(--text-main)] placeholder:text-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--color-brand-primary)] focus:ring-1 focus:ring-[var(--color-brand-primary)] transition-all"
              />
            </div>
          </div>

          {/* Botón Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full group relative overflow-hidden bg-[var(--text-main)] text-[var(--bg-page)] font-bold py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              {loading ? "Verifying Credentials..." : "Initiate Session"}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </div>
            <div className="absolute inset-0 bg-[var(--color-brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
          </button>

        </form>

        {/* Footer legal */}
        <p className="text-center text-[10px] text-[var(--text-muted)] mt-8 opacity-60">
          Unauthorized access attempts are logged and monitored. <br/>
          Secure Protocol v4.0.2
        </p>

      </div>
    </div>
  );
}