"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 1. ACTUALIZACIÓN DE TIPOS: Le enseñamos al carrito los nuevos campos
export interface CartItem {
  id: string;          // Usaremos el variationId como el ID único en el carrito
  productId: string;   // <-- NUEVO
  variationId: string; // <-- NUEVO
  size: string;        // <-- NUEVO
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  category: string;
  stock: number;
}

interface CartContextType {
  items: CartItem[];
  // 2. ACTUALIZACIÓN: Ahora addItem pide el producto y la variación específica
  addItem: (product: any, variation: any, qty: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartCount: number;
  cartSubtotal: number;  
  shippingTotal: number; 
  cartTotal: number;     
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("transcendent_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transcendent_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // 3. ACTUALIZACIÓN: Lógica para guardar la talla y separar los items
  const addItem = (product: any, variation: any, qty: number) => {
    setItems((prev) => {
      // Buscamos si ya existe EXACTAMENTE ESA TALLA en el carrito
      const existing = prev.find((item) => item.variationId === variation.id);
      
      if (existing) {
        return prev.map((item) =>
          item.variationId === variation.id
            ? { ...item, quantity: item.quantity + qty, stock: variation.stock }
            : item
        );
      }
      
      // Si no existe esa talla, la agregamos como un item nuevo
      return [
        ...prev,
        {
          id: variation.id, // El ID de la fila del carrito ahora es el ID de la talla
          productId: product.id,
          variationId: variation.id,
          size: variation.size,
          name: product.name,
          price: Number(variation.price),
          image: product.images, 
          quantity: qty,
          slug: product.slug,
          category: product.category,
          stock: variation.stock,
        },
      ];
    });
    setIsCartOpen(true); 
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, qty) } : item))
    );
  };

  const clearCart = () => setItems([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  
  const shippingTotal = (cartSubtotal > 0 && cartSubtotal < 300) ? 9.95 : 0;
  const cartTotal = cartSubtotal + shippingTotal;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        cartCount,
        cartSubtotal,   
        shippingTotal,  
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};