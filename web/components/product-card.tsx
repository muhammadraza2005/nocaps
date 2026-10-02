"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { useCart } from "@/components/cart-context";

export function ProductCard({ product }: { product: Product }) { const { addItem } = useCart(); return <article className="product-card"><Link href={`/products/${product.id}`} className="product-image-wrap"><img src={product.image} alt={product.name} /><span className="product-badge">{product.badge || product.brand}</span></Link><div className="product-meta"><span>{product.brand}</span><Link href={`/products/${product.id}`}>{product.name}</Link><strong>${product.price.toFixed(2)}</strong><button onClick={() => addItem(product)} aria-label={`Add ${product.name} to cart`}><ShoppingBag size={15} /> ADD TO BAG</button></div></article>; }
