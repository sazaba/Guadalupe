'use server';

import { prisma } from '@/lib/prisma';
import crypto from 'node:crypto';
import { Resend } from 'resend';

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

export const placeOrder = async (cartItems: CartItem[], shippingData: ShippingData, paymentToken: string) => {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

    // 1. Validaciones iniciales
    if (cartItems.length === 0) return { ok: false, message: "Cart is empty" };
    if (!shippingData.email || !shippingData.address || !shippingData.name || !shippingData.city || !shippingData.state || !shippingData.postalCode) {
      return { ok: false, message: "Missing required shipping fields" };
    }
    if (!paymentToken) return { ok: false, message: "Payment token is missing" };

    // 2. Buscar productos y preparar datos para Square y DB
    const productIds = cartItems.map((item) => item.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isActive: true },
    });

    let totalAmount = 0;       // Subtotal de los productos
    const orderItemsData: any[] = [];
    const squareLineItems: any[] = [];

    for (const item of cartItems) {
      const dbProduct = dbProducts.find((p) => p.id === item.productId);
      if (!dbProduct) throw new Error(`Product not found: ${item.productId}`);

      const price = Number(dbProduct.price);
      totalAmount += price * item.quantity;

      orderItemsData.push({
        productId: dbProduct.id,
        quantity: item.quantity,
        price: price,
        name: dbProduct.name 
      });

      // Formato para que Pirate Ship lea los productos desde Square (Precio BASE)
      squareLineItems.push({
        name: dbProduct.name,
        quantity: item.quantity.toString(),
        base_price_money: {
          amount: Math.round(price * 100),
          currency: 'USD'
        }
      });
    }

    // --- NUEVO CÁLCULO DE ENVÍO: $9.95 si es menor a $300. Gratis si es $300 o más ---
    const totalShipping = (totalAmount > 0 && totalAmount < 300) ? 9.95 : 0;
    const finalTotalAmount = totalAmount + totalShipping; // Total real a cobrar

    // Agregamos el envío como un ítem extra en Square para que Pirate Ship lo detecte (solo si se cobra)
    if (totalShipping > 0) {
      squareLineItems.push({
        name: 'Flat Rate Shipping',
        quantity: '1',
        base_price_money: {
          amount: Math.round(totalShipping * 100),
          currency: 'USD'
        }
      });
    }

    // --- PASO 1: CREAR ORDEN Y PAGAR EN SQUARE (LIVE) ---
    let squareOrderId = "";
    try {
        // A. Creamos la Orden con los datos de envío (Fulfillment)
        const orderResponse = await fetch('https://connect.squareup.com/v2/orders', {
            method: 'POST',
            headers: {
                'Square-Version': '2024-01-18',
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    location_id: locationId,
                    line_items: squareLineItems, // Aquí ya va incluido el ítem de Shipping si aplica
                    fulfillments: [{
                        type: 'SHIPMENT',
                        shipment_details: {
                            recipient: {
                                display_name: shippingData.name,
                                address: {
                                    address_line_1: shippingData.address,
                                    locality: shippingData.city,
                                    administrative_district_level_1: shippingData.state,
                                    postal_code: shippingData.postalCode,
                                    country: shippingData.country 
                                }
                            }
                        }
                    }]
                },
                idempotency_key: crypto.randomUUID()
            })
        });

        const orderResult = await orderResponse.json();
        if (!orderResponse.ok) throw new Error("Square Order Creation Failed");
        squareOrderId = orderResult.order.id;

        // B. Realizamos el cobro vinculado a esa Orden
        const squarePaymentResponse = await fetch('https://connect.squareup.com/v2/payments', {
            method: 'POST',
            headers: {
                'Square-Version': '2024-01-18', 
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source_id: paymentToken,
                idempotency_key: crypto.randomUUID(),
                amount_money: { amount: Math.round(finalTotalAmount * 100), currency: 'USD' }, // Cobramos el Total Real
                location_id: locationId,
                order_id: squareOrderId
            })
        });

        const paymentData = await squarePaymentResponse.json();
        if (!squarePaymentResponse.ok || paymentData.errors) {
            return { ok: false, message: "Payment declined. Check address and zip code." };
        }
    } catch (paymentError) {
        console.error("Square Logic Error:", paymentError);
        return { ok: false, message: "Error communicating with payment provider." };
    }

    // --- PASO 2: GUARDAR EN TU BASE DE DATOS ---
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
          total: finalTotalAmount, // Guardamos el Total Real
          status: 'PAID', 
          isPaid: true,   
          items: {
            create: orderItemsData.map(({ name, ...rest }) => rest),
          },
        },
      });
    });

    // --- PASO 3: ENVIAR CORREO ---
    try {
      if (apiKey) {
        const resend = new Resend(apiKey);
        const itemsHtml = orderItemsData.map(item => `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${item.name} (x${item.quantity})</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #111827; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
          </tr>
        `).join('');

        await resend.emails.send({
          from: 'Transcendent Labs <orders@transcendent-labs.com>',
          to: shippingData.email,
          subject: `Order Confirmed #${order.id.slice(0, 8)}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h1 style="color: #111827; text-align: center; font-size: 24px;">Transcendent Labs</h1>
              <div style="text-align: center; background-color: #ecfdf5; color: #065f46; padding: 8px; border-radius: 6px; font-weight: bold; margin-bottom: 20px;">Payment Successful</div>
              <p>Hi <strong>${shippingData.name}</strong>, thank you for your purchase!</p>
              <table style="width: 100%; border-collapse: collapse;">
                ${itemsHtml}
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">Shipping & Handling</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #6b7280; font-weight: bold;">$${totalShipping.toFixed(2)}</td>
                </tr>
                <tr>
                  <td style="padding: 16px 0; text-align: right; font-weight: bold;">Total Paid:</td>
                  <td style="padding: 16px 0; text-align: right; color: #10b981; font-size: 18px; font-weight: bold;">$${finalTotalAmount.toFixed(2)}</td> </tr>
              </table>
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin: 20px 0; border: 1px solid #f3f4f6;">
                <h4 style="margin: 0 0 8px 0;">Shipping Address</h4>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.postalCode}<br>${shippingData.country === "CO" ? "Colombia" : "United States"}</p>
              </div>
              <p style="text-align: center; font-size: 13px; color: #6b7280; margin-top: 20px;">Questions? <a href="mailto:transcendent.labs2@gmail.com">transcendent.labs2@gmail.com</a></p>
            </div>`
        });
      }
    } catch (emailError) { console.error("Resend Error:", emailError); }

    return { ok: true, order: order, message: "Order placed successfully" };

  } catch (error: any) {
    console.error("Critical Error:", error);
    return { ok: false, message: "Internal server error" };
  }
};