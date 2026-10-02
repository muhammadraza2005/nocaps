"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";

type CartLine = Product & { quantity: number };
type CartContextValue = { items: CartLine[]; count: number; subtotal: number; addItem: (product: Product) => void; updateQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { const saved = window.localStorage.getItem("no-caps-cart"); if (saved) setItems(JSON.parse(saved)); setHydrated(true); }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem("no-caps-cart", JSON.stringify(items)); }, [hydrated, items]);
  const value = useMemo(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addItem: (product: Product) => setItems((current) => { const existing = current.find((item) => item.id === product.id); return existing ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]; }),
    updateQuantity: (id: string, quantity: number) => setItems((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item)),
    removeItem: (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
  }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() { const context = useContext(CartContext); if (!context) throw new Error("useCart must be used inside CartProvider"); return context; }
