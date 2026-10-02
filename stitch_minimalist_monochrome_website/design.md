# NO CAPS - Design & Architecture Documentation

This document provides a comprehensive overview of the **NO CAPS** e-commerce project. It outlines the overall structure, components, page architectures, and design decisions used throughout the codebase.

## 🏗 Tech Stack & Dependencies

- **Framework:** Next.js (App Router, v16.2.x)
- **UI & Styling:** Tailwind CSS (v4), Lucide React (Icons)
- **State Management:** Zustand, React Context API (`CartContext`)
- **Backend & Auth:** Supabase (`@supabase/supabase-js`)
- **Language:** TypeScript (`.tsx`, `.ts`)

---

## 📂 Project Structure & Pages

The application utilizes Next.js App Router. Here is the breakdown of the existing pages (6 active pages total):

1. **Home Page (`app/page.tsx`)**: The main landing page.
2. **Products List (`app/products/page.tsx`)**: Displays the catalog of available caps.
3. **Product Detail (`app/products/[id]/page.tsx`)**: Dynamic route for viewing individual product details.
4. **Login (`app/auth/login/page.tsx`)**: User authentication login page.
5. **Signup (`app/auth/signup/page.tsx`)**: User registration page.
6. **Cart (`app/auth/cart/page.tsx`)**: Displays the user's shopping cart items. *(Note: Auth grouping might be intended to protect the cart route or keep user data grouped).*

There is also an API route setup at `app/api/products/route.ts` handling backend fetches for the products.

---

## 🧩 Components Overview

### 1. `Navbar.tsx`
- **Location:** `components/Navbar.tsx`
- **Role:** Main navigation header for the site.
- **Design Features:**
  - Sticky top positioning with a subtle bottom border and shadow.
  - Responsive design (Mobile hamburger menu using `Menu` and `X` icons from Lucide).
  - Contains a dynamic Cart badge that calculates the sum of item quantities managed by the `CartContext`.
  - Quick links to Shop, About, and Contact.

### 2. `Footer.tsx`
- **Location:** `components/Footer.tsx`
- **Role:** Site footer displaying organizational details and extra links.
- **Design Features:**
  - Dark theme (black background with white/gray text).
  - Divided into 4 grid sections:
    1. **Brand Details:** Mission statement / tagline.
    2. **Shop Links:** Filters for major brands (Nike, Adidas, New Era).
    3. **Support:** FAQ, About Us, Contact links.
    4. **Contact Info:** Email, Phone, and Location (Islamabad, Pakistan).

---

## 🦸‍♂️ Home Page (Hero Section Breakdown)

The Home Page (`app/page.tsx`) acts as the primary marketing funnel. It is split into distinct visual segments:

### The Hero Section
- **Background:** A stylish linear gradient background (`from-black via-gray-900 to-black`) mixed with a subtle, pulsating blue atmospheric blur to give a premium feel.
- **Typography:** 
  - Massive bold headline: **"NO CAPS"**
  - Sub-headline focusing on the niche: *"Pakistan's most authentic collection of premium caps. From Nike to Adidas, we've got the best."*
- **Call-To-Actions (CTAs):**
  - **Shop Now:** Solid white button with an `ArrowRight` icon (redirects to `/products`) featuring a scale-up hover effect.
  - **Explore Brands:** Transparent, white-bordered button anchored to the brands section below.
- **Trust Badges:** Three distinct badges sitting below the CTAs to instill buyer confidence:
  - `ShieldCheck`: 100% Authentic
  - `Truck`: Fast Delivery
  - `BadgeCheck`: Money Back

### Trusted Brands Section
- Directly below the Hero, this section highlights the major cap labels sold on the store.
- **Features:** Clean white background showcasing large, custom inline SVGs for prominent brands: **Nike, Adidas, New Era, and Puma**.

---

## 🗄️ State & Data Flow

- **Cart State:** Handled globally by `Context/CartContext.tsx`. The Navbar actively subscribes to this to render the cart count badge in real-time.
- **Supabase Integration:** Configured in `lib/supabase.ts` for handling user authentication and likely powering the `/api/products/route.ts` backend to fetch dynamic product data.
