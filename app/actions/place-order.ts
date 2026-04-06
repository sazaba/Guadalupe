'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';
import { Resend } from 'resend';
import { MercadoPagoConfig, Payment } from 'mercadopago';

type ShippingData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;      
  postalCode: string; 
  country: string;
};

type CartItem = {
  productId: string;
  quantity: number;
};

// Tipado estricto para Mercado Pago y Vercel
type MPPaymentData = {
  token: string;
  installments: number;
  payment_method_id: string;
  issuer_id?: string | number; // <-- Corrección del error rojo de TypeScript
  payer?: {
    identification?: {
      type: string;
      number: string;
    };
  };
};

const formatCOP = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
};

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, mpPaymentData: MPPaymentData) => {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    if (cartItems.length === 0) return { ok: false, message: "El carrito está vacío" };
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city) {
      return { ok: false, message: "Faltan datos de envío requeridos" };
    }
    if (!mpPaymentData || !mpPaymentData.token) return { ok: false, message: "Faltan los datos de pago" };
    if (!mpAccessToken) return { ok: false, message: "Error de configuración en el servidor" };

    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0;       
    const orderItemsData: any[] = [];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Producto no encontrado: ${item.productId}`);

      const price = Number(dbProduct.price);
      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price,
        name: dbProduct.name 
      });
    }

    // Envío en $0 para tu prueba de $1.000 COP
    const totalShipping = (totalAmount > 0 && totalAmount < 200000) ? 0 : 0; 
    const finalTotalAmount = totalAmount + totalShipping; 

    let paymentId = "";
    try {
        const client = new MercadoPagoConfig({ accessToken: mpAccessToken, options: { timeout: 10000 } });
        const payment = new Payment(client);

        const paymentResponse = await payment.create({
            body: {
                transaction_amount: finalTotalAmount,
                token: mpPaymentData.token,
                description: `Compra en Exclusivos Guadalupe - ${shippingData.name}`,
                installments: mpPaymentData.installments,
                payment_method_id: mpPaymentData.payment_method_id,
                // Convertimos el issuer_id a número explícitamente
                issuer_id: mpPaymentData.issuer_id ? Number(mpPaymentData.issuer_id) : undefined,
                payer: {
                    email: shippingData.email,
                    first_name: shippingData.name,
                    identification: mpPaymentData.payer?.identification,
                }
            },
            requestOptions: {
                idempotencyKey: crypto.randomUUID() 
            }
        });

        if (paymentResponse.status !== 'approved') {
            console.error("Pago rechazado o pendiente:", paymentResponse.status_detail);
            return { ok: false, message: `El pago no pudo ser procesado. Razón: ${paymentResponse.status_detail}` };
        }
        
        paymentId = paymentResponse.id?.toString() || "";

    } catch (paymentError) {
        console.error("Error en Mercado Pago:", paymentError);
        return { ok: false, message: "Hubo un problema al comunicarse con el banco o pasarela." };
    }

    const order = await prisma.$transaction(async (tx) => {
      return await tx.order.create({
        data: {
          customerName: shippingData.name,
          customerEmail: shippingData.email,
          customerPhone: shippingData.phone,
          addressLine1: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          postalCode: shippingData.postalCode, 
          country: shippingData.country === "CO" ? "Colombia" : "United States",            
          total: finalTotalAmount, 
          status: 'PAID', 
          isPaid: true,
          // AQUÍ ESTÁ LA MAGIA: Usamos el campo que sí existe en tu base de datos
          stripePaymentId: paymentId, 
          items: {
            create: orderItemsData.map(({ name, ...rest }) => rest),
          },
        },
      });
    });

    try {
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);
        const itemsHtml = orderItemsData.map(item => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${item.name} (x${item.quantity})</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: bold;">${formatCOP(item.price * item.quantity)}</td>
          </tr>
        `).join('');

        await resend.emails.send({
          // RECUERDA: Si tienes un dominio verificado en Resend ponlo aquí
          from: 'Exclusivos Guadalupe <onboarding@resend.dev>', 
          to: shippingData.email,
          subject: `¡Pedido Confirmado! #${order.id.slice(0, 8)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h1 style="color: #111827; text-align: center; font-size: 24px;">Exclusivos Guadalupe</h1>
              <div style="text-align: center; background-color: #ecfdf5; color: #065f46; padding: 8px; border-radius: 6px; font-weight: bold; margin-bottom: 20px;">Pago Exitoso</div>
              <p>Hola <strong>${shippingData.name}</strong>, ¡gracias por tu compra!</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Envío</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #6b7280; font-weight: bold;">${totalShipping === 0 ? 'Gratis' : formatCOP(totalShipping)}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; text-align: right; font-weight: bold;">Total Pagado:</td>
                  <td style="padding: 16px 0; text-align: right; color: #10b981; font-size: 18px; font-weight: bold;">${formatCOP(finalTotalAmount)}</td> </tr>
              </table>
            </div>`
        });
      }
    } catch (emailError) { console.error("Error enviando correo:", emailError); }

    return { ok: true, order: order, message: "Pedido creado y pagado con éxito" };

  } catch (error: unknown) {
    console.error("Error crítico en el servidor:", error);
    return { ok: false, message: "Error interno del servidor" };
  }
};