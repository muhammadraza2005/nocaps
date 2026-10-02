"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { brandCounts, products } from "@/lib/catalog";

const brands = ["ALL", "NEW ERA", "NIKE", "ADIDAS", "PUMA"];
const styles = ["SNAPBACK", "FITTED", "DAD HAT", "TRUCKER"];

function ProductCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedBrand = searchParams.get("brand")?.toUpperCase() || "ALL";
  const selectedStyles = searchParams.getAll("style");
  const visibleProducts = products.filter((product) => {
    const matchesBrand = selectedBrand === "ALL" || product.brand === selectedBrand;
    const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(product.category.toUpperCase());
    return matchesBrand && matchesStyle;
  });

  const setBrand = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (brand === "ALL") params.delete("brand"); else params.set("brand", brand);
    router.push(`${pathname}?${params.toString()}`);
  };

  const toggleStyle = (style: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll("style");
    params.delete("style");
    if (!current.includes(style)) current.push(style);
    current.forEach((value) => params.append("style", value));
    router.push(`${pathname}?${params.toString()}`);
  };

  return <main className="page-width catalog-page"><header className="catalog-header"><div><span className="mono">01 / COLLECTIONS</span><h1 className="display">{selectedBrand === "ALL" ? "ALL CAPS" : selectedBrand}</h1><p className="catalog-count mono">{visibleProducts.length} CAPS AVAILABLE</p></div><button className="button">FILTERS ({selectedBrand === "ALL" ? 4 : 1})</button></header><div className="catalog-layout"><aside><h2 className="mono">BRANDS</h2>{brands.map((brand) => <button className={selectedBrand === brand ? "filter-active" : ""} onClick={() => setBrand(brand)} key={brand}>{brand}<span>{brand === "ALL" ? products.length : brandCounts[brand] || 0}</span></button>)}<h2 className="mono">STYLE</h2>{styles.map((style) => <label key={style}><input type="checkbox" checked={selectedStyles.includes(style)} onChange={() => toggleStyle(style)} /> {style}</label>)}<h2 className="mono">COLOR</h2><div className="swatches"><i /><i /><i /><i /><i /></div></aside><div className="product-grid">{visibleProducts.length ? visibleProducts.map((product) => <ProductCard key={product.id} product={product} />) : <p className="empty-filter">NO CAPS MATCH THOSE FILTERS.</p>}</div></div></main>;
}

export default function ProductsPage() {
  return <Suspense fallback={<main className="page-width catalog-page"><h1 className="display">LOADING CAPS</h1></main>}><ProductCatalog /></Suspense>;
}
