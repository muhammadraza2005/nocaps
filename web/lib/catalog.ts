export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
};

const capPhotos = [
  "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1691256676359-20e5c6d4bc92?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1720534490358-bc2ad29d51d5?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1645266729222-17cd32e06fd0?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1466992133056-ae8de8e22809?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1653704841996-c2ed854aedd8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1678721938524-1a3ee398de2a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1627733041826-77dd65dc5a19?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1733127547242-42a2e7ac12bb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1678721938524-1a3ee398de2a?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1627733041826-77dd65dc5a19?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1733127547242-42a2e7ac12bb?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1574660082367-ae7c10fe66d3?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1747257490779-5bdae916478f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1722413097635-04c83ae21017?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1615921470231-9e394cc8c19b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1675139380320-6ba6a0f6f8b9?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1495298885678-3158c444c6b5?auto=format&fit=crop&w=900&q=85",
];

const brandPhotoOffsets: Record<string, number> = { "NO CAPS": 0, "NEW ERA": 3, NIKE: 6, ADIDAS: 9, PUMA: 12 };
function capImage(brand: string, index: number) { return capPhotos[(brandPhotoOffsets[brand] + index) % capPhotos.length]; }

const names = ["Essential Logo", "Heritage Club", "Studio Panel", "Core Twill", "Archive Script", "City Series", "Seasonal League", "Everyday Canvas", "Mono Fitted", "Utility Pack", "Team Classic", "Daily Runner", "Premium Outline", "Off-Duty Cotton", "Limited Mark"];
const categories = ["Snapback", "Fitted", "Dad Hat", "Trucker"];
const descriptions = "A considered six-panel cap with a structured crown, durable cotton construction, and an embroidered finish made for daily rotation.";

function makeBrandProducts(brand: string, price: number): Product[] {
  return names.map((name, index) => ({
    id: `${brand.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index + 1}`,
    name: `${name} Cap`,
    brand,
    price: price + (index % 4) * 3,
    image: capImage(brand, index),
    category: categories[index % categories.length],
    badge: index === 0 ? "NEW" : index === 6 ? "LIMITED" : undefined,
    description: descriptions,
  }));
}

const featuredProducts: Product[] = [
  { id: "core-structure-cap", name: "Core Structure Cap", brand: "NO CAPS", price: 55, image: capImage("NO CAPS", 0), category: "Fitted", badge: "BEST SELLER", description: "A reinforced six-panel crown with a premium brushed cotton twill finish and tonal embroidery." },
  { id: "wool-blend-fitted", name: "Core Wool Blend Fitted", brand: "NO CAPS", price: 55, image: capImage("NO CAPS", 6), category: "Fitted", description: descriptions },
  { id: "tactical-utility-beanie", name: "Tactical Utility Beanie", brand: "NO CAPS", price: 40, image: capImage("NO CAPS", 7), category: "Beanie", description: "Warm rib-knit construction for colder city miles." },
];

export const products: Product[] = [
  ...featuredProducts,
  ...makeBrandProducts("NEW ERA", 32).map((product, index) => index === 0 ? { ...product, id: "59fifty-authentic", name: "59FIFTY Authentic Fitted", price: 45, badge: "NEW", description: "The structured icon with a flat brim and a sharp embroidered mark." } : index === 6 ? { ...product, id: "seasonal-league", name: "9FORTY Seasonal League" } : product),
  ...makeBrandProducts("NIKE", 30).map((product, index) => index === 0 ? { ...product, id: "heritage-86-essential", name: "Heritage 86 Essential", description: "A lightweight everyday cap with a curved brim and relaxed fit." } : product),
  ...makeBrandProducts("ADIDAS", 28).map((product, index) => index === 0 ? { ...product, id: "originals-trefoil", name: "Originals Trefoil Snapback", badge: "SALE", description: "A clean six-panel snapback finished with the signature trefoil." } : product),
  ...makeBrandProducts("PUMA", 27),
];

export const brandCounts = products.reduce<Record<string, number>>((counts, product) => { counts[product.brand] = (counts[product.brand] || 0) + 1; return counts; }, {});
export const getProduct = (id: string) => products.find((product) => product.id === id);
