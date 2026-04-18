import { getCoupons } from "@/app/actions/coupons";
import CouponManager from "@/components/admin/cupons/CouponManager";
import { Ticket } from "lucide-react";

export const metadata = {
  title: "Administrar Cupones | Guadalupe Boutique",
};

export default async function CouponsPage() {
  // Hacemos el fetch de los cupones directo en el servidor
  const response = await getCoupons();
  
  // Si la petición sale bien, sacamos los datos. Si no, mandamos un array vacío.
  const initialCoupons = response.ok && response.data ? response.data : [];

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
      {/* Header de la página usando la paleta premium de tu marca */}
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#FAD1E6]/30 flex items-center justify-center text-[#E85D9E] shadow-[0_4px_12px_rgba(250,209,230,0.4)]">
          <Ticket className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-[#33182B]">Cupones de Descuento</h1>
          <p className="text-[#7B5C73] mt-1 text-sm md:text-base">
            Crea códigos, configura porcentajes y administra promociones activas.
          </p>
        </div>
      </div>

      {/* Componente del cliente que maneja la interactividad (formularios, tablas, estados) */}
      <CouponManager initialCoupons={initialCoupons} />
    </div>
  );
}