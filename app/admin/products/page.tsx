import ProductManager from "@/components/admin/products/ProductManager";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  // Obtenemos datos frescos del servidor
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header Estático */}
      <div className="border-b border-[var(--glass-border)] pb-6">
        <h1 className="text-4xl font-display font-black text-[var(--text-main)] tracking-tight">Product Management</h1>
        <p className="text-[var(--text-muted)] mt-2 max-w-xl">
            Create, monitor, and manage the laboratory's compound inventory via the centralized protocol interface.
        </p>
      </div>

      {/* Componente Orquestador (Lista + Modal) */}
      <ProductManager products={products} />
    </div>
  );
}