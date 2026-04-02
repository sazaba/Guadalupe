"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Save, ImagePlus, X, FlaskConical, Info } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

interface ProductFormProps {
  onClose: () => void;
  initialData?: any;
}

export default function ProductForm({ onClose, initialData }: ProductFormProps) {
  // ... (tu lógica de estado y handleSubmit se mantiene igual)
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
            title: initialData ? 'Database Updated' : 'Protocol Initiated',
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
            title: 'Error', 
            text: result.message, 
            background: 'var(--bg-page)', 
            color: 'var(--text-main)' 
        });
    }
  };

  return (
    // 1. CAMBIO AQUÍ: max-h-[90vh] asegura que el modal no sea más alto que la pantalla
    // flex y flex-col aseguran que el header, el scroll y el footer se distribuyan bien.
    <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] bg-[var(--bg-page)] border-0 sm:border sm:border-[var(--glass-border)] rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      
      {/* HEADER (Queda igual, es shrink-0) */}
      <div className="flex items-center justify-between p-5 border-b border-[var(--glass-border)] bg-[var(--bg-page)] shrink-0">
        <h3 className="text-lg md:text-xl font-display font-bold text-[var(--text-main)] flex items-center gap-3">
          <FlaskConical className="text-[var(--color-brand-primary)]" />
          {initialData ? "Edit Compound" : "New Compound"}
        </h3>
        
        <button 
            onClick={onClose} 
            className="p-3 -mr-2 text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-400 rounded-full transition-colors active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* 2. CAMBIO AQUÍ: flex-1 permite que tome el espacio sobrante. 
          overflow-y-auto crea el scroll interno. Ajusté el padding inferior (pb-6 en lugar de pb-32)
          porque el footer ya no es 'sticky', sino que vive fuera de este div scrollable. */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[var(--bg-page)]">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          {/* ... Todo tu formulario (campos, grid, imagen) queda EXACTAMENTE igual ... */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Product Name</label>
              <input name="name" defaultValue={initialData?.name} required className="input-scientific" placeholder="e.g. BPC-157" />
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] mt-1 ml-1 italic">
                 <Info className="w-3 h-3 text-amber-500" />
                 <span>Do not add "Out of Stock" to the name. The system handles this via the stock field.</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Category</label>
              <select name="category" defaultValue={initialData?.category} className="input-scientific">
                <option value="peptides">Research Peptides</option>
                <option value="sarms">SARMs</option>
                <option value="nootropics">Nootropics</option>
                <option value="supplements">Supplements</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Price (USD)</label>
              <input name="price" type="number" step="0.01" defaultValue={Number(initialData?.price || 0)} required className="input-scientific" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Current Stock</label>
              <input name="stock" type="number" defaultValue={initialData?.stock} required className="input-scientific" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Purity Analysis</label>
              <input name="purity" defaultValue={initialData?.purity} className="input-scientific" placeholder=">99% HPLC" />
            </div>

            <div className="space-y-2 md:col-span-2 flex items-center gap-3 bg-[var(--text-muted)]/5 p-4 rounded-xl border border-[var(--glass-border)] transition-colors hover:bg-[var(--text-muted)]/10">
              <input 
                type="checkbox" 
                name="isFeatured" 
                id="isFeatured"
                defaultChecked={initialData?.isFeatured} 
                value="true"
                className="w-5 h-5 accent-[var(--color-brand-primary)] cursor-pointer rounded border-[var(--glass-border)]" 
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-[var(--text-main)] cursor-pointer select-none">
                Highlight Compound (Show first in Product Showcase)
              </label>
            </div>
          </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Scientific Description</label>
                <textarea name="description" defaultValue={initialData?.description} rows={6} required className="input-scientific resize-none" />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase">Visual Documentation</label>
                
                <div className="border-2 border-dashed border-[var(--glass-border)] rounded-xl p-4 flex justify-center bg-[var(--text-muted)]/5 hover:bg-[var(--text-muted)]/10 transition-colors">
                    {imageUrl ? (
                        <div className="relative w-full h-56 md:w-64 md:h-64">
                            <Image src={imageUrl} alt="Product" fill className="object-contain rounded-lg" />
                            <button type="button" onClick={() => setImageUrl("")} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:scale-110 transition-transform"><X className="w-5 h-5"/></button>
                        </div>
                    ) : (
                        <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
                            onSuccess={(result: any) => setImageUrl(result.info.secure_url)}
                            options={{
                                styles: {
                                    palette: {
                                        window: "#ffffff",
                                        sourceBg: "#f4f4f5",
                                        windowBorder: "#90a0b3",
                                        tabIcon: "#0078ff",
                                        inactiveTabIcon: "#69778a",
                                        menuIcons: "#0078ff",
                                        link: "#0078ff",
                                        action: "#339933",
                                        inProgress: "#0078ff",
                                        complete: "#339933",
                                        error: "#cc0000",
                                        textDark: "#000000",
                                        textLight: "#ffffff"
                                    },
                                }
                            }}
                        >
                            {({ open }) => (
                                <button type="button" onClick={() => open()} className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--color-brand-primary)] py-8 transition-colors w-full">
                                    <ImagePlus className="w-10 h-10 opacity-50" /> 
                                    <span className="text-sm font-bold">Tap to Upload Image</span>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                </div>
            </div>
        </form>
      </div>

      {/* 3. CAMBIO AQUÍ: Quitamos 'sticky bottom-0 z-20 pb-8 sm:pb-5' 
          Al hacer que este div sea hermano del div scrollable (y tener shrink-0), 
          siempre estará visible al final del modal, sin importar el scroll interno. */}
      <div className="flex justify-between sm:justify-end gap-3 p-5 border-t border-[var(--glass-border)] bg-[var(--bg-page)] shrink-0">
            <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-sm text-[var(--text-muted)] bg-[var(--glass-border)]/50 sm:bg-transparent hover:bg-[var(--glass-border)] transition-colors w-full sm:w-auto">
                Cancel
            </button>
            <button 
                onClick={(e) => {
                    const form = e.currentTarget.closest('.relative')?.querySelector('form');
                    form?.requestSubmit();
                }}
                disabled={loading} 
                className="bg-[var(--text-main)] text-[var(--bg-page)] px-8 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--glass-border)] w-full sm:w-auto"
            >
                {loading ? "Processing..." : <><Save className="w-4 h-4" /> {initialData ? "Save" : "Create"}</>}
            </button>
      </div>

      <style jsx global>{`
        .input-scientific {
            width: 100%;
            background-color: var(--bg-page);
            border: 1px solid var(--glass-border);
            border-radius: 0.75rem;
            padding: 0.875rem 1rem;
            color: var(--text-main);
            outline: none;
            font-size: 1rem;
            transition: all 0.2s;
        }
        .input-scientific:focus {
            border-color: var(--color-brand-primary);
            box-shadow: 0 0 0 1px var(--color-brand-primary);
        }
      `}</style>
    </div>
  );
}