# AI Agent Rules — Skincare E-Commerce Build

These rules govern how an AI coding agent should build, edit, and extend this website. Read this file before generating or modifying any code. If a request conflicts with these rules, flag the conflict instead of silently overriding it.

---

## 1. Project Context
E-commerce skincare website. Target audience: women 16–45, segmented into Gen Z (16–24), Millennial core (25–35), Mature (36–45). Brand tone: "clinical confidence with sensorial warmth" — never cold/sterile, never pastel-cute-only.

---

## 2. Design System — Do Not Deviate Without Explicit Instruction

### Color
- Primary palette: sage / muted terracotta / warm sand
- Neutrals: off-white background, charcoal text (never pure black `#000`, never pure white `#fff` backgrounds)
- One saturated accent color reserved exclusively for primary CTAs (coral/clay) — do not reuse this color for decorative elements, or it loses its signal value
- Every color pairing must pass WCAG AA contrast (4.5:1 body text, 3:1 large text/UI). Run a contrast check before finalizing any new color combination; do not eyeball it.

### Typography
- Display/editorial: soft serif — hero sections, journal/blog, testimonials only
- UI/body: humanist sans (Inter or General Sans) — everything else, including all ingredient lists, forms, checkout, and buttons
- Never use the display serif for functional UI text (buttons, form labels, prices)

### Spacing & Grid
- 8pt spacing scale — all margins/padding must be multiples of 8px (4px allowed only for icon-level micro-spacing)
- Desktop: 12-column grid. Mobile: 4-column grid.
- Mobile-first: build and test mobile layout before desktop for every page

### Components
Reuse these components; do not create one-off variants without checking if an existing component can be extended:
- Buttons: primary / secondary / ghost / disabled states
- Badges: Bestseller, New, Cruelty-Free, Low Stock, Sold Out
- Product card (image, hover-swap image, name, price, rating, wishlist heart, quick-add)
- Quantity stepper, star rating, toast/snackbar, skeleton loader, form field with inline validation states

---

## 3. Information Architecture — Fixed Structure

Do not add, remove, or rename top-level sitemap nodes without confirming with the user first:

```
Home / Shop / Search / PDP / Skin Quiz / Cart / Wishlist / Checkout /
Thank You / Account / Journal / About / Legal / 404 / Order Tracking
```

Every page build must include its required error/empty states — these are not optional polish:
- Shop & Search: empty-results state
- PDP: sold-out + "notify me" state
- Cart: shipping cost and estimated delivery must be visible here, not first revealed at Checkout
- Checkout: payment failure state that preserves entered shipping/cart data on retry
- Wishlist: sold-out saved item state
- Global: 404 page, guest order-tracking flow (no login required)

---

## 4. Content & Copy Rules
- Never use exact clinical claims ("cures," "eliminates") without a `[NEEDS LEGAL REVIEW]` flag in a code comment — skincare marketing copy has regulatory exposure
- Product imagery alt text is required on every image, no exceptions — write descriptive alt text, not filenames
- Any active-ingredient product (retinol, high-% acids) shown to a user must include a visible usage/caution note; flag for review if age-gating logic isn't yet implemented

---

## 5. Accessibility (non-negotiable, not "nice to have")
- All interactive elements keyboard-navigable and focus-visible
- All form fields have associated labels (not placeholder-only)
- All modals/drawers (cart drawer, quick-view) must trap focus and be closable via Escape
- Motion/animation must respect `prefers-reduced-motion`

---

## 6. Code Conventions
- Component-driven architecture — no duplicated markup for things covered by an existing component in Section 2
- Match whatever framework/stack is already established in this repo; if none exists yet, ask before scaffolding rather than assuming
- Keep commit-sized changes scoped to one page/component at a time unless doing an explicit cross-cutting refactor
- Do not introduce new dependencies for something achievable with existing project tooling without flagging it first

---

## 7. When the Agent Should Stop and Ask
- Before changing anything in Section 2 (design tokens) or Section 3 (IA)
- Before adding a new third-party service (payment provider, analytics, email tool)
- Before writing legal/compliance-adjacent copy (returns policy, ingredient claims, age-gating logic)
- Before deleting or overwriting existing user data logic (cart, account, order history)
