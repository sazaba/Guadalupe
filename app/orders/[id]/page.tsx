import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Clock, Package, ShieldCheck, ArrowRight, CreditCard, Lock, AlertCircle, Edit, CheckCircle2, Receipt, MapPin, User, Heart
} from "lucide-react";

// Función para formatear dinero en Pesos Colombianos
const formatCurrency = (amount: number) => {
  return "$" + amount.toLocaleString("es-CO");
};

// Fetch de datos
async function getOrder(id: string) {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!order) return null;
  return order;
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const order = await getOrder(id);

  if (!order) notFound();

  // --- DETERMINAMOS EL ESTADO DEL PAGO ---
  const isPaid = order.status === 'PAID' || order.isPaid === true;

  return (
    <div className="min-h-[100dvh] bg-[#FFFDFE] text-[#33182B] font-sans pb-10 pt-24 md:pt-32">
      
      <main className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* BARRA DE PROGRESO - Dinámica según el estado */}
        <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-90">
                <span className="flex items-center gap-2 text-[#E85D9E]">
                    <span className="w-5 h-5 rounded-full bg-[#E85D9E] text-white flex items-center justify-center shadow-sm">1</span>
                    Revisión
                </span>
                <div className="w-4 md:w-8 h-[2px] bg-[#E85D9E]/30 rounded-full" />
                <span className={`flex items-center gap-2 ${isPaid ? 'text-[#E85D9E]' : 'text-[#33182B]'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shadow-sm transition-colors ${isPaid ? 'bg-[#E85D9E] text-white' : 'bg-[#33182B] text-white animate-pulse'}`}>2</span>
                    Pago
                </span>
                <div className={`w-4 md:w-8 h-[2px] rounded-full transition-colors ${isPaid ? 'bg-[#E85D9E]/30' : 'bg-[#FAD1E6]'}`} />
                <span className={`flex items-center gap-2 ${isPaid ? 'text-[#E85D9E]' : 'text-[#7B5C73]/50'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${isPaid ? 'bg-[#E85D9E] text-white shadow-sm' : 'border-2 border-[#FAD1E6] bg-white'}`}>3</span>
                    {isPaid ? 'Confirmado' : 'Envío'}
                </span>
            </div>
        </div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: DETALLES DE LA ORDEN Y ENVÍO */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 w-full">
            
            {/* PRODUCTOS */}
            <div className="bg-white border border-[#FAD1E6]/80 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(232,93,158,0.04)]">
              <div className="p-5 md:p-6 border-b border-[#FAD1E6]/50 flex justify-between items-center bg-[#FFF6F9]">
                <h2 className="font-bold flex items-center gap-2 text-xs md:text-sm uppercase tracking-widest text-[#E85D9E]">
                  <Package className="w-4 h-4" />
                  Pedido #{order.id.slice(0, 8)}
                </h2>
                <span className="text-[10px] font-bold bg-white border border-[#FAD1E6] px-3 py-1.5 rounded-full text-[#7B5C73] shadow-sm">
                  {new Date(order.createdAt).toLocaleDateString('es-CO')}
                </span>
              </div>
              
              <div className="divide-y divide-[#FAD1E6]/30">
                {order.items.map((item) => (
                  <div key={item.id} className="p-5 flex gap-4">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#FFF6F9] rounded-2xl overflow-hidden border border-[#FAD1E6]/50 shrink-0">
                      {item.product.images ? (
                         <Image src={item.product.images.split(',')[0]} alt={item.product.name} fill className="object-cover" />
                      ) : ( <div className="w-full h-full flex items-center justify-center"><Package className="w-6 h-6 text-[#FAD1E6]" /></div> )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-bold text-[#33182B] text-base truncate">{item.product.name}</h3>
                        
                        {/* Mostramos talla y color si existen */}
                        <div className="flex gap-2 mt-1">
                           {item.product.size && <span className="text-[10px] font-bold text-[#7B5C73] bg-[#FAD1E6]/20 px-2 py-0.5 rounded-md uppercase border border-[#FAD1E6]/50">Talla: {item.product.size}</span>}
                           {item.product.color && <span className="text-[10px] font-bold text-[#7B5C73] bg-[#FAD1E6]/20 px-2 py-0.5 rounded-md uppercase border border-[#FAD1E6]/50">{item.product.color}</span>}
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-[#7B5C73] font-medium">Cant: <b className="text-[#E85D9E]">{item.quantity}</b></span>
                            <span className="font-display text-base font-bold">{formatCurrency(Number(item.price))}</span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETALLES DE ENVÍO Y CONTACTO */}
            {isPaid && (
              <div className="bg-white border border-[#FAD1E6]/80 rounded-[24px] p-5 md:p-6 shadow-[0_8px_30px_rgb(232,93,158,0.04)]">
                <h2 className="font-bold text-xs uppercase tracking-widest text-[#E85D9E] mb-5 flex items-center gap-2 bg-[#FFF6F9] w-fit px-4 py-2 rounded-xl border border-[#FAD1E6]/50">
                  <MapPin className="w-4 h-4" /> Datos de Envío y Contacto
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-2">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B5C73] flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#E85D9E]"/> Información</p>
                    <p className="text-sm font-bold capitalize text-[#33182B]">{order.customerName}</p>
                    <p className="text-xs text-[#7B5C73] font-medium">{order.customerEmail}</p>
                    <p className="text-xs text-[#7B5C73] font-mono font-medium">{order.customerPhone}</p>
                  </div>
                  
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#7B5C73] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#E85D9E]"/> Dirección</p>
                    <p className="text-sm font-bold text-[#33182B]">{order.addressLine1}</p>
                    <p className="text-xs text-[#7B5C73] font-medium">
                      {order.city}, {order.state} - {order.postalCode}
                    </p>
                    <p className="text-xs text-[#7B5C73] font-medium">{order.country}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tarjeta de Garantía de la Boutique */}
            <div className="bg-[#FFF6F9] border border-[#FAD1E6] rounded-[20px] p-5 flex gap-4 items-center shadow-sm">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-[#FAD1E6]/50 shadow-sm">
                 <Heart className="w-6 h-6 text-[#E85D9E] fill-[#E85D9E]/20" />
              </div>
              <p className="text-xs text-[#7B5C73] leading-relaxed font-medium">
                <strong className="text-[#E85D9E] block mb-0.5 text-sm">Preparado con Amor</strong>
                Cada prenda es cuidadosamente revisada y empacada para que la magia llegue perfecta a las manos de tu princesa.
              </p>
            </div>
          </div>

          {/* PANEL DERECHO: RECIBO O PAGO PENDIENTE */}
          <div className="lg:col-span-1 w-full lg:sticky lg:top-24 space-y-4 md:space-y-6">
            
            {isPaid ? (
                // --- VISTA DE ÉXITO (PAGADO) ---
                <div className="bg-white border border-emerald-200 rounded-[24px] p-6 space-y-6 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 blur-3xl -z-10 rounded-full translate-x-10 -translate-y-10" />

                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-100 text-emerald-500 rounded-full mb-2 shadow-sm border border-emerald-200">
                            <CheckCircle2 className="w-7 h-7" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-[#33182B]">¡Pago Exitoso!</h1>
                        <p className="text-sm text-[#7B5C73] font-medium">Tu pedido está siendo preparado.</p>
                    </div>

                    <div className="bg-[#FFF6F9] border border-[#FAD1E6] rounded-[20px] p-5 text-sm space-y-3">
                        <div className="flex justify-between border-b border-[#FAD1E6]/60 pb-3 items-center">
                            <span className="text-[#7B5C73] font-bold text-xs uppercase tracking-wide">Total Pagado</span>
                            <span className="font-display text-xl font-bold text-emerald-600">
                                {formatCurrency(Number(order.total))}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-[#7B5C73] font-medium text-xs">Método de Pago</span>
                            <span className="font-bold flex items-center gap-1.5 text-xs text-[#33182B]">
                                <CreditCard className="w-3.5 h-3.5 text-[#E85D9E]" /> Pago Seguro
                            </span>
                        </div>
                        <div className="flex justify-between text-xs pt-1">
                            <span className="text-[#7B5C73] font-medium">ID Transacción</span>
                            <span className="font-mono font-medium text-[#7B5C73]">ord_{order.id.slice(0, 6)}</span>
                        </div>
                    </div>

                    <Link href="/#catalog" className="w-full bg-white border-2 border-[#FAD1E6] text-[#E85D9E] py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:bg-[#FFF6F9] hover:border-[#E85D9E]/50 transition-all text-xs md:text-sm">
                      <Package className="w-4 h-4" /> Seguir Comprando
                    </Link>
                </div>
            ) : (
                // --- VISTA DE PAGO PENDIENTE ---
                <div className="bg-white border border-[#FAD1E6] rounded-[24px] p-6 space-y-6 shadow-[0_10px_40px_-10px_rgba(232,93,158,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFF6F9] blur-3xl -z-10 rounded-full translate-x-10 -translate-y-10" />

                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-200 shadow-sm">
                        <Clock className="w-3.5 h-3.5" /> Pago Pendiente
                    </div>
                    <h1 className="text-xl md:text-2xl font-display font-bold text-[#33182B]">Total a Pagar</h1>
                </div>

                <div className="flex justify-center items-center py-4 border-y border-dashed border-[#FAD1E6]">
                    <span className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[#E85D9E]">
                        {formatCurrency(Number(order.total))}
                    </span>
                </div>

                <Link 
                    href="/checkout"
                    className="w-full bg-[#E85D9E] text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-[0_8px_20px_-6px_rgba(232,93,158,0.5)] flex items-center justify-center gap-2 text-xs md:text-sm hover:bg-[#D6488B] transition-colors"
                >
                    <CreditCard className="w-4 h-4" /> Completar Pago
                </Link>
                
                <div className="bg-[#FFF6F9] border border-[#FAD1E6] p-3 rounded-xl text-[11px] text-center text-[#7B5C73] font-medium flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#E85D9E]" />
                    Esperando confirmación de pago seguro.
                </div>
                </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}