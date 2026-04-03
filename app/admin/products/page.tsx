import ProductManager from "@/components/admin/products/ProductManager";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="border-b border-pink-100 pb-6">
        <h1 className="text-4xl font-display font-black text-[var(--text-main)] tracking-tight">
          Inventario de la Boutique
        </h1>
        <p className="text-[var(--text-muted)] mt-2 max-w-xl">
            Administra los hermosos vestidos, accesorios y colecciones mágicas en tu boutique de princesas.
        </p>
      </div>

      <ProductManager products={products} />
    </div>
  );
}