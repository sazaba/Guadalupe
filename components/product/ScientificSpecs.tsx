"use client";
import { motion } from "framer-motion";
import { Dna, Fingerprint, Activity, Zap } from "lucide-react";

export default function ScientificSpecs({ purity, category }: { purity: string, category: string }) {
  const specs = [
    { label: "Molecular Fidelity", value: purity || "99.9%", icon: Fingerprint, color: "text-[var(--color-brand-primary)]" },
    { label: "Research Class", value: category, icon: Dna, color: "text-purple-400" },
    { label: "Bio-Activity", value: "Optimized", icon: Activity, color: "text-emerald-400" },
    { label: "Synthesis Method", value: "Solid Phase", icon: Zap, color: "text-amber-400" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      {specs.map((spec, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="relative overflow-hidden bg-[var(--bg-page)] border border-[var(--glass-border)] p-4 rounded-xl group hover:border-[var(--text-main)] transition-colors"
        >
          {/* Animated Background Line */}
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[var(--text-muted)] to-transparent opacity-20" />
          
          <div className="flex items-start justify-between mb-2">
            <spec.icon className={`w-5 h-5 ${spec.color} group-hover:scale-110 transition-transform`} />
            <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)]">0{i + 1}</span>
          </div>
          <h4 className="text-[10px] uppercase text-[var(--text-muted)] tracking-wider mb-1">{spec.label}</h4>
          {/* CAMBIO: Quitado 'truncate', agregado 'break-words text-left' para que baje de línea si es largo */}
          <p className="text-sm font-bold font-mono text-[var(--text-main)] break-words text-left leading-tight">
            {spec.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}