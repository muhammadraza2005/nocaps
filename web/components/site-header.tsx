"use client";

import Link from "next/link";
import { Search, ShoppingCart, UserRound } from "lucide-react";
import { useCart } from "@/components/cart-context";

export function SiteHeader() {
  const { count } = useCart();
  return <header className="site-header"><Link href="/" className="brand">NO CAPS</Link><nav><Link href="/products">SHOP ALL</Link><Link href="/products?brand=NEW%20ERA">NEW ERA</Link><Link href="/products?brand=NIKE">NIKE</Link><Link href="/products?brand=ADIDAS">ADIDAS</Link><Link href="/products?brand=PUMA">PUMA</Link></nav><div className="header-actions"><Link href="/products" aria-label="Search catalog"><Search size={17} /></Link><Link href="/auth/login" aria-label="Account"><UserRound size={17} /></Link><Link className="cart-link" href="/cart" aria-label="Shopping cart"><ShoppingCart size={17} />{count > 0 && <span>{count}</span>}</Link></div></header>;
}
