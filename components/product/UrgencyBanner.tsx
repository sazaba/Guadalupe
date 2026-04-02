"use client";

import { useState, useEffect } from "react";
import { Timer, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function UrgencyBanner() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(17, 0, 0, 0); 
      if (now > cutoff) cutoff.setDate(cutoff.getDate() + 1);
      const diff = cutoff.getTime() - now.getTime();
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, []);

  return (
    // CAMBIO: Fondo glassmorphism con borde de acento, no negro sólido
    <div className="w-full bg-[var(--color-brand-primary)]/5 backdrop-blur-md border-b border-[var(--color-brand-primary)]/20 py-2.5 flex justify-center relative overflow-hidden">
      <div className="flex items-center gap-3 md:gap-6 z-10">
         <div className="flex items-center gap-2 text-[var(--color-brand-primary)] animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Priority Dispatch</span>
         </div>
         
         <div className="h-3 w-[1px] bg-[var(--text-muted)] opacity-30" />

         <div className="flex items-center gap-2">
            <span className="text-[10px] md:text-xs text-[var(--text-muted)] uppercase tracking-wide hidden sm:inline-block">Cutoff in:</span>
            <span className="font-mono text-xs md:text-sm font-bold text-[var(--text-main)] tabular-nums">
               {timeLeft}
            </span>
         </div>
      </div>
    </div>
  );
}