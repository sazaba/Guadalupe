"use client";

import { useCart } from "@/context/CartContext";
import { placeOrder } from "@/app/actions/place-order"; 
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShieldCheck, Loader2, ArrowLeft, MapPin, User, Package, Heart } from "lucide-react";
import Link from "next/link";
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';

export default function CheckoutPage() {
  const { items, cartSubtotal, shippingTotal, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isMpInitialized, setIsMpInitialized] = useState(false);

  // Inicializamos Mercado Pago de forma segura
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;
    if (key && !isMpInitialized) {
        initMercadoPago(key, { locale: 'es-CO' });
        setIsMpInitialized(true);
    }
  }, [isMpInitialized]);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", address: "", city: "", state: "", postalCode: "", country: "CO"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formatCOP = (amount: number) => {
    return "$" + amount.toLocaleString("es-CO");
  };

  const handlePaymentSubmit = async (mpFormData: any) => {
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.state) {
        alert("Por favor, completa tu información de contacto y envío antes de pagar.");
        return new Promise((resolve, reject) => reject()); 
    }

    setIsLoading(true);

    const formattedItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity
    }));
    
    const result = await placeOrder(formattedItems, formData, mpFormData.formData);

    if (result.ok) {
        clearCart();
        alert("¡Pago exitoso! Tu orden ha sido procesada.");
        router.push('/');
    } else {
        setIsLoading(false);
        alert(`Error al procesar el pago: ${result.message}`);
        return new Promise((resolve, reject) => reject());
    }
  };

  // =========================================================
  // FIX: Aislamos el Brick de Mercado Pago para evitar parpadeos
  // Solo se volverá a renderizar si el 'cartTotal' cambia.
  // =========================================================
  const memoizedPaymentBrick = useMemo(() => {
    if (!isMpInitialized || cartTotal <= 0) return null;

    return (
        <Payment
            initialization={{ amount: cartTotal }}
            customization={{
                paymentMethods: {
                    creditCard: "all",
                    debitCard: "all",
                },
                visual: {
                    style: {
                        theme: "default",
                    }
                }
            }}
            onSubmit={handlePaymentSubmit}
        />
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMpInitialized, cartTotal]); 
  // Nota: Omitimos formData intencionalmente en las dependencias de useMemo 
  // para que escribir en el input NO reinicie el Brick. La función handlePaymentSubmit 
  // usará el estado de formData más reciente gracias a cómo funciona React.

  if (items.length === 0 && !isLoading) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFDFE] text-[#33182B] font-sans">
              <div className="w-24 h-24 bg-[#FFF6F9] rounded-full flex items-center justify-center mb-4 border border-[#FAD1E6]/50">
                 <Package className="w-10 h-10 text-[#FAD1E6]" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Tu carrito está vacío</h2>
              <p className="text-[#7B5C73] mb-6 font-medium">Aún no has agregado magia a tu pedido.</p>
              <Link href="/#catalog" className="bg-[#E85D9E] text-white px-8 py-3 rounded-xl font-bold tracking-wide shadow-[0_8px_20px_-6px_rgba(232,93,158,0.5)] hover:bg-[#D6488B] transition-colors">
                 Volver a la tienda
              </Link>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[#FFFDFE] text-[#33182B] font-sans pt-24 pb-12 px-4 relative z-10">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#FFF6F9] to-transparent -z-10" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        
        {/* COLUMNA IZQUIERDA: FORMULARIO DE ENVÍO */}
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <Link href="/" className="p-2.5 bg-white border border-[#FAD1E6] hover:bg-[#FFF6F9] hover:border-[#E85D9E]/50 rounded-full transition-colors shadow-sm text-[#7B5C73]">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-display font-bold">Finalizar Compra</h1>
            </div>

            <form id="checkout-form" className="space-y-8">
                {/* SECCIÓN 1: DATOS DE CONTACTO */}
                <section className="bg-white border border-[#FAD1E6]/80 rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgb(232,93,158,0.04)] space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#FAD1E6]/50 pb-4">
                        <div className="w-8 h-8 rounded-full bg-[#FFF6F9] border border-[#FAD1E6] text-[#E85D9E] flex items-center justify-center">
                            <User className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#E85D9E]">1. Información de Contacto</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">Nombre Completo</label>
                            <input required name="name" onChange={handleInputChange} type="text" placeholder="Ej: Camila Restrepo" className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/40" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">Correo Electrónico</label>
                                <input required name="email" onChange={handleInputChange} type="email" placeholder="camila@correo.com" className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/40" />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">Celular</label>
                                <input required name="phone" onChange={handleInputChange} type="tel" placeholder="300 123 4567" className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/40 font-mono" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: DIRECCIÓN DE ENVÍO */}
                <section className="bg-white border border-[#FAD1E6]/80 rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgb(232,93,158,0.04)] space-y-6">
                     <div className="flex items-center gap-3 border-b border-[#FAD1E6]/50 pb-4">
                        <div className="w-8 h-8 rounded-full bg-[#FFF6F9] border border-[#FAD1E6] text-[#E85D9E] flex items-center justify-center">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-[#E85D9E]">2. Dirección de Envío</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">País</label>
                            <div className="relative">
                                <select name="country" defaultValue="CO" onChange={handleInputChange} className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all appearance-none cursor-pointer font-bold text-[#33182B]">
                                    <option value="CO">Colombia</option>
                                    <option value="US">Estados Unidos</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l border-b border-[#7B5C73] w-2 h-2 -rotate-45" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">Dirección Completa</label>
                            <input required name="address" onChange={handleInputChange} type="text" placeholder="Ej: Calle 10 # 5-20, Apto 301" className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/40" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                            <div className="md:col-span-5">
                                <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">Ciudad / Municipio</label>
                                <input required name="city" onChange={handleInputChange} type="text" placeholder={formData.country === "CO" ? "Ej: Sabaneta" : "Miami"} className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/40" />
                            </div>
                            <div className="md:col-span-4">
                                <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">{formData.country === "CO" ? "Departamento" : "Estado"}</label>
                                <input required name="state" onChange={handleInputChange} type="text" placeholder={formData.country === "CO" ? "Antioquia" : "FL"} className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/40 capitalize" maxLength={formData.country === "US" ? 2 : 30} />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-[11px] font-bold uppercase tracking-wide mb-1.5 ml-1 text-[#7B5C73]">Cód. Postal</label>
                                <input required name="postalCode" onChange={handleInputChange} type="text" placeholder={formData.country === "CO" ? "055450" : "33101"} className="w-full bg-[#FFFDFE] border border-[#FAD1E6] rounded-xl px-4 py-3.5 outline-none focus:border-[#E85D9E] focus:ring-4 focus:ring-[#FAD1E6]/30 transition-all text-[#33182B] placeholder:text-[#7B5C73]/40 font-mono" />
                            </div>
                        </div>
                    </div>
                </section>
            </form>
        </div>

        {/* COLUMNA DERECHA: RESUMEN Y PAGO */}
        <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white border border-[#FAD1E6]/80 rounded-[24px] p-6 shadow-[0_15px_40px_-15px_rgba(232,93,158,0.15)] relative overflow-hidden">
                
                <h3 className="font-display font-bold text-xl mb-5 text-[#33182B]">Resumen del Pedido</h3>
                
                {/* Lista de Productos */}
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => {
                        const safeImageUrl = (item.image && typeof item.image === 'string') 
                            ? item.image.split(',')[0] 
                            : '';

                        return (
                            <div key={item.id} className="flex gap-4 p-3 bg-[#FFF6F9]/50 rounded-2xl border border-[#FAD1E6]/30">
                                <div className="relative w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-[#FAD1E6]/50 shadow-sm flex items-center justify-center">
                                    {safeImageUrl ? (
                                        <Image src={safeImageUrl} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <Package className="w-6 h-6 text-[#FAD1E6]" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <p className="text-sm font-bold text-[#33182B] truncate">{item.name}</p>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-xs text-[#7B5C73] font-medium">Cant: {item.quantity}</span>
                                        <span className="font-display font-bold text-[#E85D9E]">{formatCOP(item.price * item.quantity)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Subtotales */}
                <div className="border-t border-[#FAD1E6]/50 mt-5 pt-5 space-y-3">
                    <div className="flex justify-between text-sm text-[#7B5C73] font-medium">
                        <span>Subtotal</span>
                        <span>{formatCOP(cartSubtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#7B5C73] font-medium">
                        <span>Envío {shippingTotal === 0 && <span className="text-[#E85D9E] font-bold ml-1 text-xs uppercase tracking-wider bg-[#FAD1E6]/30 px-2 py-0.5 rounded-md">¡Gratis!</span>}</span>
                        <span>{formatCOP(shippingTotal)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-[#FAD1E6] text-[#33182B]">
                        <span>Total a Pagar</span>
                        <span className="text-2xl font-display text-[#E85D9E]">{formatCOP(cartTotal)}</span>
                    </div>
                </div>

                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col justify-center items-center rounded-[24px]">
                        <Loader2 className="w-8 h-8 animate-spin text-[#E85D9E] mb-3" />
                        <span className="font-bold text-[#E85D9E] text-sm uppercase tracking-widest">Procesando Magia...</span>
                    </div>
                )}

                {/* ========================================================= */}
                {/* 💳 PASARELA DE PAGO (MERCADO PAGO BRICKS) */}
                {/* ========================================================= */}
                <div className={`mt-8 ${isLoading ? "hidden" : "block"}`}>
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-5 h-5 text-[#E85D9E]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-[#E85D9E]">Pago Seguro con Mercado Pago</span>
                    </div>

                    <div className="min-h-[300px]">
                        {memoizedPaymentBrick}
                    </div>
                </div>
                {/* ========================================================= */}

                <div className="mt-5 flex justify-center">
                    <p className="flex items-center gap-1.5 text-[10px] font-medium text-[#7B5C73] uppercase tracking-wide">
                        <Heart className="w-3.5 h-3.5 text-[#E85D9E] fill-[#E85D9E]/20" /> Tu compra está protegida
                    </p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}