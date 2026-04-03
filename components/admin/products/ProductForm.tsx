"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Save, ImagePlus, X, Crown, Info } from "lucide-react"; // <-- Cambiado a Crown
import Image from "next/image";
import Swal from "sweetalert2";

interface ProductFormProps {
  onClose: () => void;
  initialData?: any;
}

export default function ProductForm({ onClose, initialData }: ProductFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData?.images) {
      setImageUrl(initialData.images);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    if (!imageUrl) {
        Swal.fire({ 
            icon: 'warning', 
            title: 'Missing Image', 
            text: 'Every princess dress needs a beautiful picture!',
            background: 'var(--bg-page)', 
            color: 'var(--text-main)' 
        });
        setLoading(false);
        return;
    }
    formData.append("imageUrl", imageUrl);

    let result;
    if (initialData) {
      result = await updateProduct(initialData.id, formData);
    } else {
      result = await createProduct(formData);
    }

    setLoading(false);

    if (result.success) {
        Swal.fire({
            icon: 'success',
            title: initialData ? 'Dress Updated' : 'Added to Collection!',
            background: 'var(--bg-page)', 
            color: 'var(--text-main)', 
            confirmButtonColor: 'var(--color-brand-primary)',
            timer: 1500, 
            showConfirmButton: false
        });
        onClose();
    } else {
        Swal.fire({ 
            icon: 'error', 
            title: 'Oops!', 
            text: result.message, 
            background: 'var(--bg-page)', 
            color: 'var(--text-main)' 
        });
    }
  };

  return (
    <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] bg-[var(--bg-page)] border-0 sm:border sm:border-pink-200/30 rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-pink-100/20 bg-[var(--bg-page)] shrink-0">
        <h3 className="text-lg md:text-xl font-display font-bold text-[var(--text-main)] flex items-center gap-3">
          <Crown className="text-pink-400" />
          {initialData ? "Edit Boutique Item" : "New Boutique Item"}
        </h3>
        
        <button 
            onClick={onClose} 
            className="p-3 -mr-2 text-[var(--text-muted)] hover:bg-pink-500/10 hover:text-pink-400 rounded-full transition-colors active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[var(--bg-page)]">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Item Name</label>
              <input name="name" defaultValue={initialData?.name} required className="input-boutique" placeholder="e.g. Sparkle Princess Dress" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Category</label>
              <select name="category" defaultValue={initialData?.category} className="input-boutique">
                <option value="dresses">Dresses & Gowns</option>
                <option value="accessories">Accessories & Tiaras</option>
                <option value="shoes">Magical Shoes</option>
                <option value="sets">Two-Piece Sets</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Price (USD)</label>
              <input name="price" type="number" step="0.01" defaultValue={Number(initialData?.price || 0)} required className="input-boutique" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Current Stock</label>
              <input name="stock" type="number" defaultValue={initialData?.stock} required className="input-boutique" />
            </div>

            {/* NUEVOS CAMPOS: Talla, Color, Material */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Available Sizes</label>
              <input name="size" defaultValue={initialData?.size} className="input-boutique" placeholder="e.g. 2T, 3T, 4T, 5T" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Color Palette</label>
              <input name="color" defaultValue={initialData?.color} className="input-boutique" placeholder="e.g. Pastel Pink & Gold" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Materials</label>
              <input name="material" defaultValue={initialData?.material} className="input-boutique" placeholder="e.g. 100% Cotton Lining, Tulle Outer" />
            </div>

            <div className="space-y-2 md:col-span-2 flex items-center gap-3 bg-pink-50/50 p-4 rounded-xl border border-pink-100 transition-colors hover:bg-pink-50">
              <input 
                type="checkbox" 
                name="isFeatured" 
                id="isFeatured"
                defaultChecked={initialData?.isFeatured} 
                value="true"
                className="w-5 h-5 accent-pink-400 cursor-pointer rounded border-pink-200" 
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-[var(--text-main)] cursor-pointer select-none">
                Highlight this piece (Show first in the Boutique Showcase)
              </label>
            </div>
          </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Magical Description</label>
                <textarea name="description" defaultValue={initialData?.description} rows={5} required className="input-boutique resize-none" placeholder="Tell the story of this beautiful dress..." />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Product Photos</label>
                
                <div className="border-2 border-dashed border-pink-200 rounded-xl p-4 flex justify-center bg-pink-50/30 hover:bg-pink-50/50 transition-colors">
                    {imageUrl ? (
                        <div className="relative w-full h-56 md:w-64 md:h-64">
                            <Image src={imageUrl} alt="Product" fill className="object-contain rounded-lg" />
                            <button type="button" onClick={() => setImageUrl("")} className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"><X className="w-5 h-5"/></button>
                        </div>
                    ) : (
                        <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
                            onSuccess={(result: any) => setImageUrl(result.info.secure_url)}
                        >
                            {({ open }) => (
                                <button type="button" onClick={() => open()} className="flex flex-col items-center gap-2 text-pink-400 hover:text-pink-500 py-8 transition-colors w-full">
                                    <ImagePlus className="w-10 h-10 opacity-70" /> 
                                    <span className="text-sm font-bold">Tap to Upload Photo</span>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                </div>
            </div>
        </form>
      </div>

      <div className="flex justify-between sm:justify-end gap-3 p-5 border-t border-pink-100/20 bg-[var(--bg-page)] shrink-0">
            <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-sm text-[var(--text-muted)] bg-[var(--glass-border)]/50 sm:bg-transparent hover:bg-pink-50 transition-colors w-full sm:w-auto">
                Cancel
            </button>
            <button 
                onClick={(e) => {
                    const form = e.currentTarget.closest('.relative')?.querySelector('form');
                    form?.requestSubmit();
                }}
                disabled={loading} 
                className="bg-pink-500 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-pink-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-200 w-full sm:w-auto"
            >
                {loading ? "Sprinkling Magic..." : <><Save className="w-4 h-4" /> {initialData ? "Save Changes" : "Add to Boutique"}</>}
            </button>
      </div>

      <style jsx global>{`
        .input-boutique {
            width: 100%;
            background-color: var(--bg-page);
            border: 1px solid #fbcfe8; /* pink-200 */
            border-radius: 0.75rem;
            padding: 0.875rem 1rem;
            color: var(--text-main);
            outline: none;
            font-size: 1rem;
            transition: all 0.2s;
        }
        .input-boutique:focus {
            border-color: #f472b6; /* pink-400 */
            box-shadow: 0 0 0 1px #f472b6;
        }
      `}</style>
    </div>
  );
}