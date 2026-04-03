"use client";
import { HeartPulse, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export default function ResearchChallenges() {
  return (
    <div className="bg-gradient-to-br from-[#FFF5F8] to-white border border-[#FAD1E6] p-8 rounded-[2.5rem] relative overflow-hidden group shadow-sm">
        
        <div className="absolute top-0 right-0 p-6 opacity-10">
            <Sparkles className="w-24 h-24 text-[#E85D9E]" />
        </div>
        
        <h3 className="text-xl font-display font-bold text-[#33182B] mb-6 flex items-center gap-3">
            <HeartPulse className="w-6 h-6 text-[#E85D9E]" /> La Promesa de Nuestra Boutique
        </h3>
        
        <ul className="space-y-5 relative z-10">
            <li className="flex items-start gap-4">
                <div className="mt-1 bg-white rounded-full p-1 shadow-sm border border-[#FAD1E6]">
                   <CheckCircle2 className="w-4 h-4 text-[#E85D9E]" />
                </div>
                <div>
                   <p className="text-sm font-bold text-[#33182B] mb-0.5">Calidad que se siente</p>
                   <p className="text-xs text-[#7B5C73] font-medium">Telas hipoalergénicas y suaves, pensadas para la piel delicada de las niñas.</p>
                </div>
            </li>
            <li className="flex items-start gap-4">
                <div className="mt-1 bg-white rounded-full p-1 shadow-sm border border-[#FAD1E6]">
                   <CheckCircle2 className="w-4 h-4 text-[#E85D9E]" />
                </div>
                <div>
                   <p className="text-sm font-bold text-[#33182B] mb-0.5">Costuras invisibles y cómodas</p>
                   <p className="text-xs text-[#7B5C73] font-medium">Olvídate de las etiquetas y costuras que pican. Cada prenda es 100% confortable.</p>
                </div>
            </li>
            <li className="flex items-start gap-4">
                <div className="mt-1 bg-white rounded-full p-1 shadow-sm border border-[#FAD1E6]">
                   <ShieldCheck className="w-4 h-4 text-[#E85D9E]" />
                </div>
                <div>
                   <p className="text-sm font-bold text-[#33182B] mb-0.5">Compra 100% Segura</p>
                   <p className="text-xs text-[#7B5C73] font-medium">Garantía en todas tus prendas y pasarela de pagos encriptada para tu tranquilidad.</p>
                </div>
            </li>
        </ul>
    </div>
  );
}