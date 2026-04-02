'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // <--- Para detectar la ruta
import Logo from '@/app/assets/logo.webp'; 

export default function AgeVerificationModal() {
  const [showModal, setShowModal] = useState(false); // Empezamos en falso para evitar parpadeos
  const pathname = usePathname();

  useEffect(() => {
    // 1. Verificamos si estamos en una ruta de administración (ej: /admin o /dashboard)
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');
    
    // 2. Revisamos si ya existe la validación en el navegador
    const isVerified = localStorage.getItem('age_verified_transcendent');

    // Solo mostramos el modal si NO es admin Y NO está verificado
    if (!isAdminRoute && !isVerified) {
      setShowModal(true);
    }
  }, [pathname]);

  const handleConfirm = () => {
    // Guardamos la decisión para que no vuelva a aparecer
    localStorage.setItem('age_verified_transcendent', 'true');
    setShowModal(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  // Si no debe mostrarse, no renderizamos nada
  if (!showModal) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 touch-none"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[var(--bg-page)] border border-[var(--glass-border)] p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden"
          >
            {/* Grid de fondo decorativo */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,var(--text-muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--text-muted)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-[var(--color-brand-primary)]/20 blur-2xl rounded-full"></div>
                <Image 
                  src={Logo} 
                  alt="Transcendent Logo" 
                  width={80} 
                  height={80} 
                  className="relative z-10 drop-shadow-2xl"
                  priority
                />
              </div>

              <h2 className="text-3xl font-bold text-[var(--text-main)] tracking-tighter uppercase mb-4">
                Age Verification
              </h2>
              
              <p className="mb-10 text-[var(--text-muted)] text-sm leading-relaxed">
                The compounds in <span className="text-[var(--text-main)] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] uppercase">Transcendent Labs</span> are for research by adults only.
                <span className="block mt-3 font-medium text-[var(--text-main)]">
                  Confirm you are 18 or older to access.
                </span>
              </p>

              <div className="flex flex-col gap-4 w-full">
                <button 
                  onClick={handleConfirm}
                  className="w-full py-4 bg-[var(--text-main)] text-[var(--bg-page)] font-bold rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(var(--color-brand-primary-rgb),0.3)] active:scale-95 uppercase tracking-widest"
                >
                  Enter Site
                </button>
                
                <button 
                  onClick={handleReject}
                  className="w-full py-2 text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors uppercase tracking-[0.2em]"
                >
                  I am under 18 (Exit)
                </button>
              </div>

              <div className="mt-10 pt-6 border-t border-[var(--glass-border)] w-full">
                 <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-[0.4em] opacity-50">
                   Bio-Active Engineering &copy; 2026
                 </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}