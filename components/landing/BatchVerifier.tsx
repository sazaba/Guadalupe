"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle, Microscope, AlertCircle, ScanLine } from "lucide-react";

interface BatchData {
  product: string;
  purity: string;
  date: string;
  status: string;
}

const BATCH_DB: Record<string, BatchData> = {
  "A1092": { product: "TESAMORELIN", purity: "99.8%", date: "2024-01-15", status: "PASSED" },
  "B2024": { product: "BPC-157", purity: "99.9%", date: "2024-02-10", status: "PASSED" },
  "S5050": { product: "SEMAGLUTIDE", purity: "99.5%", date: "2024-03-01", status: "PASSED" },
  "T3001": { product: "TB-500", purity: "99.7%", date: "2024-03-10", status: "PASSED" },
};

export default function BatchVerifier() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<BatchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Límite de caracteres para el Lote
  const MAX_CHARS = 10;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setResult(null);
    setError(false);

    setTimeout(() => {
      const data = BATCH_DB[query.toUpperCase().trim()];
      if (data) {
        setResult(data);
      } else {
        setError(true);
      }
      setLoading(false);
    }, 1200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // 1. Cortar a MAX_CHARS
      // 2. Convertir a Mayúsculas automáticamente para mejor UX
      const val = e.target.value.slice(0, MAX_CHARS).toUpperCase();
      
      setQuery(val);
      if (error) setError(false);
  };

  return (
    <section className="py-24 px-4 border-y border-[var(--glass-border)] bg-[var(--bg-page)] transition-colors duration-500 relative overflow-hidden">
      
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-brand-primary)]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-brand-secondary)]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        <div className="mb-10">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-[var(--color-brand-primary)]/20">
              <Microscope className="w-3.5 h-3.5" />
              <span>Quality Assurance Database</span>
           </div>
           
           <h2 className="text-3xl md:text-5xl font-display font-bold text-[var(--text-main)] mb-4">
             Verify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">Research</span>
           </h2>
           <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
             Transparency is our core protocol. Enter the lot number found on your vial to view the HPLC purity report.
           </p>
        </div>

        {/* Search Box Container */}
        <div className={`relative max-w-md mx-auto transition-all duration-300 ${result || error ? 'mb-8' : 'mb-0'}`}>
           <form onSubmit={handleSearch} className="relative flex items-center group">
              <div className="absolute left-4 z-20 text-gray-400">
                 <ScanLine className="w-5 h-5 opacity-70" />
              </div>

              {/* INPUT BLINDADO CON LÍMITE Y COLORES */}
              <input 
                type="text" 
                placeholder="ENTER LOT # (E.G., A1092)"
                value={query}
                onChange={handleInputChange}
                maxLength={MAX_CHARS} // Límite nativo HTML
                className="
                  w-full relative z-10
                  py-4 pl-12 pr-14 
                  rounded-2xl 
                  border 
                  text-base font-mono font-bold uppercase
                  transition-all shadow-lg
                  focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-primary)]
                  
                  /* ESTILOS DE COLOR FORZADOS (!important) */
                  bg-white !text-slate-900 border-gray-200 placeholder:text-gray-400
                  dark:bg-slate-900/80 dark:!text-white dark:border-white/10 dark:placeholder:text-gray-500
                "
              />
              
              <button 
                type="submit"
                disabled={loading}
                className="absolute right-2 z-20 p-2.5 bg-[var(--text-main)] text-[var(--bg-page)] rounded-xl hover:scale-105 hover:bg-[var(--color-brand-primary)] hover:text-white disabled:opacity-50 disabled:scale-100 transition-all shadow-md cursor-pointer"
              >
                 {loading ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin" />
                 ) : (
                    <Search className="w-5 h-5" />
                 )}
              </button>
           </form>
           
           {!result && !error && (
             <div className="mt-3 flex justify-between items-center text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-widest opacity-70 px-2">
                <p>Try: <span className="text-[var(--text-main)] font-bold">A1092</span></p>
                {/* Contador de caracteres opcional */}
                <p>{query.length}/{MAX_CHARS}</p>
             </div>
           )}
        </div>

        {/* Results Area */}
        <div className="relative flex justify-center items-start min-h-0">
           <AnimatePresence mode="wait">
             
             {/* SUCCESS STATE */}
             {result && (
               <motion.div
                 key="result"
                 layout
                 initial={{ opacity: 0, y: -20, height: 0 }}
                 animate={{ opacity: 1, y: 0, height: "auto" }}
                 exit={{ opacity: 0, y: -10, height: 0 }}
                 className="w-full max-w-lg bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 relative overflow-hidden transform-gpu"
               >
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-400 to-emerald-600" />
                  
                  <div className="flex justify-between items-start mb-8 mt-1">
                     <div className="text-left">
                        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">{result.product}</h3>
                        <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                           <CheckCircle className="w-4 h-4" />
                           <span className="text-[10px] font-bold uppercase tracking-wider">Analysis Verified</span>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold mb-1">Purity Score</p>
                        <p className="text-4xl font-mono font-bold text-slate-900 dark:text-white tracking-tighter">{result.purity}</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 text-left border-t border-dashed border-gray-200 dark:border-white/10 pt-6">
                     <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 mb-1">Analysis Date</p>
                        <p className="text-base font-mono font-bold text-slate-800 dark:text-gray-200">{result.date}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 mb-1">Method</p>
                        <p className="text-base font-mono font-bold text-slate-800 dark:text-gray-200">HPLC / MS</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 mb-1">Status</p>
                        <p className="text-base font-mono font-bold text-green-600 dark:text-green-400">{result.status}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 mb-1">Lab ID</p>
                        <p className="text-base font-mono font-bold text-slate-800 dark:text-gray-200">TL-{query.toUpperCase()}</p>
                     </div>
                  </div>
               </motion.div>
             )}

             {/* ERROR STATE */}
             {error && (
               <motion.div
                 key="error"
                 layout
                 initial={{ opacity: 0, y: -20, height: 0 }}
                 animate={{ 
                   opacity: 1, 
                   y: 0,
                   height: "auto",
                   x: [0, -5, 5, -5, 5, 0] 
                 }}
                 exit={{ opacity: 0, y: -10, height: 0 }}
                 transition={{ duration: 0.3 }}
                 className="w-full max-w-md bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-5 flex items-center gap-5 shadow-lg transform-gpu"
               >
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-red-900/20 border border-red-100 dark:border-transparent flex items-center justify-center shrink-0">
                     <AlertCircle className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="text-left">
                     <h4 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wide">Batch Not Found</h4>
                     <p className="text-xs text-red-600/80 dark:text-red-300/70 mt-1 leading-relaxed">
                        The lot number <span className="font-mono font-bold text-red-700 dark:text-red-300">"{query}"</span> does not exist.
                     </p>
                  </div>
               </motion.div>
             )}

           </AnimatePresence>
        </div>

      </div>
    </section>
  );
}