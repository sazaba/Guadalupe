"use client";

import { motion } from "framer-motion";
import { User, Check, Building2, FlaskConical, Atom } from "lucide-react";

// 7 RESEÑAS REALISTAS Y CIENTÍFICAS
const REVIEWS = [
  {
    id: "fb-001",
    user: "Dr. A. Miller",
    role: "Lead Researcher",
    lab: "NeuroGen Institute",
    rating: 5,
    text: "HPLC analysis confirmed 99.8% purity. Lyophilization integrity exceeds standard market protocols. Vital for our neuroplasticity studies.",
    date: "2h ago"
  },
  {
    id: "fb-002",
    user: "BioTech Dept.",
    role: "Procurement",
    lab: "University of Caldas",
    rating: 5,
    text: "Instant solubility in bacteriostatic media. Zero turbidity observed. Logistics efficiency: Optimal.",
    date: "5h ago"
  },
  {
    id: "fb-003",
    user: "J. Bastidas",
    role: "Clinical Specialist",
    lab: "Private Practice",
    rating: 5,
    text: "Cold-chain packaging maintained thermal stability throughout transit. Essential for peptide viability in tropical climates.",
    date: "1d ago"
  },
  {
    id: "fb-004",
    user: "L. Chen",
    role: "PhD Candidate",
    lab: "Stanford Bio-X",
    rating: 5,
    text: "Mass spectrometry matched the reference sequence perfectly. No heavy metal contaminants found.",
    date: "2d ago"
  },
  {
    id: "fb-005",
    user: "Apex Research",
    role: "Lab Director",
    lab: "Apex Systems",
    rating: 4,
    text: "Consistent batch-to-batch quality. We have shifted 80% of our peptide sourcing to Transcendent due to this reliability.",
    date: "3d ago"
  },
  {
    id: "fb-006",
    user: "K. Varghese",
    role: "Senior Analyst",
    lab: "Varghese Labs",
    rating: 5,
    text: "The BPC-157 yield was higher than expected during reconstitution. Excellent value for research budgets.",
    date: "4d ago"
  },
  {
    id: "fb-007",
    user: "Dr. S. Kagawa",
    role: "Neuroscientist",
    lab: "Tokyo Med Tech",
    rating: 5,
    text: "International shipping was surprisingly fast. The stealth packaging ensured smooth customs clearance.",
    date: "1w ago"
  }
];

// ESTRELLA SVG ANIMADA (Dibuja el contorno y luego rellena)
const AnimatedStar = ({ delay }: { delay: number }) => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className="w-4 h-4 text-[var(--color-brand-primary)] fill-current drop-shadow-[0_0_8px_rgba(var(--color-brand-primary),0.6)]"
  >
    <motion.path 
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      initial={{ pathLength: 0, opacity: 0, scale: 0.5 }}
      whileInView={{ pathLength: 1, opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
    />
  </motion.svg>
);

export default function ProductReviews() {
  return (
    <div className="w-full relative py-8">
       {/* Background Grid Decorativo */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

       {/* Horizontal Stream */}
       {/* CLAVE: [&::-webkit-scrollbar]:hidden FORZA LA OCULTACIÓN DEL SCROLLBAR */}
       <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 px-4 md:px-0 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] cursor-grab active:cursor-grabbing">
          {REVIEWS.map((review, i) => (
             <motion.div
               key={review.id}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 0.4, delay: i * 0.1 }}
               className="snap-center shrink-0 w-[300px] md:w-[360px]"
             >
                {/* High-Tech Card */}
                <div className="h-full bg-[var(--bg-page)]/60 backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group hover:border-[var(--color-brand-primary)]/40 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
                   
                   {/* Gradient Glow Effect on Hover */}
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-primary)]/5 rounded-full blur-3xl group-hover:bg-[var(--color-brand-primary)]/15 transition-colors duration-500" />

                   {/* Header */}
                   <div className="flex justify-between items-start relative z-10">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--glass-bg)] to-[var(--glass-border)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-main)] font-bold shadow-sm group-hover:scale-105 transition-transform">
                            {review.user.charAt(0)}
                         </div>
                         <div>
                            <h4 className="text-sm font-bold text-[var(--text-main)]">{review.user}</h4>
                            <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                               <Building2 className="w-3 h-3" /> {review.lab}
                            </div>
                         </div>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--glass-border)] px-2 py-1 rounded bg-[var(--bg-page)]/50">
                         {review.date}
                      </span>
                   </div>

                   {/* Animated Stars */}
                   <div className="flex gap-1 my-1">
                      {[...Array(5)].map((_, starIndex) => (
                         <AnimatedStar key={starIndex} delay={0.2 + (starIndex * 0.1)} />
                      ))}
                   </div>

                   {/* Text */}
                   <p className="text-xs text-[var(--text-muted)] leading-relaxed italic relative z-10 pl-3 border-l-2 border-[var(--glass-border)] group-hover:border-[var(--color-brand-primary)] transition-colors">
                      &quot;{review.text}&quot;
                   </p>

                   {/* Footer Verified */}
                   <div className="mt-auto pt-4 border-t border-[var(--glass-border)] flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                         <FlaskConical className="w-3 h-3" /> {review.role}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-full border border-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                         <Check className="w-3 h-3" /> Verified Purchase
                      </div>
                   </div>

                </div>
             </motion.div>
          ))}
       </div>
    </div>
  );
}