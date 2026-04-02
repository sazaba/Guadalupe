"use client";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, Zap } from "lucide-react";

export default function SecureBadges() {
  return (
    <div className="mt-6 pt-6 border-t border-[var(--glass-border)] relative overflow-hidden">
      
      {/* Título Técnico */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Payment Gateway
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Secure Connection
        </span>
      </div>

      {/* --- LA TARJETA UNIVERSAL SVG ANIMADA --- */}
      <div className="relative w-full h-24 bg-[var(--bg-page)]/50 border border-[var(--glass-border)] rounded-xl flex items-center justify-center overflow-hidden group">
        
        {/* Fondo de Ruido Sutil */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        
        {/* Efecto de Escaneo Láser Vertical */}
        <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-brand-primary)]/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <div className="flex items-center gap-4 relative z-10">
            {/* Icono de Tarjeta Abstracta SVG */}
            <svg className="w-12 h-12 text-[var(--text-main)]" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Contorno Tarjeta que se dibuja */}
                <motion.rect 
                    x="2" y="8" width="44" height="32" rx="4" 
                    stroke="currentColor" strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                {/* Chip que parpadea */}
                <motion.rect 
                    x="8" y="18" width="8" height="6" rx="1" 
                    stroke="var(--color-brand-primary)" strokeWidth="1.5"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Líneas de Datos (Magnetic Strip) */}
                <motion.path 
                    d="M34 29H40 M30 29H31 M22 29H26" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                {/* Símbolo Contactless Animado */}
                <motion.path 
                    d="M40 12C41.1046 12 42 12.8954 42 14" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                />
                <motion.path 
                    d="M37 12C38.1046 12 39 12.8954 39 14" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                />
            </svg>

            {/* Texto Central */}
            <div className="flex flex-col">
                <span className="text-sm font-bold font-display tracking-wide text-[var(--text-main)]">
                    ALL METHODS ACCEPTED
                </span>
                <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    Credit • Debit • Crypto • Apple Pay
                </span>
            </div>
        </div>
      </div>

      {/* --- PROTOCOLOS DE SEGURIDAD (FOOTER) --- */}
      <div className="flex justify-between items-center mt-4 px-1">
         <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <Lock className="w-3 h-3" />
            <span className="text-[9px] font-mono uppercase tracking-wider">256-Bit SSL Encrypted</span>
         </div>
         <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[9px] font-mono uppercase tracking-wider">Fraud Protection</span>
         </div>
      </div>

    </div>
  );
}