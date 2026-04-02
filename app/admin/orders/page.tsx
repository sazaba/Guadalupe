import { prisma } from "@/lib/prisma";
import OrdersClient from "@/components/admin/orders/OrdersClient"; 

// Esto fuerza a que la página NO se guarde en caché (siempre muestra datos frescos)
export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  
  // 1. Fetch de la base de datos
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc' // Las más recientes primero
    },
    include: {
      // Traemos los items y los datos del producto
      items: {
        include: {
          product: {
            select: {
              name: true,
              images: true
            }
          }
        }
      }
    }
  });

  // 2. Serialización (Limpieza de datos)
  const serializedOrders = orders.map((order) => ({
    id: order.id,
    total: Number(order.total),
    status: order.status,
    createdAt: order.createdAt,
    
    // AQUÍ ESTÁ EL CAMBIO:
    // Mapeamos los datos planos de la BD a un objeto 'customer' ordenado
    customer: {
      name: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.addressLine1,
      city: order.city,
      state: order.state || "",
      postalCode: order.postalCode,
      country: order.country
    },
    
    itemsCount: order.items.length,
    
    // Mapeamos los items
    items: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: Number(item.price), 
      product: {
        name: item.product.name,
        images: item.product.images
      }
    }))
  }));

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-main)] p-4 md:p-8 pb-20">
      
      {/* Header del Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              Order Management
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Global overview of research transactions.
            </p>
        </div>
      </div>

      {/* Renderizamos el Cliente con los datos preparados */}
      <OrdersClient initialOrders={serializedOrders} />
      
    </div>
  );
}