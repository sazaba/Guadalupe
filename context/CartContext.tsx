"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
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
  addItem: (product: any, qty: number) => void;
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

  const addItem = (product: any, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty, stock: product.stock }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.images, 
          quantity: qty,
          slug: product.slug,
          category: product.category,
          stock: product.stock,
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

  // --- NUEVA LÓGICA DE ENVÍO ---
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = items.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
  
  // Regla: Si el carrito tiene productos y el subtotal es menor a 300, cobra 9.95. Si no, es 0 (Gratis).
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