---
name: NO CAPS MONOCHROME
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
  status-success: '#22C55E'
  status-error: '#EF4444'
  neutral-gray: '#717171'
typography:
  display-xl:
    fontFamily: Anton
    fontSize: 96px
    fontWeight: '400'
    lineHeight: 100%
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 110%
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 110%
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 120%
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 160%
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 160%
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 140%
  button-text:
    fontFamily: Anton
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 100%
    letterSpacing: 0.05em
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system embodies a **Minimalist / High-Contrast** aesthetic tailored for a premium streetwear e-commerce experience. The brand personality is unapologetic, bold, and modern, focusing on the "No Caps" (truth/authenticity) ethos.

The visual language relies on extreme contrast and intentional whitespace to elevate product photography. By stripping away decorative colors, the interface recedes to let the textures and shapes of the headwear take center stage. The style draws from **Brutalist** efficiency—using heavy borders and structured grids—balanced with **Modern Minimalism** for a refined, high-end user experience.

The target audience is the streetwear subculture: users who value authenticity, clean lines, and an editorial shopping experience.

## Colors

The palette is strictly binary: **Deep Black (#000000)** and **Clean White (#FFFFFF)**. 

- **Primary (Black):** Used for all structural elements, primary buttons, headlines, and heavy borders.
- **Secondary (White):** Used for backgrounds, surface areas, and inverted text.
- **Functionality over Aesthetic:** Success and error states are the only permitted deviations from the monochrome palette. These should be desaturated or used sparingly (e.g., small icons or underline accents) to ensure they do not disrupt the high-contrast rhythm of the design.
- **Grays:** Restricted to mid-tones for secondary metadata or disabled states to maintain a clear visual hierarchy without introducing "softness" to the brand.

## Typography

The typography system uses a tri-font approach to create a distinctive editorial feel. 

- **Display & Headlines:** Use **Anton** for its aggressive, condensed, and impactful presence. It should always be uppercase in large-scale applications to reinforce the "NO CAPS" brand name.
- **Body & Interface:** Use **Hanken Grotesk** for readability and a modern, sharp geometric feel. It balances the heaviness of the headlines with a clean, professional touch.
- **Technical/Labels:** Use **JetBrains Mono** for pricing, product specs, and small UI labels. The monospaced nature adds a technical, "authentic" feel that mimics industrial tagging or shipping labels.

## Layout & Spacing

The design system utilizes a **Structured Fluid Grid** based on an 8px spacing system. 

- **Grid Model:** 12-column grid for desktop with 24px gutters. Elements should align strictly to these columns to create a "module" based look.
- **Whitespace:** Use generous margins (40px+) between major sections to emphasize the premium minimalist nature. 
- **Borders as Dividers:** Instead of shadows or color blocks, use 1px or 2px solid black borders to separate layout sections (e.g., header, sidebar, footer).
- **Mobile:** Transition to a 4-column grid with reduced margins (16px). Maintain the heavy border aesthetic to preserve the brand's "boxed" structural feel.

## Elevation & Depth

This system rejects ambient shadows and depth-based lighting. Hierarchy is achieved through **Tonal Inversion** and **Bold Borders**.

- **Flat Depth:** All elements sit on the same Z-plane. 
- **Layering:** When depth is required (e.g., modals or carts), use a solid 1px black border with a sharp, high-contrast white background. 
- **Hard Shadows (Optional):** If a "lift" is needed, use a "Hard-Drop" shadow: a solid black offset (e.g., 4px 4px 0px #000) that gives a graphic, brutalist appearance rather than a realistic one.
- **Inversion:** Hover states should typically invert the colors (White text on Black background becomes Black text on White background) to signal interactivity.

## Shapes

The shape language is strictly **Sharp (0px)**. No rounded corners are permitted. Every button, input field, card, and image container must have 90-degree angles to maintain the aggressive, structural aesthetic of the brand.

## Components

- **Buttons:** Primary buttons are solid black rectangles with white uppercase Anton text. Secondary buttons are white with a 2px black border and black text. Hovering should trigger a full color swap (Invert).
- **Input Fields:** Minimalist design with only a 1px bottom border or a full 1px border. No shadows. Use JetBrains Mono for placeholder text to maintain the technical vibe.
- **Cards:** Product cards are defined by 1px black outlines. Images should be high-contrast and occupy 100% of the top width of the card.
- **Chips/Badges:** Use solid black rectangles with white JetBrains Mono text. Small, sharp, and impactful.
- **Checkboxes/Radios:** Square-only. Checked state is a solid black fill or a heavy black 'X'.
- **Lists:** Separated by horizontal 1px lines. No bullets; use JetBrains Mono for numbering (e.g., 01, 02, 03).
- **Navigation:** The sticky navbar is defined by a 2px black bottom border. Logo in Anton, menu items in Hanken Grotesk (caps).