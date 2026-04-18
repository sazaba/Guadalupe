'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCoupons() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return { ok: true, data: coupons };
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return { ok: false, message: "Error al obtener los cupones" };
  }
}

export async function createCoupon(code: string, discountPercentage: number) {
  try {
    // Forzamos mayúsculas y quitamos espacios por seguridad
    const cleanCode = code.toUpperCase().trim();

    if (discountPercentage <= 0 || discountPercentage > 100) {
      return { ok: false, message: "El porcentaje debe estar entre 1 y 100" };
    }

    const existing = await prisma.coupon.findUnique({ where: { code: cleanCode } });
    if (existing) {
      return { ok: false, message: "Este código de cupón ya existe" };
    }

    await prisma.coupon.create({
      data: {
        code: cleanCode,
        discountPercentage,
        isActive: true,
      }
    });

    revalidatePath('/admin/coupons');
    return { ok: true, message: "Cupón creado exitosamente" };
  } catch (error) {
    console.error("Error creating coupon:", error);
    return { ok: false, message: "Error interno al crear el cupón" };
  }
}

export async function updateCouponStatus(id: string, isActive: boolean) {
  try {
    await prisma.coupon.update({
      where: { id },
      data: { isActive }
    });
    
    revalidatePath('/admin/coupons');
    return { ok: true };
  } catch (error) {
    console.error("Error updating coupon:", error);
    return { ok: false, message: "Error al actualizar el estado" };
  }
}

export async function deleteCoupon(id: string) {
  try {
    // Al borrar, no afectamos las órdenes pasadas porque Prisma tiene configurado OnDelete Set Null (por defecto o como lo configuramos en SQL)
    await prisma.coupon.delete({ where: { id } });
    
    revalidatePath('/admin/coupons');
    return { ok: true };
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return { ok: false, message: "Error al eliminar el cupón" };
  }
}

// Esta es la función que usaremos en el Checkout del cliente
export async function validateCoupon(code: string) {
  try {
    const cleanCode = code.toUpperCase().trim();
    const coupon = await prisma.coupon.findUnique({
      where: { code: cleanCode }
    });

    if (!coupon) return { ok: false, message: "Cupón no encontrado" };
    if (!coupon.isActive) return { ok: false, message: "Este cupón ya no está activo" };

    return { 
      ok: true, 
      data: {
        id: coupon.id,
        code: coupon.code,
        discountPercentage: Number(coupon.discountPercentage)
      } 
    };
  } catch (error) {
    console.error("Error validating coupon:", error);
    return { ok: false, message: "Error al validar el cupón" };
  }
}