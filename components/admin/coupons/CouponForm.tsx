"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createCoupon } from "@/app/actions/coupons";
import { Tag, Percent, Plus, Loader2, Hash } from "lucide-react";
import Swal from "sweetalert2";

export default function CouponForm() {
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [maxUses, setMaxUses] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const numPercentage = Number(percentage);
    const numMaxUses = maxUses ? Number(maxUses) : null;

    if (!code.trim() || isNaN(numPercentage) || numPercentage <= 0 || numPercentage > 100) {
      Swal.fire({
        icon: "error",
        title: "Datos inválidos",
        text: "Verifica el código y que el porcentaje sea de 1 a 100.",
        confirmButtonColor: "#E85D9E"
      });
      setIsLoading(false);
      return;
    }

    const res = await createCoupon(code, numPercentage, numMaxUses);

    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "¡Promoción Creada!",
        text: "El cupón está listo para usarse.",
        confirmButtonColor: "#10b981",
        timer: 3000,
        showConfirmButton: false
      });
      setCode("");
      setPercentage("");
      setMaxUses("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res.message || "Error al crear el cupón",
        confirmButtonColor: "#E85D9E"
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-[#FFFDFE]/80 backdrop-blur-xl border border-[#FAD1E6]/60 rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(250,209,230,0.15)] relative overflow-hidden">
      {/* Detalle decorativo de fondo */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#FAD1E6]/20 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-xl font-display font-bold text-[#33182B] mb-6 flex items-center gap-2">
        <Tag className="w-5 h-5 text-[#E85D9E]" />
        Nuevo Cupón
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Input: Código */}
        <div className="space-y-1.5">
          <label className="text-sm font-bold text-[#7B5C73] uppercase tracking-wider text-[11px] ml-1">
            Código del Cupón
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Tag className="w-4 h-4 text-[#7B5C73]/50" />
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ej: BLACKFRIDAY20"
              className="w-full pl-10 pr-4 py-3 bg-[#FFFDFE] border border-[#FAD1E6] focus:border-[#E85D9E] focus:ring-2 focus:ring-[#E85D9E]/20 rounded-2xl outline-none transition-all text-[#33182B] font-medium placeholder:font-normal placeholder:text-[#7B5C73]/40 uppercase"
              required
            />
          </div>
        </div>

        {/* Inputs: Porcentaje y Límite de Usos (Responsive Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* Input: Porcentaje */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#7B5C73] uppercase tracking-wider text-[11px] ml-1">
                    Descuento (%)
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Percent className="w-4 h-4 text-[#7B5C73]/50" />
                    </div>
                    <input
                        type="number" 
                        min="1" 
                        max="100" 
                        value={percentage} 
                        onChange={(e) => setPercentage(e.target.value)}
                        placeholder="Ej: 15"
                        className="w-full pl-10 pr-4 py-3 bg-[#FFFDFE] border border-[#FAD1E6] focus:border-[#E85D9E] focus:ring-2 focus:ring-[#E85D9E]/20 rounded-2xl outline-none transition-all text-[#33182B] font-medium placeholder:font-normal placeholder:text-[#7B5C73]/40"
                        required
                    />
                </div>
            </div>

            {/* Input: Límite de Usos */}
            <div className="space-y-1.5">
                <label className="text-sm font-bold text-[#7B5C73] uppercase tracking-wider text-[11px] ml-1">
                    Límite de usos
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Hash className="w-4 h-4 text-[#7B5C73]/50" />
                    </div>
                    <input
                        type="number" 
                        min="1" 
                        value={maxUses} 
                        onChange={(e) => setMaxUses(e.target.value)}
                        placeholder="Ilimitado"
                        className="w-full pl-10 pr-4 py-3 bg-[#FFFDFE] border border-[#FAD1E6] focus:border-[#E85D9E] focus:ring-2 focus:ring-[#E85D9E]/20 rounded-2xl outline-none transition-all text-[#33182B] font-medium placeholder:font-normal placeholder:text-[#7B5C73]/40"
                    />
                </div>
            </div>
        </div>

        {/* Botón Submit */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-[#33182B] to-[#4A2440] hover:from-[#E85D9E] hover:to-[#FFA8C5] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Crear Promoción
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}