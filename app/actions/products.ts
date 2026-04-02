"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- 1. CREAR PRODUCTO ---
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const stock = formData.get("stock") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const purity = formData.get("purity") as string;
    
    // Convertir el checkbox a booleano (si no está marcado, será null/undefined, por lo que evalúa a false)
    const isFeatured = formData.get("isFeatured") === "true";
    
    // Generar Slug automático
    const slug = name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now().toString().slice(-4);

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        images: imageUrl,
        purity,
        isActive: true,
        isFeatured, // <--- CAMPO GUARDADO AQUÍ
      },
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Product created successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database error. Could not create product." };
  }
}

// --- 2. ELIMINAR PRODUCTO ---
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    return { success: true, message: "Product deleted successfully." };
  } catch (error) {
    return { success: false, message: "Error deleting product." };
  }
}

// --- 3. ACTUALIZAR ESTADO ---
export async function toggleProductStatus(id: string, currentStatus: boolean) {
    try {
        await prisma.product.update({
            where: { id },
            data: { isActive: !currentStatus }
        });
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        return { success: false };
    }
}

// --- 4. ACTUALIZAR PRODUCTO ---
export async function updateProduct(id: string, formData: FormData) {
  try {
    // Convertir el checkbox a booleano
    const isFeatured = formData.get("isFeatured") === "true";

    const data: any = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      purity: formData.get("purity") as string,
      images: formData.get("imageUrl") as string,
      isFeatured, // <--- CAMPO ACTUALIZADO AQUÍ
    };

    await prisma.product.update({
      where: { id },
      data: data,
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Product updated successfully." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating product." };
  }
}