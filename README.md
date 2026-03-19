# AirAbadi

**Kejernihan Terjaga Hingga ke Tangan Anda**

Corporate website for AirAbadi — Bali's premier water delivery service.

## Stack

| Layer      | Technology                                                         |
|------------|--------------------------------------------------------------------|
| Runtime    | [Bun](https://bun.sh) ≥ 1.1                                       |
| Framework  | [Astro 5](https://astro.build)                                     |
| UI         | [Vue 3](https://vuejs.org) (Composition API + `<script setup>`)    |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`)   |
| Animation  | [GSAP 3](https://gsap.com) + ScrollTrigger                         |
| Build tool | Vite (bundled inside Astro 5)                                      |
| Language   | TypeScript                                                         |

## Color Palette

| Token     | Hex       | Usage                        |
|-----------|-----------|------------------------------|
| Primary   | `#19A7CE` | Buttons, accents, links      |
| Secondary | `#146C94` | Hover states, gradients      |
| Accent    | `#0B303B` | Headings, dark backgrounds   |
| Tint      | `#EAF6FB` | Light backgrounds, chips     |

## Getting Started

### Prerequisites

Install Bun (if you haven't already):

```bash
# macOS / Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Verify
bun --version   # should be ≥ 1.1.0
```

### Install & Run

```bash
# 1. Install dependencies (uses bun.lockb for reproducible installs)
bun install

# 2. Start development server  →  http://localhost:4321
bun run dev

# 3. Build for production
bun run build

# 4. Preview production build
bun run preview
```

### One-liner (install + dev)

```bash
bun install && bun run dev
```

## Project Structure

```
airabadi/
├── bunfig.toml                # Bun configuration
├── package.json               # deps + "engines": { "bun": ">=1.1.0" }
├── astro.config.mjs           # Astro + Vue + @tailwindcss/vite
├── tsconfig.json
├── public/
│   └── favicon.svg
└── src/
    ├── styles/
    │   └── global.css              # @import "tailwindcss" + @theme tokens
    ├── layouts/
    │   └── BaseLayout.astro        # HTML shell, Google Fonts, <slot />
    ├── composables/
    │   └── useScrollAnimations.ts  # Reusable GSAP ScrollTrigger composable
    ├── components/
    │   ├── TheNavbar.vue           # Sticky glass nav + mobile menu
    │   ├── HeroSection.vue         # Hero, floating chips, GSAP entry anims
    │   ├── StatsBar.vue            # Animated counters (GSAP ScrollTrigger)
    │   ├── AboutSection.vue        # Image stack + pull quote
    │   ├── ProcessSection.vue      # 3-step process cards
    │   ├── TestimonialSection.vue  # 3 testimonial cards (center featured)
    │   ├── GallerySection.vue      # Tiled 2-col gallery
    │   ├── ContactSection.vue      # Dark CTA + WhatsApp + phone
    │   └── TheFooter.vue           # 4-col footer
    └── pages/
        └── index.astro             # Root page — composes all components
```

## Key Technical Notes

### Why Bun?

- **Faster installs** — Bun's package manager is 10–25× faster than npm
- **Built-in TypeScript** — no need for `ts-node` or extra transpile steps
- **Drop-in replacement** — all `npm run *` scripts work as `bun run *`
- **`bun.lockb`** — binary lockfile committed to repo for reproducible installs

### Tailwind v4

Tailwind v4 uses a **CSS-first** config — no `tailwind.config.js` needed.  
All design tokens live in `src/styles/global.css` via `@theme {}`:

```css
@import "tailwindcss";

@theme {
  --color-primary:   #19A7CE;
  --color-secondary: #146C94;
  --color-accent:    #0B303B;
  --font-family-display: 'Urbanist', sans-serif;
  /* ... */
}
```

The `@tailwindcss/vite` plugin scans and compiles automatically via Astro's Vite pipeline.

### Astro + Vue Hydration

Vue components use Astro **client directives**:

| Directive        | Used on                        | Behaviour                            |
|------------------|--------------------------------|--------------------------------------|
| `client:load`    | Navbar, Hero                   | Hydrate immediately on page load     |
| `client:visible` | All other sections, Footer     | Hydrate when element enters viewport |

`client:visible` defers JS until the section scrolls into view — significantly
reduces Time-to-Interactive for below-the-fold content.

### GSAP

Each Vue SFC manages its own animation context:

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo('.my-el', { opacity: 0, y: 44 }, {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.my-el', start: 'top 88%' }
    })
  })
})

onUnmounted(() => ctx?.revert())  // clean up all ScrollTriggers
```

`gsap.context()` + `ctx.revert()` ensures all tweens and ScrollTriggers are
properly destroyed when a Vue component unmounts — no memory leaks.

## Scripts Reference

| Command           | Description                           |
|-------------------|---------------------------------------|
| `bun install`     | Install all dependencies              |
| `bun run dev`     | Start dev server at localhost:4321    |
| `bun run build`   | Production build → `dist/`            |
| `bun run preview` | Preview production build locally      |
| `bun run astro`   | Run Astro CLI directly                |
