"use client";

// Rutas corregidas para que Vercel compile correctamente
import CouponForm from "./CouponForm";
import CouponList from "./CouponList";

interface CouponManagerProps {
  initialCoupons: any[]; // Usamos any[] temporalmente para manejar el tipo Decimal de Prisma sin errores
}

export default function CouponManager({ initialCoupons }: CouponManagerProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Columna Izquierda: Formulario (ocupa 4 columnas en Desktop) */}
      {/* CORRECCIÓN RESPONSIVE: lg:sticky hace que fluya normal en móviles y se fije solo en PC */}
      <div className="lg:col-span-4 lg:sticky lg:top-24">
        <CouponForm />
      </div>

      {/* Columna Derecha: Lista de Cupones (ocupa 8 columnas en Desktop) */}
      {/* Agregamos overflow-hidden y w-full por seguridad para evitar desbordes en móviles muy pequeños */}
      <div className="lg:col-span-8 w-full overflow-hidden">
        <CouponList coupons={initialCoupons} />
      </div>
    </div>
  );
}