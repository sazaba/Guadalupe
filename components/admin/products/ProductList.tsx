"use client";
import { deleteProduct } from "@/app/actions/products";
import { Trash2, Edit, ShoppingBag, Star, Sparkles } from "lucide-react"; 
import Image from "next/image";
import Swal from "sweetalert2";

interface ProductListProps {
    products: any[];
    onEdit: (product: any) => void;
}

export default function ProductList({ products, onEdit }: ProductListProps) {
  
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
        title: '¿Eliminar de la Boutique?',
        text: "Esta hermosa prenda será eliminada permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        background: 'var(--bg-page)',
        color: 'var(--text-main)',
        confirmButtonColor: '#f472b6',
        cancelButtonColor: 'var(--text-muted)',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        const response = await deleteProduct(id);
        if (response.success) {
            Swal.fire({
                title: '¡Eliminado!',
                text: 'Prenda eliminada de la colección.',
                icon: 'success',
                background: 'var(--bg-page)',
                color: 'var(--text-main)',
                confirmButtonColor: '#f472b6',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: 'Error', 
                text: 'No se pudo eliminar la prenda.', 
                icon: 'error',
                background: 'var(--bg-page)',
                color: 'var(--text-main)',
                confirmButtonColor: '#f472b6'
            });
        }
    }
  };

  if (products.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-pink-200 rounded-2xl text-[var(--text-muted)] mt-8 bg-pink-50/30">
              <Sparkles className="w-12 h-12 mb-4 text-pink-300 opacity-70" />
              <p>Aún no hay prendas mágicas en la boutique.</p>
          </div>
      );
  }

  // Helper para formatear en Pesos Colombianos
  const formatCOP = (price: number) => {
      return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          maximumFractionDigits: 0
      }).format(price);
  };

  // Helper para mostrar nombres bonitos en las categorías
  const getCategoryLabel = (cat: string) => {
      const labels: Record<string, string> = {
          "nueva-coleccion": "Nueva Colección",
          "vestidos": "Vestidos",
          "accesorios": "Accesorios",
          "zapatos": "Zapatos",
          "sport": "Sport"
      };
      return labels[cat] || cat;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-20">
      {products.map((product) => {
        // --- LÓGICA DE VARIACIONES (TALLAS, PRECIO, STOCK) ---
        const variations = product.variations || [];
        
        // 1. Stock total (suma del stock de todas las tallas)
        const totalStock = variations.reduce((acc: number, curr: any) => acc + Number(curr.stock), 0);
        
        // 2. Tallas disponibles (unidas por comas)
        const availableSizes = variations.map((v: any) => v.size).join(", ");
        
        // 3. Precio base (el más bajo de las variaciones para mostrar "Desde $...")
        const lowestPrice = variations.length > 0 
            ? Math.min(...variations.map((v: any) => Number(v.price))) 
            : 0;
            
        // Validamos si hay precios diferentes para poner la palabra "Desde"
        const hasMultiplePrices = variations.length > 1 && !variations.every((v: any) => Number(v.price) === lowestPrice);

        return (
            <div key={product.id} className="group bg-[var(--bg-page)] border border-pink-100 rounded-2xl overflow-hidden hover:border-pink-300 hover:shadow-lg hover:shadow-pink-100 transition-all duration-300 flex flex-col">
                
                <div className="relative h-64 w-full bg-pink-50/30 border-b border-pink-100 p-4 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative w-full h-full z-10">
                        <Image 
                            src={product.images} 
                            alt={product.name} 
                            fill 
                            className="object-cover drop-shadow-sm group-hover:scale-105 transition-transform duration-700" 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    
                    {product.isFeatured && (
                        <div className="absolute top-3 left-3 bg-pink-500/10 backdrop-blur-md p-1.5 rounded-lg border border-pink-200 shadow-sm z-20 text-pink-500" title="Prenda Destacada">
                            <Star className="w-4 h-4 fill-current" />
                        </div>
                    )}

                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-pink-600 uppercase border border-pink-100 shadow-sm z-20">
                        {getCategoryLabel(product.category)}
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col bg-[var(--bg-page)]">
                    <div className="flex justify-between items-start mb-2 gap-4">
                        <h4 className="font-bold text-[var(--text-main)] text-base leading-tight line-clamp-2">{product.name}</h4>
                        <div className="flex flex-col items-end">
                            {hasMultiplePrices && <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Desde</span>}
                            <span className="text-pink-500 font-bold whitespace-nowrap">{formatCOP(lowestPrice)}</span>
                        </div>
                    </div>
                    
                    <p className="text-[11px] text-[var(--text-muted)] mb-4 truncate opacity-80">
                        {availableSizes ? `Tallas: ${availableSizes}` : "Sin tallas configuradas"}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-pink-50">
                        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                            <ShoppingBag className="w-4 h-4 text-pink-300" />
                            <span className={totalStock < 3 ? "text-red-400 font-bold" : ""}>
                                {totalStock} disp. en total
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button 
                                onClick={() => onEdit(product)}
                                className="p-2 text-[var(--text-muted)] hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors" 
                                title="Editar Prenda"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            
                            <button 
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-red-400/70 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                                title="Eliminar"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
      })}
    </div>
  );
}