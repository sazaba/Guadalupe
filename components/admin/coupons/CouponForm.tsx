"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createCoupon } from "@/app/actions/coupons";
import { Tag, Percent, Plus, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CouponForm() {
  const [code, setCode] = useState("");
  const [percentage, setPercentage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const numPercentage = Number(percentage);

    if (!code.trim() || isNaN(numPercentage) || numPercentage <= 0 || numPercentage > 100) {
      setMessage({ text: "Verifica el código y que el porcentaje sea de 1 a 100.", type: "error" });
      setIsLoading(false);
      return;
    }

    const res = await createCoupon(code, numPercentage);

    if (res.ok) {
      setMessage({ text: "¡Cupón creado con éxito!", type: "success" });
      setCode("");
      setPercentage("");
      // Limpiamos el mensaje de éxito después de 3 segundos
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ text: res.message || "Error al crear el cupón", type: "error" });
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-[#FFFDFE]/80 backdrop-blur-xl border border-[#FAD1E6]/60 rounded-3xl p-6 shadow-[0_8px_30px_rgba(250,209,230,0.15)] relative overflow-hidden">
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

        {/* Mensajes de Error / Éxito */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-3 rounded-xl flex items-start gap-2 text-sm font-medium ${
                message.type === "error" 
                  ? "bg-red-50 text-red-600 border border-red-100" 
                  : "bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]"
              }`}
            >
              {message.type === "error" ? (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <p>{message.text}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón Submit */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-[#33182B] to-[#4A2440] hover:from-[#E85D9E] hover:to-[#FFA8C5] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
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