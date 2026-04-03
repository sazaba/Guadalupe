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
        title: 'Remove from Boutique?',
        text: "This beautiful item will be removed permanently.",
        icon: 'warning',
        showCancelButton: true,
        background: 'var(--bg-page)',
        color: 'var(--text-main)',
        confirmButtonColor: '#f472b6', // pink-400
        cancelButtonColor: 'var(--text-muted)',
        confirmButtonText: 'Yes, remove it'
    });

    if (result.isConfirmed) {
        const response = await deleteProduct(id);
        if (response.success) {
            Swal.fire({
                title: 'Removed!',
                text: 'Item removed from collection.',
                icon: 'success',
                background: 'var(--bg-page)',
                color: 'var(--text-main)',
                confirmButtonColor: '#f472b6',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            Swal.fire('Error', 'Could not remove item.', 'error');
        }
    }
  };

  if (products.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-pink-200 rounded-2xl text-[var(--text-muted)] mt-8 bg-pink-50/30">
              <Sparkles className="w-12 h-12 mb-4 text-pink-300 opacity-70" />
              <p>No magical items found in the boutique yet.</p>
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 pb-20">
      {products.map((product) => (
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
                    <div className="absolute top-3 left-3 bg-pink-500/10 backdrop-blur-md p-1.5 rounded-lg border border-pink-200 shadow-sm z-20 text-pink-500" title="Featured Item">
                        <Star className="w-4 h-4 fill-current" />
                    </div>
                )}

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-pink-600 uppercase border border-pink-100 shadow-sm z-20">
                    {product.category}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col bg-[var(--bg-page)]">
                <div className="flex justify-between items-start mb-2 gap-4">
                    <h4 className="font-bold text-[var(--text-main)] text-base leading-tight line-clamp-2">{product.name}</h4>
                    <span className="text-pink-500 font-bold whitespace-nowrap">${Number(product.price).toFixed(2)}</span>
                </div>
                
                <p className="text-[11px] text-[var(--text-muted)] mb-4 truncate opacity-80">
                    {product.size ? `Sizes: ${product.size}` : "One Size"}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-pink-50">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <ShoppingBag className="w-4 h-4 text-pink-300" />
                        <span className={product.stock < 3 ? "text-red-400 font-bold" : ""}>
                            {product.stock} in stock
                        </span>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            onClick={() => onEdit(product)}
                            className="p-2 text-[var(--text-muted)] hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors" 
                            title="Edit Item"
                        >
                            <Edit className="w-4 h-4" />
                        </button>
                        
                        <button 
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400/70 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Remove"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}