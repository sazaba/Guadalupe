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
    
    // Nuevos campos de la Boutique
    const size = formData.get("size") as string;
    const color = formData.get("color") as string;
    const material = formData.get("material") as string;
    
    // Convertir el checkbox a booleano
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
        size,       // <--- AGREGADO
        color,      // <--- AGREGADO
        material,   // <--- AGREGADO
        isActive: true,
        isFeatured, 
      },
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Item added to the boutique successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database error. Could not create item." };
  }
}

// --- 2. ELIMINAR PRODUCTO ---
export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    return { success: true, message: "Item removed successfully." };
  } catch (error) {
    return { success: false, message: "Error removing item." };
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
      images: formData.get("imageUrl") as string,
      size: formData.get("size") as string,         // <--- AGREGADO
      color: formData.get("color") as string,       // <--- AGREGADO
      material: formData.get("material") as string, // <--- AGREGADO
      isFeatured, 
    };

    await prisma.product.update({
      where: { id },
      data: data,
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Boutique item updated successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error updating item." };
  }
}