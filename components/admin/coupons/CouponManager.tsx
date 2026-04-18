"use client";

import CouponForm from "../cupons/CouponForm";
import CouponList from "../cupons/CouponList";

interface CouponManagerProps {
  initialCoupons: any[]; // Usamos any[] temporalmente para manejar el tipo Decimal de Prisma sin errores
}

export default function CouponManager({ initialCoupons }: CouponManagerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Columna Izquierda: Formulario (ocupa 4 columnas en Desktop) */}
      <div className="lg:col-span-4 sticky top-24">
        <CouponForm />
      </div>

      {/* Columna Derecha: Lista de Cupones (ocupa 8 columnas en Desktop) */}
      <div className="lg:col-span-8">
        <CouponList coupons={initialCoupons} />
      </div>
    </div>
  );
}