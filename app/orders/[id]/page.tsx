import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Clock, Package, ShieldCheck, ArrowRight, CreditCard, Lock, AlertCircle, Edit, CheckCircle2, Receipt, MapPin, User
} from "lucide-react";

// Función para formatear dinero
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
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
    <div className="min-h-[100dvh] bg-[var(--bg-page)] text-[var(--text-main)] font-sans pb-10 pt-24 md:pt-32">
      
      <main className="container mx-auto px-4 max-w-5xl">
        
        {/* BARRA DE PROGRESO - Dinámica según el estado */}
        <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
                <span className="flex items-center gap-2 text-emerald-500">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-[var(--bg-page)] flex items-center justify-center">1</span>
                    Review
                </span>
                <div className="w-4 md:w-8 h-[1px] bg-emerald-500/50" />
                <span className={`flex items-center gap-2 ${isPaid ? 'text-emerald-500' : 'text-[var(--text-main)]'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${isPaid ? 'bg-emerald-500 text-[var(--bg-page)]' : 'bg-[var(--text-main)] text-[var(--bg-page)] animate-pulse'}`}>2</span>
                    Payment
                </span>
                <div className={`w-4 md:w-8 h-[1px] ${isPaid ? 'bg-emerald-500/50' : 'bg-[var(--glass-border)]'}`} />
                <span className={`flex items-center gap-2 ${isPaid ? 'text-emerald-500' : 'opacity-50'}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center ${isPaid ? 'bg-emerald-500 text-[var(--bg-page)]' : 'border border-[var(--glass-border)]'}`}>3</span>
                    {isPaid ? 'Confirmed' : 'Shipping'}
                </span>
            </div>
        </div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-6 md:gap-8 items-start">
          
          {/* COLUMNA IZQUIERDA: DETALLES DE LA ORDEN Y ENVÍO */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 w-full">
            
            {/* PRODUCTOS */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 md:p-6 border-b border-[var(--glass-border)] flex justify-between items-center bg-[var(--bg-page)]/50">
                <h2 className="font-bold flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider text-[var(--text-muted)]">
                  <Package className="w-4 h-4" />
                  Order #{order.id.slice(0, 8)}
                </h2>
                <span className="text-[10px] bg-[var(--glass-border)] px-2 py-1 rounded-full text-[var(--text-muted)]">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="divide-y divide-[var(--glass-border)]">
                {order.items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-3 md:gap-4">
                    <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[var(--bg-page)] rounded-lg overflow-hidden border border-[var(--glass-border)] shrink-0">
                      {item.product.images ? (
                         <Image src={item.product.images} alt={item.product.name} fill className="object-contain p-1" />
                      ) : ( <div className="w-full h-full bg-gray-100" /> )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-bold text-sm truncate">{item.product.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-[var(--text-muted)]">Qty: {item.quantity}</span>
                            <span className="font-mono text-sm font-bold">{formatCurrency(Number(item.price))}</span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETALLES DE ENVÍO Y CONTACTO (NUEVO) */}
            {isPaid && (
              <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-5 md:p-6 shadow-sm">
                <h2 className="font-bold text-sm uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Shipping & Contact Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1"><User className="w-3 h-3"/> Contact Info</p>
                    <p className="text-sm font-medium">{order.customerName}</p>
                    <p className="text-xs text-[var(--text-muted)]">{order.customerEmail}</p>
                    <p className="text-xs text-[var(--text-muted)]">{order.customerPhone}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1"><MapPin className="w-3 h-3"/> Delivery Address</p>
                    <p className="text-sm font-medium">{order.addressLine1}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {order.city}, {order.state} {order.postalCode}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">{order.country}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                <strong className="text-blue-400 block mb-1">Scientific Grade Guarantee</strong>
                Items reserved. Purity certificates included.
              </p>
            </div>
          </div>

          {/* PANEL DERECHO: RECIBO O PAGO PENDIENTE */}
          <div className="lg:col-span-1 w-full lg:sticky lg:top-24 space-y-4 md:space-y-6">
            
            {isPaid ? (
                // --- VISTA DE ÉXITO (PAGADO) ---
                <div className="bg-[var(--bg-page)] border border-emerald-500/30 ring-1 ring-emerald-500/10 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 blur-3xl -z-10 rounded-full translate-x-10 -translate-y-10" />

                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full mb-2">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h1 className="text-xl md:text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400">Payment Successful</h1>
                        <p className="text-xs text-[var(--text-muted)]">Your order is being processed.</p>
                    </div>

                    <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-4 text-sm space-y-3">
                        <div className="flex justify-between border-b border-[var(--glass-border)] pb-2">
                            <span className="text-[var(--text-muted)]">Amount Paid</span>
                            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                ${Number(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--text-muted)]">Payment Method</span>
                            <span className="font-bold flex items-center gap-1">
                                <CreditCard className="w-3 h-3" /> Secure Checkout
                            </span>
                        </div>
                        <div className="flex justify-between text-xs pt-2">
                            <span className="text-[var(--text-muted)]">Transaction ID</span>
                            <span className="font-mono opacity-70">sq_{order.id.slice(0, 8)}</span>
                        </div>
                    </div>

                    <Link href="/#catalog" className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-main)] py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:bg-[var(--glass-border)] transition-colors text-sm md:text-base">
    <Package className="w-4 h-4" />
    Continue Shopping
</Link>
                </div>
            ) : (
                // --- VISTA DE ERROR O PENDIENTE ---
                <div className="bg-[var(--bg-page)] border border-amber-500/30 ring-1 ring-amber-500/10 rounded-2xl p-5 md:p-6 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 blur-3xl -z-10 rounded-full translate-x-10 -translate-y-10" />

                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                        <Clock className="w-3 h-3" /> Pending Payment
                    </div>
                    <h1 className="text-xl md:text-2xl font-display font-bold">Total Due</h1>
                </div>

                <div className="flex justify-center items-baseline gap-1 py-2 border-y border-dashed border-[var(--glass-border)]">
                    <span className="text-sm text-[var(--text-muted)] align-top mt-1">$</span>
                    <span className="text-4xl md:text-5xl font-mono font-bold tracking-tight text-[var(--color-brand-primary)]">
                        {Number(order.total).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                </div>

                <Link 
                    href="/checkout"
                    className="w-full bg-[var(--text-main)] text-[var(--bg-page)] py-3.5 rounded-xl font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
                >
                    <CreditCard className="w-4 h-4" />
                    Complete Payment
                </Link>
                
                <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-2 rounded text-[10px] text-center text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-3 h-3 inline mr-1 mb-0.5" />
                    Awaiting secure payment.
                </div>
                </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}