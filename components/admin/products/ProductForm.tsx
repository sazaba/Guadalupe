"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Save, ImagePlus, X, Crown, Plus } from "lucide-react"; 
import Image from "next/image";
import Swal from "sweetalert2";

interface ProductFormProps {
  onClose: () => void;
  initialData?: any;
}

export default function ProductForm({ onClose, initialData }: ProductFormProps) {
  // 1. CAMBIO: Estado para múltiples imágenes (arreglo en lugar de string)
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ESTADO PARA TALLAS: Iniciamos con las tallas existentes o una fila vacía
  const [variations, setVariations] = useState<{ size: string; price: string | number; stock: string | number }[]>(
    initialData?.variations && initialData.variations.length > 0
      ? initialData.variations
      : [{ size: "", price: "", stock: "" }]
  );

  // 2. CAMBIO: Efecto para cargar las imágenes iniciales
  useEffect(() => {
    if (initialData?.images) {
      // Prisma podría devolver un string JSON o ya un array parseado, manejamos ambos casos
      try {
        const loadedImages = typeof initialData.images === 'string' 
            ? JSON.parse(initialData.images) 
            : initialData.images;
        setImages(loadedImages || []);
      } catch (error) {
        console.error("Error parseando imágenes iniciales:", error);
        setImages([]);
      }
    }
  }, [initialData]);

  // --- Funciones para manejar las imágenes ---
  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // --- Funciones para manejar las variaciones ---
  const addVariation = () => {
    setVariations([...variations, { size: "", price: "", stock: "" }]);
  };

  const updateVariation = (index: number, field: string, value: string) => {
    const newVariations = [...variations];
    newVariations[index] = { ...newVariations[index], [field]: value };
    setVariations(newVariations);
  };

  const removeVariation = (index: number) => {
    setVariations(variations.filter((_, i) => i !== index));
  };
  // ----------------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // 3. CAMBIO: Validar que el arreglo no esté vacío
    if (images.length === 0) {
        Swal.fire({ 
            icon: 'warning', 
            title: 'Faltan las Imágenes', 
            text: '¡Cada prenda mágica necesita al menos una foto hermosa!',
            background: 'var(--bg-page)', 
            color: 'var(--text-main)',
            confirmButtonColor: '#f472b6'
        });
        setLoading(false);
        return;
    }

    // Validación: Asegurar que todas las tallas tengan datos
    const invalidVariations = variations.some(v => !v.size || v.price === "" || v.stock === "");
    if (invalidVariations) {
        Swal.fire({ 
            icon: 'warning', 
            title: 'Revisa las Tallas', 
            text: 'Por favor, asegúrate de que todas las tallas tengan precio y stock.',
            background: 'var(--bg-page)', 
            color: 'var(--text-main)',
            confirmButtonColor: '#f472b6'
        });
        setLoading(false);
        return;
    }

    // 4. CAMBIO: Enviar las imágenes como un JSON stringificado
    formData.append("images", JSON.stringify(images));
    // Convertir el array de tallas a JSON para enviarlo a la Server Action
    formData.append("variations", JSON.stringify(variations));

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
            title: initialData ? '¡Prenda Actualizada!' : '¡Agregada a la Colección!',
            background: 'var(--bg-page)', 
            color: 'var(--text-main)', 
            confirmButtonColor: '#f472b6',
            timer: 1500, 
            showConfirmButton: false
        });
        onClose();
    } else {
        Swal.fire({ 
            icon: 'error', 
            title: '¡Ups!', 
            text: result.message, 
            background: 'var(--bg-page)', 
            color: 'var(--text-main)',
            confirmButtonColor: '#f472b6'
        });
    }
  };

  return (
    <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] bg-[var(--bg-page)] border-0 sm:border sm:border-pink-200/30 rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between p-5 border-b border-pink-100/20 bg-[var(--bg-page)] shrink-0">
        <h3 className="text-lg md:text-xl font-display font-bold text-[var(--text-main)] flex items-center gap-3">
          <Crown className="text-pink-400" />
          {initialData ? "Editar Prenda" : "Nueva Prenda"}
        </h3>
        
        <button 
            onClick={onClose} 
            className="p-3 -mr-2 text-[var(--text-muted)] hover:bg-pink-500/10 hover:text-pink-400 rounded-full transition-colors active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 bg-[var(--bg-page)]">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Nombre de la Prenda</label>
              <input name="name" defaultValue={initialData?.name} required className="input-boutique" placeholder="ej. Vestido Princesa Destello" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Categoría</label>
              <select name="category" defaultValue={initialData?.category || "nueva-coleccion"} className="input-boutique cursor-pointer">
                <option value="nueva-coleccion">Nueva Colección</option>
                <option value="vestidos">Vestidos</option>
                <option value="accesorios">Accesorios</option>
                <option value="zapatos">Zapatos</option>
                <option value="sport">Sport</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Colores</label>
              <input name="color" defaultValue={initialData?.color} className="input-boutique" placeholder="ej. Rosa Pastel y Dorado" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Materiales</label>
              <input name="material" defaultValue={initialData?.material} className="input-boutique" placeholder="ej. 100% Algodón, Exterior de Tul" />
            </div>

            {/* SECCIÓN DINÁMICA DE TALLAS */}
            <div className="md:col-span-2 bg-pink-50/40 p-4 sm:p-5 rounded-2xl border border-pink-100">
                <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Tallas, Precios e Inventario</label>
                </div>
                
                <div className="space-y-4 sm:space-y-3">
                    {variations.map((variation, index) => (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_1.2fr_1fr_auto] gap-3 items-center relative p-3 sm:p-0 border border-pink-100 sm:border-none rounded-xl sm:rounded-none bg-white sm:bg-transparent shadow-sm sm:shadow-none">
                            
                            {/* Input de Talla */}
                            <div className="w-full">
                                <label className="text-[10px] sm:hidden font-bold text-pink-400 mb-1 block uppercase">Talla</label>
                                <input
                                    type="text"
                                    placeholder="ej. 4T, S, M"
                                    value={variation.size}
                                    onChange={(e) => updateVariation(index, "size", e.target.value)}
                                    required
                                    className="input-boutique !py-2 w-full text-center sm:text-left"
                                />
                            </div>

                            {/* Input de Precio */}
                            <div className="w-full">
                                <label className="text-[10px] sm:hidden font-bold text-pink-400 mb-1 block uppercase">Precio Unitario</label>
                                <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        value={variation.price}
                                        onChange={(e) => updateVariation(index, "price", e.target.value)}
                                        required
                                        className="input-boutique !py-2 !pl-7 !pr-3 w-full font-mono text-right"
                                    />
                                </div>
                            </div>

                            {/* Input de Stock */}
                            <div className="w-full">
                                <label className="text-[10px] sm:hidden font-bold text-pink-400 mb-1 block uppercase">Cant. Disponible</label>
                                <div className="relative w-full">
                                    <input
                                        type="number"
                                        placeholder="Unidades"
                                        value={variation.stock}
                                        onChange={(e) => updateVariation(index, "stock", e.target.value)}
                                        required
                                        className="input-boutique !py-2 !pr-8 w-full text-center"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-pink-300 font-bold uppercase pointer-events-none">unds</span>
                                </div>
                            </div>
                            
                            {/* Botón de Eliminar */}
                            <div className="absolute top-1 right-1 sm:static sm:top-auto sm:right-auto flex justify-end">
                                {variations.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeVariation(index)}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 sm:p-2 rounded-full transition-colors flex-shrink-0"
                                        title="Eliminar esta talla"
                                    >
                                        <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    onClick={addVariation}
                    className="mt-5 flex items-center gap-2 text-pink-500 font-bold text-sm hover:text-pink-600 transition-colors bg-white hover:bg-pink-50 px-5 py-2.5 rounded-xl shadow-sm border border-pink-200 w-full sm:w-fit justify-center active:scale-95"
                >
                    <Plus className="w-4 h-4" /> Agregar Nueva Talla
                </button>
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
                Destacar esta prenda (Mostrar primero en la vitrina)
              </label>
            </div>
          </div>

            <div className="space-y-2 mt-6">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">Descripción Mágica</label>
                <textarea name="description" defaultValue={initialData?.description} rows={4} required className="input-boutique resize-none leading-relaxed" placeholder="Cuenta la historia de esta hermosa prenda..." />
            </div>

            {/* 5. CAMBIO: Interfaz de Múltiples Imágenes */}
            <div className="space-y-2 mt-6">
                <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wide">
                    Fotos del Producto (Máximo 3)
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Renderizar las imágenes actuales */}
                    {images.map((img, index) => (
                        <div key={index} className="relative w-full h-48 border-2 border-pink-200 rounded-xl flex justify-center bg-pink-50/30">
                            <Image src={img} alt={`Foto de la prenda ${index + 1}`} fill className="object-contain rounded-lg p-2" />
                            <button 
                                type="button" 
                                onClick={() => removeImage(index)} 
                                className="absolute -top-2 -right-2 bg-red-400 text-white rounded-full p-2 shadow-md hover:scale-110 transition-transform z-10"
                            >
                                <X className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}

                    {/* Botón de subida (solo se muestra si hay menos de 3 fotos) */}
                    {images.length < 3 && (
                        <div className="border-2 border-dashed border-pink-200 rounded-xl flex justify-center bg-pink-50/30 hover:bg-pink-50/50 transition-colors cursor-pointer group h-48">
                            <CldUploadWidget 
                                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} 
                                onSuccess={(result: any) => {
                                    setImages((prev) => [...prev, result.info.secure_url]);
                                }}
                            >
                                {({ open }: { open: () => void }) => (
                                    <button type="button" onClick={() => open()} className="flex flex-col items-center justify-center gap-3 text-pink-400 group-hover:text-pink-500 w-full h-full">
                                        <ImagePlus className="w-8 h-8 opacity-70 group-hover:scale-110 transition-transform" /> 
                                        <span className="text-xs font-bold text-center px-2">
                                            Toca para Subir<br/>({3 - images.length} restante{3 - images.length !== 1 ? 's' : ''})
                                        </span>
                                    </button>
                                )}
                            </CldUploadWidget>
                        </div>
                    )}
                </div>
            </div>
        </form>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between sm:justify-end gap-3 p-4 sm:p-5 border-t border-pink-100/20 bg-[var(--bg-page)] shrink-0">
            <button onClick={onClose} className="px-6 py-3.5 rounded-xl font-bold text-sm text-[var(--text-muted)] bg-pink-50 sm:bg-transparent border border-pink-100 sm:border-transparent hover:bg-pink-100 transition-colors w-full sm:w-auto">
                Cancelar
            </button>
            <button 
                onClick={(e) => {
                    const form = e.currentTarget.closest('.relative')?.querySelector('form');
                    form?.requestSubmit();
                }}
                disabled={loading} 
                className="bg-pink-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-pink-600 transition-all flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(236,72,153,0.5)] active:scale-95 w-full sm:w-auto"
            >
                {loading ? "Esparciendo Magia..." : <><Save className="w-4 h-4" /> {initialData ? "Guardar Cambios" : "Agregar a la Boutique"}</>}
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
            font-size: 0.95rem;
            transition: all 0.2s;
        }
        .input-boutique:focus {
            border-color: #f472b6; /* pink-400 */
            box-shadow: 0 0 0 3px rgba(244, 114, 182, 0.15); /* halo rosa suave */
        }
        /* Ocultar las flechas de los inputs number para diseño más limpio */
        .input-boutique::-webkit-outer-spin-button,
        .input-boutique::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        .input-boutique[type=number] {
            -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}