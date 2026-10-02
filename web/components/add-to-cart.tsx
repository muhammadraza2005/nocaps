"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/catalog";
import { useCart } from "@/components/cart-context";

export function AddToCart({ product }: { product: Product }) { const [added, setAdded] = useState(false); const { addItem } = useCart(); return <button className="button add-button" onClick={() => { addItem(product); setAdded(true); }}><span>{added ? <Check size={16} /> : <ShoppingBag size={16} />}</span>{added ? "ADDED TO BAG" : "ADD TO CART"}</button>; }
