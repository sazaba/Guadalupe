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

// Formateador para los correos
const formatCOP = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
};

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, mpPaymentData: any) => {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

    // 1. Validaciones iniciales
    if (cartItems.length === 0) return { ok: false, message: "El carrito está vacío" };
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city) {
      return { ok: false, message: "Faltan datos de envío requeridos" };
    }
    if (!mpPaymentData || !mpPaymentData.token) return { ok: false, message: "Faltan los datos de pago" };
    if (!mpAccessToken) return { ok: false, message: "Error de configuración en el servidor (Mercado Pago)" };

    // 2. Buscar productos en la BD para evitar precios manipulados en el frontend
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

    // --- NUEVO CÁLCULO DE ENVÍO ADAPTADO A COLOMBIA (COP) ---
    // Ejemplo: Envío de $15.000 COP si la compra es menor a $200.000 COP. Gratis si es mayor.
    const totalShipping = (totalAmount > 0 && totalAmount < 200000) ? 15000 : 0;
    const finalTotalAmount = totalAmount + totalShipping; 

    // --- PASO 1: PROCESAR PAGO CON MERCADO PAGO ---
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
                issuer_id: mpPaymentData.issuer_id,
                payer: {
                    email: shippingData.email,
                    first_name: shippingData.name,
                    identification: mpPaymentData.payer?.identification,
                }
            },
            requestOptions: {
                idempotencyKey: crypto.randomUUID() // Evita cobros duplicados si hay reintentos de red
            }
        });

        // Verificamos si el pago fue aprobado
        if (paymentResponse.status !== 'approved') {
            console.error("Pago rechazado o pendiente:", paymentResponse.status_detail);
            return { ok: false, message: `El pago no pudo ser procesado. Razón: ${paymentResponse.status_detail}` };
        }
        
        paymentId = paymentResponse.id?.toString() || "";

    } catch (paymentError) {
        console.error("Error en Mercado Pago:", paymentError);
        return { ok: false, message: "Hubo un problema al comunicarse con el banco o pasarela." };
    }

    // --- PASO 2: GUARDAR ORDEN EN LA BASE DE DATOS ---
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
          transactionId: paymentId, // Guardamos el ID de MP por si hay reclamos
          items: {
            create: orderItemsData.map(({ name, ...rest }) => rest),
          },
        },
      });
    });

    // --- PASO 3: ENVIAR CORREO (Adaptado a COP) ---
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
          from: 'Exclusivos Guadalupe <pedidos@tu-dominio.com>', // Cambia esto por tu dominio verificado en Resend
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
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
                <h4 style="margin: 0 0 8px 0;">Dirección de Envío</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br>${shippingData.country === "CO" ? "Colombia" : "Estados Unidos"}</p>
              </div>
            </div>`
        });
      }
    } catch (emailError) { console.error("Error enviando correo:", emailError); }

    return { ok: true, order: order, message: "Pedido creado y pagado con éxito" };

  } catch (error: any) {
    console.error("Error crítico en el servidor:", error);
    return { ok: false, message: "Error interno del servidor" };
  }
};