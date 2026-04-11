import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductTemplate from "@/components/product/ProductTemplate";

// Definimos el tipo correcto para Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. GENERATE METADATA (SEO para la Boutique)
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug: slug },
    include: { variations: true } // <-- NUEVO: Incluimos las tallas para saber el stock total
  });

  if (!product) return { title: "Prenda no encontrada | Colección Mágica" };

  // Calculamos el stock total sumando el stock de todas sus tallas
  const totalStock = product.variations.reduce((acc, v) => acc + v.stock, 0);

  return {
    title: `${product.name} | Boutique Infantil | Vestidos para Princesas`,
    description: `Descubre ${product.name}. Moda exclusiva, cómoda y llena de magia para tu princesa. Calidad garantizada. ${totalStock > 0 ? '¡Disponible ahora!' : 'Agotado por el momento'}.`,
  };
}

// 2. PAGE COMPONENT
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { 
      slug: slug,
      isActive: true 
    },
    include: {
      variations: true // <-- NUEVO: Traemos las tallas y precios
    }
  });

  if (!product) {
    notFound();
  }

  // Serializamos los datos y adaptamos los fallbacks al tema de la boutique
  const serializedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description || "Una prenda mágica diseñada con amor para hacer brillar a tu pequeña en sus momentos más especiales. Telas suaves, acabados hermosos y detalles únicos.",
    category: product.category,
    images: product.images,
    color: product.color || "Color Mágico",
    material: product.material || "100% Calidad Premium - Hecho con Amor", 
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    // <-- NUEVO: Pasamos el arreglo de variaciones listo para que React lo use
    variations: product.variations.map(v => ({
        id: v.id,
        size: v.size,
        price: Number(v.price),
        stock: v.stock
    }))
  };

  return (
    <main className="relative min-h-screen bg-[#FFFDFE] selection:bg-[#FAD1E6] selection:text-[#E85D9E] overflow-hidden">
       
       {/* --- FONDO MÁGICO SUTIL --- */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 bg-[radial-gradient(#FAD1E6_1px,transparent_1px)] [background-size:30px_30px] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          
          {/* Brillo suave en las esquinas */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FAD1E6]/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
       </div>

       {/* Contenedor principal del producto */}
       <div className="relative z-10">
         {/* Ahora ProductTemplate recibirá todo el objeto, incluyendo las tallas */}
         <ProductTemplate product={serializedProduct} />
       </div>
       
    </main>
  );
}