"use client";

import { motion } from "framer-motion";

export default function PremiumBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradientes Ambientales */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[var(--color-brand-primary)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-10 dark:opacity-20 animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[var(--color-brand-secondary)] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-10 dark:opacity-15" />

      {/* Grid SVG Animado */}
      <svg className="absolute w-full h-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--grid-color)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>

      {/* Partículas Flotantes (Efecto Polvo/Moléculas) */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-[var(--color-brand-primary)] rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}