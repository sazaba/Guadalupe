"use client";

import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import { Plus } from "lucide-react";

export default function ProductManager({ products }: { products: any[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const handleCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
         <h2 className="text-2xl font-bold text-[var(--text-main)] flex items-center gap-2">
            Boutique Collection
            <span className="text-xs font-normal text-pink-500 bg-pink-100 px-2 py-1 rounded-full">{products.length} Items</span>
         </h2>
         
         <button 
            onClick={handleCreate}
            className="bg-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-pink-600 transition-all flex items-center gap-2 shadow-lg shadow-pink-200"
         >
            <Plus className="w-5 h-5" />
            Add New Item
         </button>
      </div>

      <ProductList products={products} onEdit={handleEdit} />

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center sm:p-6">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setModalOpen(false)}
          />
          <div className="relative z-10 w-full h-full sm:h-auto sm:max-w-4xl animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300">
             <ProductForm 
                onClose={() => setModalOpen(false)} 
                initialData={editingProduct} 
             />
          </div>
        </div>
      )}
    </>
  );
}