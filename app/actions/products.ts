"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- 1. CREAR PRODUCTO ---
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    
    // CAMBIO: Extraer el JSON string de las imágenes y parsearlo
    const imagesString = formData.get("images") as string;
    const imagesArray = imagesString ? JSON.parse(imagesString) : [];
    
    const color = formData.get("color") as string;
    const material = formData.get("material") as string;
    const isFeatured = formData.get("isFeatured") === "true";
    
    const variationsString = formData.get("variations") as string;
    const variations = variationsString ? JSON.parse(variationsString) : [];
    
    const slug = name.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now().toString().slice(-4);

    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        category,
        images: imagesArray, // CAMBIO: Ahora pasamos el arreglo
        color,      
        material,   
        isActive: true,
        isFeatured, 
        variations: {
          create: variations.map((v: { size: string; price: number | string; stock: number | string }) => ({
            size: v.size,
            price: parseFloat(v.price.toString()),
            stock: parseInt(v.stock.toString())
          }))
        }
      },
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Item added to the boutique successfully!" };
  } catch (error) {
    console.error("Error creating product:", error);
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
    const isFeatured = formData.get("isFeatured") === "true";
    
    // CAMBIO: Extraer el JSON string de las imágenes y parsearlo
    const imagesString = formData.get("images") as string;
    const imagesArray = imagesString ? JSON.parse(imagesString) : [];
    
    const variationsString = formData.get("variations") as string;
    const variations = variationsString ? JSON.parse(variationsString) : [];

    await prisma.product.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        images: imagesArray, // CAMBIO: Ahora pasamos el arreglo
        color: formData.get("color") as string,       
        material: formData.get("material") as string, 
        isFeatured, 
        variations: {
          deleteMany: {}, 
          create: variations.map((v: { size: string; price: number | string; stock: number | string }) => ({
            size: v.size,
            price: parseFloat(v.price.toString()),
            stock: parseInt(v.stock.toString())
          }))
        }
      },
    });

    revalidatePath("/admin/products");
    return { success: true, message: "Boutique item updated successfully!" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Error updating item." };
  }
}