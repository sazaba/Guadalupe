import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductTemplate from "@/components/product/ProductTemplate";

// Definimos el tipo correcto para Next.js 15
type Props = {
  params: Promise<{ slug: string }>;
};

// 1. GENERATE METADATA (Corregido: params es Promise)
export async function generateMetadata({ params }: Props) {
  // AWAIT OBLIGATORIO AQUÍ
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug: slug },
  });

  if (!product) return { title: "Compound Not Found" };

  return {
    title: `Buy ${product.name} | Research Grade | Transcendent Labs`,
    description: `High purity ${product.name} for laboratory research. HPLC verified. ${product.stock > 0 ? 'In Stock' : 'Out of Stock'}.`,
  };
}

// 2. PAGE COMPONENT (Corregido: params es Promise)
export default async function ProductPage({ params }: Props) {
  // AWAIT OBLIGATORIO AQUÍ TAMBIÉN
  const { slug } = await params;

  const product = await prisma.product.findFirst({
    where: { 
      slug: slug,
      isActive: true 
    },
  });

  if (!product) {
    notFound();
  }

  // Serializamos los datos
  const serializedProduct = {
    ...product,
    price: Number(product.price),
    purity: product.purity || "99% HPLC",
    description: product.description || "Research grade compound validated for laboratory use."
  };

  return (
    <main className="min-h-screen bg-[var(--bg-page)] selection:bg-[var(--color-brand-primary)] selection:text-white">
       <ProductTemplate product={serializedProduct} />
    </main>
  );
}