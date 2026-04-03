"use client";
import { HeartPulse, CheckCircle2, Sparkles, ShieldCheck, Gem } from "lucide-react";

export default function ResearchChallenges() {
  return (
    <div className="relative bg-white/60 backdrop-blur-2xl border border-pink-100/80 p-8 md:p-10 rounded-[2.5rem] overflow-hidden group shadow-[0_20px_40px_-15px_rgba(232,93,158,0.1)] hover:shadow-[0_20px_50px_-10px_rgba(232,93,158,0.15)] transition-all duration-500">
        
        {/* Brillos decorativos de fondo */}
        <div className="absolute top-0 right-0 p-8 opacity-5 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <Gem className="w-32 h-32 text-[#E85D9E]" />
        </div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-pink-200/40 to-transparent rounded-full blur-3xl" />
        
        <h3 className="text-2xl font-display font-bold text-[#33182B] mb-8 flex items-center gap-3 relative z-10">
            <HeartPulse className="w-7 h-7 text-[#E85D9E] drop-shadow-sm" /> 
            La Promesa de la Boutique
        </h3>
        
        <ul className="space-y-6 relative z-10">
            <li className="flex items-start gap-5 group/item">
                <div className="mt-0.5 bg-gradient-to-br from-pink-50 to-white rounded-full p-2 shadow-sm border border-pink-100 group-hover/item:scale-110 transition-transform">
                   <CheckCircle2 className="w-5 h-5 text-[#E85D9E]" />
                </div>
                <div>
                   <p className="text-base font-bold text-[#33182B] mb-1">Calidad que se siente</p>
                   <p className="text-sm text-[#7B5C73] font-medium leading-relaxed">Telas hipoalergénicas y ultra suaves, pensadas exclusivamente para cuidar la piel delicada de las niñas.</p>
                </div>
            </li>
            <li className="flex items-start gap-5 group/item">
                <div className="mt-0.5 bg-gradient-to-br from-pink-50 to-white rounded-full p-2 shadow-sm border border-pink-100 group-hover/item:scale-110 transition-transform">
                   <Sparkles className="w-5 h-5 text-[#E85D9E]" />
                </div>
                <div>
                   <p className="text-base font-bold text-[#33182B] mb-1">Costuras invisibles y mágicas</p>
                   <p className="text-sm text-[#7B5C73] font-medium leading-relaxed">Olvídate de las etiquetas y costuras que pican. Cada prenda garantiza 100% de confort en sus momentos especiales.</p>
                </div>
            </li>
            <li className="flex items-start gap-5 group/item">
                <div className="mt-0.5 bg-gradient-to-br from-pink-50 to-white rounded-full p-2 shadow-sm border border-pink-100 group-hover/item:scale-110 transition-transform">
                   <ShieldCheck className="w-5 h-5 text-[#E85D9E]" />
                </div>
                <div>
                   <p className="text-base font-bold text-[#33182B] mb-1">Compra 100% Segura</p>
                   <p className="text-sm text-[#7B5C73] font-medium leading-relaxed">Garantía total en tus prendas y una pasarela de pagos encriptada para tu completa tranquilidad.</p>
                </div>
            </li>
        </ul>
    </div>
  );
}