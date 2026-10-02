import type { Metadata } from "next";
import { Anton, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});
const hanken = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "NO CAPS | Authentic headwear",
  description: "Premium, verified headwear. No hype. Just truth.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${hanken.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><CartProvider><SiteHeader />{children}<SiteFooter /></CartProvider></body>
    </html>
  );
}
