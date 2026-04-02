"use client";
import { motion } from "framer-motion";
import { Microscope, Truck, Lock, FlaskConical, AlertTriangle } from "lucide-react";

export default function LabGrid() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto z-10">
      
      {/* Encabezado de Sección */}
      <div className="mb-12 md:flex justify-between items-end border-b border-[var(--glass-border)] pb-6">
        <div className="max-w-xl">
          <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[var(--color-brand-primary)] font-mono text-xs tracking-widest uppercase mb-2 block"
          >
              System Architecture
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-main)] mb-4 leading-tight">
            Clinical <span className="text-[var(--text-muted)]">Precision</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
            Our synthesis protocols set the industry benchmark for bioavailability and stability. 
            We do not compromise on molecular integrity.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
            <span className="font-mono text-[10px] text-[var(--text-main)] border border-[var(--glass-border)] px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-md">
                STATUS: OPTIMIZED
            </span>
        </div>
      </div>

      {/* Grid Layout (Bento Box) - Optimizado para evitar overflow en móviles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[300px]">
        
        {/* Card 1: Purity Analysis (Grande) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 relative rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)]/50 backdrop-blur-sm overflow-hidden group hover:border-[var(--color-brand-primary)]/50 transition-colors duration-500 min-h-[300px]"
        >
          <div className="p-8 relative z-10 h-full flex flex-col justify-between">
            <div>
               <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-primary)]/10 flex items-center justify-center mb-4">
                  <Microscope className="w-6 h-6 text-[var(--color-brand-primary)]" />
               </div>
               <h3 className="text-2xl font-bold text-[var(--text-main)]">HPLC Verified Purity</h3>
               <p className="text-[var(--text-muted)] mt-2 max-w-sm text-sm">
                 Every batch undergoes rigorous high-performance liquid chromatography.
                 We reject anything under 99%.
               </p>
            </div>
            
            <div className="flex flex-wrap gap-2 md:gap-4 mt-6 md:mt-0">
               <span className="text-xs font-mono text-[var(--text-main)] bg-[var(--glass-border)] px-3 py-1 rounded">Mass Spec</span>
               <span className="text-xs font-mono text-[var(--text-main)] bg-[var(--glass-border)] px-3 py-1 rounded">UV Analysis</span>
            </div>
          </div>

          {/* Gráfico SVG Animado de fondo (Optimizado GPU) */}
          <div className="absolute bottom-0 right-0 w-2/3 h-1/2 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none translate-z-0">
             <svg className="w-full h-full stroke-[var(--color-brand-primary)] fill-none" viewBox="0 0 300 100" preserveAspectRatio="none">
               <motion.path
                 d="M0,100 C50,90 50,80 100,80 C150,80 150,20 200,20 C250,20 250,90 300,90"
                 strokeWidth="2"
                 initial={{ pathLength: 0 }}
                 whileInView={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
               <circle cx="200" cy="20" r="4" className="fill-[var(--color-brand-primary)] animate-ping" />
             </svg>
          </div>
        </motion.div>

        {/* Card 2: Fast Shipping (SOLUCIÓN LIME/LEGIBILIDAD) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="relative rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)]/50 backdrop-blur-sm p-8 flex flex-col justify-between hover:border-[var(--color-brand-secondary)]/50 transition-colors duration-500 min-h-[250px]"
        >
           <div>
             {/* Fondo oscuro en light mode para resaltar el icono lime */}
             <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-[var(--color-brand-secondary)]/10 flex items-center justify-center mb-4 shadow-sm">
               <Truck className="w-6 h-6 text-[var(--color-brand-secondary)]" />
             </div>
             <h3 className="text-xl font-bold text-[var(--text-main)]">Same-Day Dispatch</h3>
             <p className="text-sm text-[var(--text-muted)] mt-2">
               Orders before 2PM EST ship same day.
             </p>
           </div>
           
           {/* Barra de progreso con fondo oscuro en light mode */}
           <div className="w-full h-2 bg-slate-100 dark:bg-[var(--glass-border)] rounded-full overflow-hidden mt-4 border border-slate-200 dark:border-transparent">
              <div className="h-full w-2/3 bg-[var(--color-brand-secondary)] animate-pulse" />
           </div>
        </motion.div>

        {/* Card 3: Secure Data */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="relative rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)]/50 backdrop-blur-sm p-8 flex flex-col justify-between hover:border-[var(--text-main)]/30 transition-colors duration-500 min-h-[250px]"
        >
           <div>
             <div className="w-12 h-12 rounded-xl bg-[var(--text-main)]/5 flex items-center justify-center mb-4">
               <Lock className="w-6 h-6 text-[var(--text-main)]" />
             </div>
             <h3 className="text-xl font-bold text-[var(--text-main)]">Encrypted Data</h3>
             <p className="text-sm text-[var(--text-muted)] mt-2">
               256-bit SSL encryption. We never store payment details.
             </p>
           </div>
           <div className="flex items-center gap-2 text-[var(--color-brand-secondary)] text-xs font-mono bg-slate-900 dark:bg-transparent px-2 py-1 rounded w-fit">
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              SECURE_CONNECTION
           </div>
        </motion.div>

        {/* Card 4: Research Grade Only (OPTIMIZADA SIN BOTÓN) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.3 }}
           className="md:col-span-2 relative rounded-3xl border border-[var(--glass-border)] bg-[var(--bg-page)]/50 backdrop-blur-sm p-8 flex items-center overflow-hidden hover:border-red-500/30 transition-colors duration-500 min-h-[250px]"
        >
             <div className="relative z-10 max-w-lg w-full">
                 <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className="w-5 h-5 text-[var(--text-muted)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Lab Use Compliance</span>
                 </div>
                 
                 <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2">Research Grade Only</h3>
                 <p className="text-[var(--text-muted)] text-sm mb-6 max-w-sm">
                   Formulated specifically for laboratory research and development use. Not for human consumption.
                 </p>

                 {/* WARNING TAPE - Reemplazo del botón */}
                 <div className="relative w-full overflow-hidden rounded-lg bg-red-500/5 border border-red-500/20 p-3 flex items-center gap-3">
                    {/* Patrón rayado de fondo */}
                    <div className="absolute inset-0 opacity-10" 
                         style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0, #ef4444 10px, transparent 0, transparent 20px)' }}>
                    </div>
                    
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 relative z-10" />
                    <p className="text-xs font-mono font-bold text-red-600 dark:text-red-400 relative z-10 uppercase tracking-tight">
                        Strictly for in-vitro analysis. Keep out of reach of children.
                    </p>
                 </div>
             </div>
             
             {/* Decoración Molecular Abstracta (Más sutil para no distraer) */}
             <div className="absolute right-[-40px] top-[-40px] opacity-5 rotate-12 pointer-events-none">
                <div className="w-64 h-64 border-[30px] border-[var(--text-main)] rounded-full border-dashed" />
             </div>
        </motion.div>

      </div>
    </section>
  );
}