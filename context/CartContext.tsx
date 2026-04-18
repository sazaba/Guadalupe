"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- CUPONES: Interfaz para el cupón aplicado ---
export interface AppliedCoupon {
  code: string;
  discountPercentage: number;
}

export interface CartItem {
  id: string;          
  productId: string;   
  variationId: string; 
  size: string;        
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
  addItem: (product: any, variation: any, qty: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartCount: number;
  cartSubtotal: number;  
  shippingTotal: number; 
  discountTotal: number; // <-- NUEVO: Total descontado en dinero
  cartTotal: number;     
  appliedCoupon: AppliedCoupon | null; // <-- NUEVO: Estado del cupón
  applyCoupon: (coupon: AppliedCoupon) => void; // <-- NUEVO
  removeCoupon: () => void; // <-- NUEVO
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Estado para guardar el cupón activo
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("transcendent_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data:", e);
      }
    }
    
    // Opcional: También podríamos guardar el cupón en localStorage, pero por seguridad 
    // y para evitar cupones expirados, es mejor mantenerlo solo en sesión/memoria.
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("transcendent_cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: any, variation: any, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.variationId === variation.id);
      
      if (existing) {
        return prev.map((item) =>
          item.variationId === variation.id
            ? { ...item, quantity: item.quantity + qty, stock: variation.stock }
            : item
        );
      }
      
      return [
        ...prev,
        {
          id: variation.id, 
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

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null); // Limpiamos el cupón al vaciar el carrito
  };
  
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Funciones del cupón
  const applyCoupon = (coupon: AppliedCoupon) => setAppliedCoupon(coupon);
  const removeCoupon = () => setAppliedCoupon(null);

  // Matemáticas del carrito actualizadas con el cupón
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  
  // Calculamos el descuento exacto
  const discountTotal = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const totalAfterDiscount = cartSubtotal - discountTotal;
  
  const shippingTotal = (totalAfterDiscount > 0 && totalAfterDiscount < 300) ? 9.95 : 0;
  const cartTotal = totalAfterDiscount + shippingTotal;

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
        discountTotal,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon
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