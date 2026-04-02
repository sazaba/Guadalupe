"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Pipette, Syringe, Info, PlayCircle, ExternalLink } from "lucide-react";

export default function PeptideCalculator() {
  const [vialQty, setVialQty] = useState<number>(10);
  const [waterVol, setWaterVol] = useState<number>(2); 
  const [dose, setDose] = useState<number>(500); 
  
  const [resultTick, setResultTick] = useState<number>(0);
  const [resultVol, setResultVol] = useState<number>(0); 
  
  // --- LIMITES DUROS (Hard Limits) ---
  const MAX_VIAL_MG = 50;
  const MAX_WATER_ML = 10;
  const MAX_DOSE_MCG = 5000;

  // Constantes de dimensiones visuales
  const SYRINGE_TOP = 20;
  const SYRINGE_HEIGHT = 300;
  const PIXELS_PER_TICK = 3; 

  useEffect(() => {
    const safeWaterVol = waterVol === 0 ? 0.1 : waterVol;
    const safeVialQty = vialQty === 0 ? 1 : vialQty;

    const conc = safeVialQty / safeWaterVol;
    const doseInMg = dose / 1000;
    
    let volumeToInject = 0;
    if (conc > 0) {
        volumeToInject = doseInMg / conc;
    }

    setResultVol(volumeToInject);
    
    const ticks = Math.min(volumeToInject * 100, 100);
    setResultTick(ticks);
  }, [vialQty, waterVol, dose]);

  // --- HANDLERS CON VALIDACIÓN ---
  const handleVialChange = (val: number) => {
    if (val > MAX_VIAL_MG) val = MAX_VIAL_MG;
    if (val < 0) val = 0;
    setVialQty(val);
  };

  const handleWaterChange = (val: number) => {
    if (val > MAX_WATER_ML) val = MAX_WATER_ML;
    if (val < 0) val = 0;
    setWaterVol(val);
  };

  const handleDoseChange = (val: number) => {
    if (val > MAX_DOSE_MCG) val = MAX_DOSE_MCG;
    if (val < 0) val = 0;
    setDose(val);
  };

  return (
    <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto z-10" id="calculator">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--glass-border)] pb-6">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--bg-page)] border border-[var(--glass-border)] rounded-lg">
               <Calculator className="w-6 h-6 text-[var(--color-brand-primary)]" />
            </div>
            <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[var(--text-main)]">
                Reconstitution <span className="text-[var(--text-muted)]">Protocol</span>
            </h2>
            <p className="text-xs font-mono text-[var(--color-brand-secondary)] mt-1 uppercase tracking-widest">
                // Precision_Dosing_Engine_v2.1
            </p>
            </div>
        </div>

        <a 
            href="https://www.youtube.com/watch?v=KARFHZprtbQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-3 rounded-full border border-[var(--glass-border)] bg-[var(--bg-page)]/50 hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer"
        >
            <div className="relative">
                <PlayCircle className="w-5 h-5 text-[var(--text-muted)] group-hover:text-red-500 transition-colors" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-main)]">
                    Visual Guide
                </span>
                <span className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1">
                    Watch Protocol <ExternalLink className="w-3 h-3 opacity-50" />
                </span>
            </div>
        </a>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* INPUTS */}
        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
          <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input 1: Vial Quantity */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
                <span className="flex items-center gap-2"><Pipette className="w-4 h-4 text-[var(--color-brand-primary)]" /> Peptide Vial Quantity</span>
                <span className="text-[var(--color-brand-secondary)] font-mono text-xs">Max: {MAX_VIAL_MG}mg</span>
              </label>
              <div className="relative flex items-center">
                 <input 
                    type="number" 
                    inputMode="decimal"
                    value={vialQty} 
                    onChange={(e) => handleVialChange(Number(e.target.value))} 
                    /* ✅ FIX CSS: Oculta flechas y añade pr-14 para que el número no pise el texto */
                    className="w-full bg-[var(--bg-page)]/50 border border-[var(--glass-border)] text-[var(--text-main)] rounded-lg py-4 pl-4 pr-14 focus:border-[var(--color-brand-primary)] focus:outline-none font-mono text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                 />
                 {/* ✅ FIX CSS: pointer-events-none para no estorbar clics */}
                 <span className="absolute right-4 text-[var(--text-muted)] font-mono text-sm pointer-events-none">mg</span>
              </div>
              <input 
                type="range" min="1" max="30" step="1" 
                value={Math.min(vialQty, 30)} 
                onChange={(e) => handleVialChange(Number(e.target.value))} 
                className="w-full accent-[var(--color-brand-primary)] h-1 bg-[var(--glass-border)] rounded-lg cursor-pointer touch-none"
              />
            </div>

            {/* Input 2: Water Volume */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
                <span className="flex items-center gap-2"> Bacteriostatic Water</span>
                <span className="text-[var(--color-brand-secondary)] font-mono text-xs">Max: {MAX_WATER_ML}ml</span>
              </label>
              <div className="relative flex items-center">
                 <input 
                    type="number" 
                    inputMode="decimal"
                    value={waterVol} 
                    onChange={(e) => handleWaterChange(Number(e.target.value))} 
                    className="w-full bg-[var(--bg-page)]/50 border border-[var(--glass-border)] text-[var(--text-main)] rounded-lg py-4 pl-4 pr-14 focus:border-[var(--color-brand-secondary)] focus:outline-none font-mono text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                 />
                 <span className="absolute right-4 text-[var(--text-muted)] font-mono text-sm pointer-events-none">ml</span>
              </div>
              <input 
                type="range" min="1" max="10" step="0.5" 
                value={waterVol} 
                onChange={(e) => handleWaterChange(Number(e.target.value))} 
                className="w-full accent-[var(--color-brand-secondary)] h-1 bg-[var(--glass-border)] rounded-lg cursor-pointer touch-none"
              />
            </div>

            {/* Input 3: Dose Goal */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-bold text-[var(--text-main)] uppercase tracking-wide">
                <span className="flex items-center gap-2"><Syringe className="w-4 h-4 text-rose-500" /> Concentration Goal</span>
                <span className="text-rose-500 font-mono text-xs">Max: {MAX_DOSE_MCG}mcg</span>
              </label>
              <div className="relative flex items-center">
                 <input 
                    type="number" 
                    inputMode="decimal"
                    value={dose} 
                    onChange={(e) => handleDoseChange(Number(e.target.value))} 
                    className="w-full bg-[var(--bg-page)]/50 border border-[var(--glass-border)] text-[var(--text-main)] rounded-lg py-4 pl-4 pr-16 focus:border-rose-500 focus:outline-none font-mono text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                 />
                 <span className="absolute right-4 text-[var(--text-muted)] font-mono text-sm pointer-events-none">mcg</span>
              </div>
              <input 
                type="range" min="50" max="2000" step="50" 
                value={Math.min(dose, 2000)} 
                onChange={(e) => handleDoseChange(Number(e.target.value))} 
                className="w-full accent-rose-500 h-1 bg-[var(--glass-border)] rounded-lg cursor-pointer touch-none"
              />
            </div>
          </form>
        </div>

        {/* VISUALIZACIÓN */}
        <div className="flex flex-col items-center justify-center relative">
           
           <div className="w-full mb-8 glass-panel border border-[var(--color-brand-primary)]/30 rounded-xl p-6 relative overflow-hidden">
             <div className="relative z-10 flex justify-between items-end">
                 <div>
                   <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">Draw to Tick Mark</p>
                   <div className="text-5xl font-display font-bold text-[var(--text-main)]">
                     {resultTick.toFixed(1)} <span className="text-lg text-[var(--color-brand-primary)]">IU</span>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-1">Volume Equivalent</p>
                   <p className="text-2xl font-mono text-[var(--text-main)]">{resultVol.toFixed(3)} <span className="text-sm">ml</span></p>
                 </div>
             </div>
           </div>

           {/* --- SVG JERINGA --- */}
           <div className="relative w-full max-w-[200px] h-[400px] transform-gpu">
              <svg viewBox="0 0 100 400" className="w-full h-full drop-shadow-2xl">
                 
                 <defs>
                   <clipPath id="syringe-body-clip">
                      <rect x="30" y={SYRINGE_TOP} width="40" height={SYRINGE_HEIGHT} rx="2" />
                   </clipPath>
                 </defs>

                 <rect x="30" y={SYRINGE_TOP} width="40" height={SYRINGE_HEIGHT} rx="2" fill="var(--bg-page)" stroke="var(--text-muted)" strokeWidth="2" fillOpacity="0.5" />
                 
                 <motion.rect 
                   clipPath="url(#syringe-body-clip)" 
                   x="30" 
                   y={SYRINGE_TOP} 
                   width="40" 
                   fill="var(--color-brand-primary)" 
                   opacity="0.6"
                   initial={{ height: 0 }}
                   animate={{ height: resultTick * PIXELS_PER_TICK }}
                   transition={{ type: "spring", stiffness: 40, damping: 20 }}
                   style={{ willChange: "height" }}
                 />

                 {[...Array(11)].map((_, i) => (
                   <g key={i} transform={`translate(0, ${SYRINGE_TOP + (i * 30)})`}>
                      <line x1="30" y1="0" x2="45" y2="0" stroke="var(--text-muted)" strokeWidth="1" />
                      <text x="25" y="4" fontSize="10" fill="var(--text-muted)" textAnchor="end" fontFamily="monospace">{i * 10}</text>
                   </g>
                 ))}

                 <motion.g 
                   initial={{ y: SYRINGE_TOP }}
                   animate={{ y: SYRINGE_TOP + (resultTick * PIXELS_PER_TICK) }}
                   transition={{ type: "spring", stiffness: 40, damping: 20 }}
                   style={{ willChange: "transform" }}
                 >
                   <rect x="30" y="0" width="40" height="10" fill="#333" />
                   <rect x="45" y="10" width="10" height="300" fill="#ccc" opacity="0.5" />
                   <circle cx="50" cy="320" r="15" fill="var(--bg-page)" stroke="#ccc" strokeWidth="2" />
                 </motion.g>

                 <line x1="50" y1={SYRINGE_TOP} x2="50" y2="0" stroke="var(--text-muted)" strokeWidth="2" />
              </svg>
              
              <motion.div 
                 className="absolute left-[140px]"
                 initial={{ top: "5%" }}
                 animate={{ top: `${5 + (resultTick * 0.75)}%` }} 
                 style={{ willChange: "top" }}
              >
                 <div className="bg-[var(--color-brand-primary)] text-[var(--bg-page)] text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                   {resultTick.toFixed(0)} IU
                 </div>
              </motion.div>
           </div>
           
           <div className="mt-4 flex items-start gap-2 max-w-xs text-center">
             <Info className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" />
             <p className="text-[10px] text-[var(--text-muted)]">
                *Visualization based on a standard 1ml U-100 Insulin Syringe.
             </p>
           </div>

        </div>
      </div>
    </section>
  );
}