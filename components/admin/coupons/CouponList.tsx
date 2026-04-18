"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateCouponStatus, deleteCoupon } from "@/app/actions/coupons";
import { Trash2, Power, Ticket, Calendar } from "lucide-react";

interface CouponListProps {
  coupons: any[];
}

export default function CouponList({ coupons }: CouponListProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    setLoadingId(id);
    await updateCouponStatus(id, !currentStatus);
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de eliminar este cupón? Las órdenes pasadas no se verán afectadas.")) return;
    setLoadingId(id);
    await deleteCoupon(id);
    setLoadingId(null);
  };

  if (!coupons || coupons.length === 0) {
    return (
      <div className="bg-[#FFFDFE]/80 backdrop-blur-xl border border-[#FAD1E6]/60 rounded-3xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-[#FAD1E6]/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Ticket className="w-8 h-8 text-[#7B5C73]/50" />
        </div>
        <h3 className="text-lg font-bold text-[#33182B] mb-2">No hay cupones activos</h3>
        <p className="text-[#7B5C73] text-sm max-w-md mx-auto">
          Crea tu primer código de descuento usando el formulario para impulsar tus ventas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFDFE]/80 backdrop-blur-xl border border-[#FAD1E6]/60 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(250,209,230,0.15)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-[#FAD1E6]/20 to-transparent border-b border-[#FAD1E6]/60">
              <th className="py-4 px-6 text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest">Código</th>
              <th className="py-4 px-6 text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest text-center">Descuento</th>
              <th className="py-4 px-6 text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest text-center">Estado</th>
              <th className="py-4 px-6 text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest text-center">Fecha</th>
              <th className="py-4 px-6 text-[10px] font-bold text-[#7B5C73] uppercase tracking-widest text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {coupons.map((coupon) => {
                // Prisma devuelve Decimal, lo convertimos a número seguro para la vista
                const discount = Number(coupon.discountPercentage);
                const isProcessing = loadingId === coupon.id;

                return (
                  <motion.tr
                    key={coupon.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className={`border-b border-[#FAD1E6]/30 hover:bg-[#FAD1E6]/10 transition-colors ${isProcessing ? "opacity-50" : ""}`}
                  >
                    {/* Código */}
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#33182B] text-white rounded-lg text-sm font-bold tracking-wider">
                        <Ticket className="w-4 h-4 text-[#E85D9E]" />
                        {coupon.code}
                      </div>
                    </td>

                    {/* Porcentaje */}
                    <td className="py-4 px-6 text-center">
                      <span className="text-xl font-display font-bold text-[#E85D9E]">
                        {discount}%
                      </span>
                    </td>

                    {/* Estado (Toggle) */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleToggleStatus(coupon.id, coupon.isActive)}
                        disabled={isProcessing}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E85D9E]/50 focus:ring-offset-2 ${
                          coupon.isActive ? "bg-[#10b981]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            coupon.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>

                    {/* Fecha de Creación */}
                    <td className="py-4 px-6 text-center text-sm font-medium text-[#7B5C73]">
                      <div className="flex items-center justify-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 opacity-70" />
                        {new Date(coupon.createdAt).toLocaleDateString("es-CO", {
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleStatus(coupon.id, coupon.isActive)}
                          disabled={isProcessing}
                          title={coupon.isActive ? "Desactivar" : "Activar"}
                          className={`p-2 rounded-xl transition-all ${
                            coupon.isActive 
                              ? "bg-amber-50 text-amber-600 hover:bg-amber-100" 
                              : "bg-[#ecfdf5] text-[#065f46] hover:bg-[#d1fae5]"
                          }`}
                        >
                          <Power className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(coupon.id)}
                          disabled={isProcessing}
                          title="Eliminar"
                          className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}