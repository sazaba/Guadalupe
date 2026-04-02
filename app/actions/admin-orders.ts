'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED') {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
    revalidatePath('/admin/orders'); // Actualiza la vista sin recargar
    return { ok: true, message: "Estado actualizado" };
  } catch (error) {
    return { ok: false, message: "Error al actualizar estado" };
  }
}

export async function deleteOrder(orderId: string) {
  try {
    // Primero borramos los items de la orden (por integridad referencial)
    await prisma.orderItem.deleteMany({
      where: { orderId: orderId }
    });

    // Luego borramos la orden
    await prisma.order.delete({
      where: { id: orderId }
    });
    
    revalidatePath('/admin/orders');
    return { ok: true, message: "Orden eliminada" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al eliminar orden" };
  }
}