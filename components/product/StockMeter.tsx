"use client";

import { motion } from "framer-motion";

export default function StockMeter({ stock, maxStock = 100 }: { stock: number, maxStock?: number }) {
  const isOOS = stock <= 0;
  const percentage = Math.min(100, Math.max(0, (stock / maxStock) * 100));
  
  // Dividimos la barra en 20 segmentos
  const segments = Array.from({ length: 20 });
  const activeSegments = isOOS ? 0 : Math.ceil((percentage / 100) * 20);
  
  // Color lógico: Si está bajo es rojo, si no es tu color de marca
  const colorClass = isOOS || percentage < 20 ? "bg-red-500" : "bg-[var(--color-brand-primary)]";

  return (
    <div className="w-full space-y-2 mb-6 font-mono">
      <div className="flex justify-between items-end border-b border-[var(--glass-border)] pb-1 mb-2">
        <span className="text-[9px] uppercase text-[var(--text-muted)] tracking-widest">
            Batch_Availability_Level
        </span>
        <span className={`text-xs font-bold ${isOOS || percentage < 20 ? "text-red-500 animate-pulse" : "text-[var(--text-main)]"}`}>
            {isOOS ? "DEPLETED" : `${stock}`}
            <span className="text-[var(--text-muted)] text-[9px]">/UNIT</span>
        </span>
      </div>

      {/* Segmented Bar */}
      <div className="flex gap-[2px] h-2 w-full">
        {segments.map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < activeSegments ? 1 : 0.15 }}
                transition={{ delay: i * 0.02 }}
                className={`flex-1 rounded-[1px] ${i < activeSegments ? colorClass : isOOS ? "bg-red-500/10" : "bg-[var(--text-muted)]"}`}
            />
        ))}
      </div>
      
      {isOOS ? (
          <div className="flex items-center gap-2 mt-2 bg-red-500/5 p-2 rounded border border-red-500/10">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest">
                  Status: Subject Currently Unavailable
              </p>
          </div>
      ) : percentage < 20 && (
          <div className="flex items-center gap-2 mt-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
              <p className="text-[9px] text-red-400 font-bold uppercase tracking-widest">
                  Critical Low Stock Warning
              </p>
          </div>
      )}
    </div>
  );
}