"use client";
import { XCircle, CheckCircle2, AlertOctagon } from "lucide-react";

export default function ResearchChallenges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      
      {/* EL DOLOR (The Glitch) */}
      <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-20">
            <AlertOctagon className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <XCircle className="w-4 h-4" /> Market Failures
        </h3>
        <ul className="space-y-3">
            <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
                <span className="text-red-500 font-mono">01.</span>
                <span>Inconsistent purity leads to skewed research data and wasted resources.</span>
            </li>
            <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
                <span className="text-red-500 font-mono">02.</span>
                <span>Heavy metal contamination common in low-tier suppliers.</span>
            </li>
            <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
                <span className="text-red-500 font-mono">03.</span>
                <span>Degraded peptides due to improper thermal logistics.</span>
            </li>
        </ul>
      </div>

      {/* LA SOLUCIÓN (The Patch) */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </div>
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> The Transcendent Standard
        </h3>
        <ul className="space-y-3">
            <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
                <span className="text-emerald-500 font-mono">01.</span>
                <span className="text-[var(--text-main)]">HPLC Verified &gt;99% purity guaranteed for every batch.</span>
            </li>
            <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
                <span className="text-emerald-500 font-mono">02.</span>
                <span className="text-[var(--text-main)]">Solid-phase synthesis eliminates toxic byproducts.</span>
            </li>
            <li className="flex items-start gap-3 text-xs text-[var(--text-muted)]">
                <span className="text-emerald-500 font-mono">03.</span>
                <span className="text-[var(--text-main)]">Lyophilized & vacuum-sealed for maximum stability.</span>
            </li>
        </ul>
      </div>

    </div>
  );
}