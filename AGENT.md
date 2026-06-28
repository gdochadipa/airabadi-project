# AirAbadi — Developer Specification, Workflow Manual & System Instructions

This document serves as the absolute source of truth, developer specification, and system manual for **AirAbadi**, a premium clean water delivery service in Bali, Indonesia. This file is designed for both human engineers and autonomous AI agents working on this project.

Whenever an AI agent or engineer joins this repository, they must read and adhere strictly to the guidelines, architectural standards, and implementation roadmap outlined here.

---

## 🗺️ Project Architecture & Stack Context

*   **Project Name:** AirAbadi (Premium Clean Water & Pool Filling Delivery Service)
*   **Tech Stack:**
    *   **Framework:** Astro v5.5 (Static Site Generation / Hydration)
    *   **Interactive Components:** Vue 3.5 (Composition API, `<script setup>` with TypeScript)
    *   **CSS Engine:** Tailwind CSS v4.1 (Vite-based integration, CSS-first design tokens)
    *   **Motion & Animation:** GSAP v3.12 (ScrollTrigger, staggered reveals, ambient liquid motions)
    *   **Build/Runtime:** Bun (v1.1+ for lightning-fast package management and building)
*   **Target Market:** Bali, Indonesia (Catering to luxury villas, resorts, pool builders, and high-end residential clients in Seminyak, Canggu, Ubud, Uluwatu, Sanur, and Bukit).
*   **Key Value Proposition:** Instant premium water delivery, food-grade SUS 304 stainless steel tanks, guaranteed low TDS (Total Dissolved Solids < 10 ppm for drinking-grade/reverse osmosis options), and professional logistical operations.

---

## 🛠️ Section 1: Traditional Web SEO & Multilingual Architecture

AirAbadi operates in a bilingual environment targeting Indonesian villa owners/managers and expatriate/foreign villa operators. The site must support perfect, high-performance SEO for both `/` (Bahasa Indonesia - default) and `/en/` (English).

### 1. Dynamic Lang & Head Meta-Architecture

Every page must compile into clean, localized HTML. The `BaseLayout.astro` file is the master wrapper. It must dynamically extract the locale and inject SEO head tags based on the current active routing context.

```
                  ┌──────────────────────────────┐
                  │      Astro Route Handler     │
                  └──────────────┬───────────────┘
                                 │
                     [Detect Active Locale]
                     (Astro.currentLocale)
                                 │
           ┌─────────────────────┴─────────────────────┐
           ▼                                           ▼
      id (Default)                                  en
(e.g., / or /hubungi)                       (e.g., /en or /en/contact)
           │                                           │
  lang="id" on <html>                         lang="en" on <html>
  Dynamic ID Canonical                        Dynamic EN Canonical
  hreflang="id" -> self                       hreflang="id" -> /
  hreflang="en" -> /en                        hreflang="en" -> /en
```

#### Head Metadata Requirements
For every route, `BaseLayout.astro` must output:
1.  **Dynamic Lang Attribute:** `<html lang={lang}>` where `lang` is `'id'` or `'en'`.
2.  **Canonical Link:** `<link rel="canonical" href={canonicalURL} />` resolving to the fully qualified domain (no double-slashes or trailing slashes mismatches).
3.  **Hreflang Alternate Tags:**
    *   `<link rel="alternate" hreflang="id" href={idURL} />`
    *   `<link rel="alternate" hreflang="en" href={enURL} />`
    *   `<link rel="alternate" hreflang="x-default" href={idURL} />`
4.  **OpenGraph & Twitter Card Metadata:** Ensure high click-through-rates when links are shared on WhatsApp, Facebook, or Twitter.
    *   `og:type` set to `"website"`
    *   `og:locale` set to `id_ID` or `en_US` depending on language
    *   Dynamic image resolution using a dedicated high-res social image.

---

### 2. High-Fidelity Schema.org LocalBusiness JSON-LD

To secure maximum local visibility in Bali, the head must inject structured Schema.org JSON-LD matching a premium utility/delivery provider. This structure models the business entity "AirAbadi" as a localized service operator.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://airabadi.com/#organization",
  "name": "AirAbadi",
  "image": "https://airabadi.com/images/og-share-cover.jpg",
  "description": "Layanan Pengiriman Air Bersih Premium di Bali. Menyediakan air minum food-grade, isi kolam renang cepat, dan supply vila dengan armada tangki steril SUS 304.",
  "url": "https://airabadi.com",
  "telephone": "+6281234567890",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Bypass Ngurah Rai No. 77",
    "addressLocality": "Kuta",
    "addressRegion": "Bali",
    "postalCode": "80361",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "-8.7228",
    "longitude": "115.1825"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "07:00",
    "closes": "21:00"
  },
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Canggu" },
    { "@type": "AdministrativeArea", "name": "Seminyak" },
    { "@type": "AdministrativeArea", "name": "Ubud" },
    { "@type": "AdministrativeArea", "name": "Uluwatu" },
    { "@type": "AdministrativeArea", "name": "Sanur" },
    { "@type": "AdministrativeArea", "name": "Kuta" },
    { "@type": "AdministrativeArea", "name": "Denpasar" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Layanan Air Bersih AirAbadi",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pengiriman Air Bersih Vila (Clean Water Supply)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pengisian Kolam Renang Cepat (Pool Filling Service)"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Air Minum TDS Rendah (Ultra-Pure RO Water)"
        }
      }
    ]
  }
}
```

---

### 3. Core Web Vitals (CWV) & Performance Rules

A high-end website must load instantly, even on mobile networks across remote parts of Bali (like Uluwatu or Ubud).

*   **LCP (Largest Contentful Paint) / Image Optimization:**
    *   Never load unoptimized JPEGs or PNGs. All raster graphics must be converted to **AVIF** (preferred) or **WebP**.
    *   Add `fetchpriority="high"` and `loading="eager"` to the primary hero image or logo.
    *   Set explicit `width` and `height` dimensions to prevent Cumulative Layout Shifts (CLS).
*   **FCP (First Contentful Paint) / Web Fonts:**
    *   Preconnect to `https://fonts.googleapis.com` and `https://fonts.gstatic.com` with `crossorigin` attributes.
    *   Append `&display=swap` to Google Fonts URLs to prevent blank screens (FOIT).
*   **Astro Hydration Protocol:**
    *   Do not hydrate Vue components eagerly if they are located below-the-fold.
    *   Use `client:load` ONLY for the navigation (`TheNavbar.vue`) and high-priority interactive headers.
    *   Use `client:visible` for elements down the page, like `AboutSection.vue`, `ProcessSection.vue`, and the interactive Calculator.
    *   Keep static sections completely pure HTML (without hydration) to minimize JavaScript main-thread blockage.
*   **GSAP & Hardware Acceleration:**
    *   Animate only performance-friendly CSS properties: `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`.
    *   Avoid animating width, height, margin, or top/left properties, as they trigger costly browser repaints.
    *   Apply `will-change: transform, opacity;` to heavy animated elements.

---

## 🤖 Section 2: Generative Engine Optimization (GEO) / LLM AI Model SEO

Today's affluent clients use AI-powered Search Engines (Perplexity, ChatGPT Search, Claude, Gemini) to find services. They ask complex queries like:
> *"Where can I buy bulk reverse osmosis clean water for a villa pool in Ubud with stainless steel trucks?"*

We must construct AirAbadi's pages so that LLM crawlers easily parse, digest, and select our brand for citation.

```
       [LLM AI Search Engine (Perplexity/ChatGPT/Gemini)]
                             │
                             ▼
                [Semantic Fact Crawling]
                             │
        ┌────────────────────┴────────────────────┐
        ▼                                         ▼
 [Strict Structured Data Tables]      [Entity-Rich Semantic Copy]
 - TDS specs (<10 ppm / 150 ppm)      - "AirAbadi Bali clean water"
 - SUS 304 food-grade tanks           - "pool filling Ubud"
 - 5,000L & 8,000L exact capacities   - "villa water supply Seminyak"
        │                                         │
        └────────────────────┬────────────────────┘
                             ▼
               [High-Confidence Synthesis]
                             │
                             ▼
         [AI Citation Result: "Use AirAbadi..."]
```

### 1. Structure Content for AI Crawlers (RAG-Friendly)
*   **No Fluff, Max Factuality:** LLMs prioritize hard specs, certifications, and measurable parameters over empty marketing hyperbole.
*   **Logical Hierarchy:** Use precise semantic tags (`<article>`, `<section>`, `<h3>`, `<table>`) with zero broken or nested-depth layout hacks.
*   **Entity Association:** Place critical keywords in close proximity to the brand name "AirAbadi" so that knowledge graphs link them together.

### 2. High-Value Spec Data Tables (Citable Facts)
Implement highly structured tables outlining precise specifications. This makes extracting answers straightforward for RAG pipelines:

| Parameter / Specification | Premium Drinking Grade (RO) | Clean Utility / Pool Grade | Fleet Capabilities |
| :--- | :--- | :--- | :--- |
| **Total Dissolved Solids (TDS)** | < 10 ppm (Ultra Pure) | 120 – 160 ppm (Natural Mineral) | Dual-Tank Cleanliness |
| **pH Level Range** | 6.8 – 7.2 | 7.2 – 7.6 (Optimal for pools) | Neutral Balanced |
| **Sanitisation Technology** | Reverse Osmosis + Multi-UV | Multi-Stage Sand/Carbon + UV | CIP Sanitized Tanks |
| **Tank Composition** | Food-Grade Stainless Steel (SUS 304) | Food-Grade Stainless Steel (SUS 304) | Zero rust contamination |
| **Volume Capacity Per Truck** | 5,000 Litres / 8,000 Litres | 5,000 Litres / 8,000 Litres | Digital flow meters |
| **Primary Use Cases** | Ice makers, cooking, resort supply | Pool fillings, villa tanks, garden | High-pressure pumps |

---

### 3. Semantic & Schema-Supported FAQ Accordion

To capture featured snippets and direct answers from Gemini, Claude, and Perplexity, we must build a highly semantic FAQ accordion. Every FAQ item must be backed by matching `FAQPage` or `Question` schema microdata (or structured JSON-LD).

#### FAQ Content Guidelines
*   Write clear, complete, question-style headings.
*   Begin the answer with a direct, unambiguous statement (e.g., *"Yes, AirAbadi delivers clean pool water to Ubud in under 4 hours."*).
*   Add localized keywords: Seminyak, Canggu, Ubud, Uluwatu, Sanur.
*   Provide numerical specifics (capacities, exact TDS values, response times).

---

### 4. Rich Real-World Entity Citations
AI models generate summaries based on "confidence score" associations. We must enrich the copy with high-value entities:
*   **Core Entities:** `"AirAbadi"`, `"Bali clean water delivery"`, `"villa water supply Seminyak"`, `"pool filling Ubud"`, `"bulk water supplier Canggu"`, `"drinking water delivery Bukit"`.
*   **Technical Entities:** `"TDS < 10 ppm"`, `"SUS 304 stainless steel tank"`, `"Reverse Osmosis water purification"`, `"food-grade water logistics"`.
*   **Geographic Entities:** `"Ubud"`, `"Canggu"`, `"Seminyak"`, `"Uluwatu"`, `"Sanur"`, `"Kuta"`, `"Denpasar"`.

---

## 🎨 Section 3: Bespoke Frontend Design & Quality Craft

AirAbadi represents a **luxury** brand. The design must feel pristine, fluid, professional, and sophisticated—mirroring the crystal-clear quality of premium mountain water.

We must strictly invoke our specialized developer skills to construct and verify the interface.

```
                    ┌──────────────────────────────┐
                    │     Frontend Design Skill    │
                    └──────────────┬───────────────┘
                                   │
                    [Liquid Purity Theme Execution]
                    - Glassmorphism & Translucency
                    - Cyan & Deep Ocean Colors
                    - Custom Micro-Waves
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │     Design Review Skill      │
                    └──────────────┬───────────────┘
                                   │
                     [Systematic 3-Pillar Audit]
                     - Frictionless Insight to Action
                     - Quality is Craft (WCAG AA)
                     - Trustworthy Building
```

### 1. Aesthetic Direction: "Liquid Purity, Flow, and Pristine Bali Logistics"
We must avoid generic AI slop styles (such as boring dark grids with blinding neon or rustic cream-serif templates). Instead, establish a bespoke design direction leveraging Tailwind CSS v4 variables:

*   **Palette Theme Tokens:**
    *   **Primary Accent:** High-end translucent aqua cyan (`#19A7CE` / `--color-primary`) representing crystal-clear flowing water.
    *   **Deep Base:** Premium deep ocean slate-blue (`#146C94` / `--color-secondary` and `#0B303B` / `--color-accent`) representing depth, structure, and professional logistics.
    *   **Background Tints:** Pure glacier whites (`#fff`) and ice-blue glass offsets (`#EAF6FB` / `--color-tint` and `#F6FAFB` / `--color-off`).
*   **Styling Details:**
    *   **Glassmorphism:** Apply backdrops using `backdrop-blur-md bg-white/40 border border-white/20 shadow-md` to mimic polished ice and pristine water.
    *   **Gradients:** Utilize soft, directional liquid flows: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`.
    *   **Pristine Borders:** Fine, sharp borders (`1px` with a subtle slate-teal tint) that outline compartments clearly.
    *   **Ambient Elements:** Micro-interactive SVG waves, subtle grid backing, and smooth, staggered scroll animations.

---

### 2. Systematic Code Design Reviews via Three Quality Pillars

Every interactive module and page layout must pass a code review centered around three primary pillars, inspired by our specialized engineering reviews:

#### Pillar A: Frictionless Insight to Action
*   **Zero-Click Clarity:** Users must instantly understand how to book water within 3 seconds of page load.
*   **Primary CTA prominence:** The "Order Now" (Hubungi Kami) CTA must stand out, leading directly to a pre-filled WhatsApp link with clear messaging parameters (e.g., locale, requested volume, location).
*   **Interaction Streamlining:** Eliminate redundant forms, multi-step hurdles, or confusing layouts. Keep inputs clear and interactive.

#### Pillar B: Quality is Craft
*   **Responsive Reflow:** The layout must look pristine on 320px mobile screens, standard iPads, laptops, and ultra-wide desktop monitors. Check for overflow, layout breaking, or compressed elements.
*   **Contrast & Legibility:** Match **WCAG 2.1 AA** standards. Ensure the text contrast on cyan/blue gradients uses pure white (`#fff`) or ultra-dark ocean blue (`#0B303B`), never low-contrast light grey.
*   **Focus States:** Interactive links, inputs, and buttons must display clear, custom-tailored outline focus indicators for keyboard navigation (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`).

#### Pillar C: Trustworthy Building
*   **Operational Reassurance:** Clearly display certificates, water test results, and clear contact information.
*   **Responsive Feedback:** If an interactive element fails or experiences latency (e.g., calculating volumes), display instant, polite state indications (loading states, dynamic boundaries).

---

## 📅 Section 4: Technical Project Roadmap & Backlog

To systematically build the AirAbadi premium website, developers and AI agents must work through the following 4-phase implementation plan:

```
┌────────────────────────────────────────────────────────┐
│  Phase 1: Multilingual Layout & SEO Head Refactor      │
│  - Dynamic URL parsing & BaseLayout.astro updates      │
│  - Hreflang and high-fidelity JSON-LD schema           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 2: Content Enhancements & GEO Optimization      │
│  - Entity-dense technical spec data tables             │
│  - Semantic FAQ page and Question/Answer JSON-LD       │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 3: Interactive Fluid Calculator Component       │
│  - Glassmorphic Vue 3 estimator tool                   │
│  - Live volume calculations & direct WhatsApp generation│
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│  Phase 4: Scroll Animation & Performance Polish        │
│  - GSAP animations, will-change, GPU acceleration      │
│  - Performance audit aiming for 95+ Mobile PageSpeed   │
└────────────────────────────────────────────────────────┘
```

---

### 🚀 Phase 1: Multilingual Layout & SEO Head Refactor

#### Objective
Refactor the current basic `BaseLayout.astro` file to parse Astro i18n locales, handle canonical matching, dynamic hreflang alternate headers, and inject the Schema.org LocalBusiness JSON-LD block.

#### High-Fidelity Implementation Blueprint for `BaseLayout.astro`

This template should be used to refactor `/Users/ochadipa/frontend_project/airabadi/src/layouts/BaseLayout.astro`:

```astro
---
import { ui } from '../i18n/ui';

export interface Props {
  title?: string;
  description?: string;
  image?: string;
}

// 1. Resolve current language (Astro native i18n support)
const lang = Astro.currentLocale as 'id' | 'en' || 'id';

// 2. Select translations or fallbacks for localized page-level metadata
const defaultTitle = lang === 'id' 
  ? 'AirAbadi – Pengiriman Air Bersih Premium & Isi Kolam Bali' 
  : 'AirAbadi – Premium Clean Water Delivery & Pool Filling Bali';

const defaultDesc = lang === 'id'
  ? 'Layanan air bersih terpercaya di Bali. Pengiriman air minum kualitas food-grade dengan tangki higienis SUS 304 untuk villa, kolam renang, dan hotel.'
  : 'Premium water delivery in Bali. High-quality food-grade water with hygienic SUS 304 stainless tanks for villas, swimming pools, and hotels.';

const {
  title = defaultTitle,
  description = defaultDesc,
  image = '/images/og-share-cover.jpg',
} = Astro.props;

// 3. Formulate dynamic fully-qualified Canonical and Alternate hreflang URLs
const siteRoot = 'https://airabadi.com';
const pathname = Astro.url.pathname;

// Clean up double slashes or missing slashes
const cleanPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
const canonicalURL = new URL(cleanPathname, siteRoot).toString();

// Generate Indonesian alternate
const idPath = pathname.startsWith('/en') 
  ? pathname.replace(/^\/en/, '') 
  : pathname;
const cleanIdPath = idPath.endsWith('/') ? idPath : `${idPath}/`;
const idURL = new URL(cleanIdPath === '/' ? '/' : cleanIdPath, siteRoot).toString();

// Generate English alternate
const enPath = pathname.startsWith('/en') 
  ? pathname 
  : `/en${pathname}`;
const cleanEnPath = enPath.endsWith('/') ? enPath : `${enPath}/`;
const enURL = new URL(cleanEnPath, siteRoot).toString();
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <!-- Search Engine Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />

    <!-- Canonical & Multilingual Alternate Hreflang Tags -->
    <link rel="canonical" href={canonicalURL} />
    <link rel="alternate" hreflang="id" href={idURL} />
    <link rel="alternate" hreflang="en" href={enURL} />
    <link rel="alternate" hreflang="x-default" href={idURL} />

    <!-- OpenGraph Social Cards -->
    <meta property="og:site_name" content="AirAbadi" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, siteRoot).toString()} />
    <meta property="og:locale" content={lang === 'id' ? 'id_ID' : 'en_US'} />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(image, siteRoot).toString()} />

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Preconnect & Optimize Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />

    <!-- LocalBusiness Schema.org JSON-LD -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://airabadi.com/#organization",
        "name": "AirAbadi",
        "image": "https://airabadi.com/images/og-share-cover.jpg",
        "description": "Layanan Pengiriman Air Bersih Premium di Bali. Menyediakan air minum food-grade, isi kolam renang cepat, dan supply vila dengan armada tangki steril SUS 304.",
        "url": "https://airabadi.com",
        "telephone": "+6281234567890",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Jl. Bypass Ngurah Rai No. 77",
          "addressLocality": "Kuta",
          "addressRegion": "Bali",
          "postalCode": "80361",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-8.7228",
          "longitude": "115.1825"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "07:00",
          "closes": "21:00"
        }
      }
    </script>
  </head>
  <body>
    <slot />
  </body>
</html>
```

---

### 📝 Phase 2: Content Enhancements & GEO Optimization

#### Objective
Establish rich-entity data segments, structured tech specification tables, and a highly semantic localized FAQ block inside both language routes.

#### Action Plan
1.  **Translation Dictionary Sync:** In `/src/i18n/ui.ts`, create translation entries for the technical details, table headers, and deep localized keywords.
2.  **HTML Fact Table Integration:** Insert the Technical Spec table (detailed in Section 2) in the "About Us" or "Process" sections, wrapped in clean semantic tags.
3.  **Bilingual FAQ Section Assembly:** Add an accordion block containing citable answers to questions commonly queried by clients and searched by AI models:
    *   *Where is the water sourced from?* (Pristine spring source, filtered with premium treatment standards).
    *   *What are the truck sizes?* (5,000L and 8,000L options for villas and hotels).
    *   *Which regions in Bali do you serve?* (Ubud, Seminyak, Canggu, Uluwatu, Sanur, Kuta, Denpasar, Bukit).
    *   *Are the delivery tanks sterilized?* (Yes, food-grade SUS 304 stainless steel tanks disinfected regularly with food-safe protocols).

---

### 💧 Phase 3: Interactive Fluid Calculator Component

#### Objective
Build a centerpiece interactive calculator component (`WaterCalculator.vue`) in Vue 3 that allows villa managers, pool builders, and tourists to estimate their water volume needs.

#### Aesthetic & Interface Design
*   **Visual Direction:** A beautiful "liquid glass" container styled with Tailwind v4 translucency and cyan themes.
*   **Real-time Sliders:** Users drag sliders to input pool/tank dimensions (Length, Width, Depth) and instantly see the computed volume in Litres, the recommended number of truck deliveries, and an approximate delivery cost.

```
+───────────────────────────────────────────────────────+
|               WATER VOLUME ESTIMATOR                  |
+───────────────────────────────────────────────────────+
|                                                       |
|   Select Purpose:  (o) Pool Filling   ( ) Villa Tank  |
|                                                       |
|   Length (m): [============o===============]  12.0m   |
|   Width (m):  [=======o====================]   4.0m   |
|   Avg Depth:  [====o───────────────────────]   1.5m   |
|                                                       |
|   +-----------------------------------------------+   |
|   |          Estimated Total Volume               |   |
|   |                72,000 Litres                  |   |
|   +-----------------------------------------------+   |
|                                                       |
|   Required Logistics:                                 |
|   [icon] 9 x 8,000L Stainless Trucks                  |
|                                                       |
|   Estimated Delivery Duration: ~1 Day (Sequential)    |
|                                                       |
|   [ BUTTON: BOOK ESTIMATED VOLUME VIA WHATSAPP ]      |
|                                                       |
+───────────────────────────────────────────────────────+
```

#### Code Specification Structure
Create `/Users/ochadipa/frontend_project/airabadi/src/components/WaterCalculator.vue` using this clean, interactive Composition API template:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  lang: 'id' | 'en';
}>();

// Form states
const type = ref<'pool' | 'tank'>('pool');
const length = ref(10);  // meters
const width = ref(4);    // meters
const depth = ref(1.5);  // meters

// Compute volume in Litres (m3 * 1000)
const volumeLitres = computed(() => {
  return Math.round(length.value * width.value * depth.value * 1000);
});

// Calculate fleet distribution (using 8k and 5k capacities)
const deliveryPlan = computed(() => {
  const vol = volumeLitres.value;
  if (vol <= 0) return { trucks8k: 0, trucks5k: 0, totalTrucks: 0 };

  // Prioritize larger 8,000L trucks for high efficiency
  const trucks8k = Math.floor(vol / 8000);
  const remainder = vol % 8000;
  
  let trucks5k = 0;
  if (remainder > 0) {
    if (remainder <= 5000) {
      trucks5k = 1;
    } else {
      // If remaining volume is above 5,000L, add another 8k truck for headroom
      trucks5k = 0;
      return { trucks8k: trucks8k + 1, trucks5k: 0, totalTrucks: trucks8k + 1 };
    }
  }

  return {
    trucks8k,
    trucks5k,
    totalTrucks: trucks8k + trucks5k
  };
});

// Translation maps
const dict = {
  id: {
    title: 'Kalkulator Volume Air & Estimasi Pengiriman',
    subtitle: 'Hitung kebutuhan air bersih kolam renang atau tangki vila Anda secara instan.',
    labelType: 'Tujuan Penggunaan',
    typePool: 'Pengisian Kolam Renang',
    typeTank: 'Tangki Penyimpanan Vila',
    labelLength: 'Panjang Kolam',
    labelWidth: 'Lebar Kolam',
    labelDepth: 'Kedalaman Rata-rata',
    resultsTitle: 'Hasil Estimasi Volume',
    requiredFleet: 'Rencana Distribusi Armada',
    truckText8k: 'Truk Tangki Premium 8,000 Liter',
    truckText5k: 'Truk Tangki Premium 5,000 Liter',
    totalText: 'Total Kebutuhan Armada',
    ctaButton: 'Pesan Volume Ini via WhatsApp',
    waText: 'Halo AirAbadi, saya ingin memesan pengiriman air bersih. Hasil estimasi kalkulator: Volume sekitar {vol} Liter, membutuhkan {trucks} armada pengiriman.'
  },
  en: {
    title: 'Water Volume & Logistics Estimator',
    subtitle: 'Instantly compute clean water requirements for your pool or villa reservoir.',
    labelType: 'Water Purpose',
    typePool: 'Swimming Pool Filling',
    typeTank: 'Villa Storage Tank',
    labelLength: 'Pool Length',
    labelWidth: 'Pool Width',
    labelDepth: 'Average Depth',
    resultsTitle: 'Estimated Volume Results',
    requiredFleet: 'Logistical Dispatch Plan',
    truckText8k: '8,000 Litre Stainless Steel Trucks',
    truckText5k: '5,000 Litre Stainless Steel Trucks',
    totalText: 'Total Scheduled Trucks',
    ctaButton: 'Book This Volume via WhatsApp',
    waText: 'Hello AirAbadi, I would like to book a clean water delivery. Calculated volume: approx {vol} Litres, requiring {trucks} delivery trucks.'
  }
};

const t = computed(() => dict[props.lang]);

// Generate dynamic Whatsapp redirection link
const whatsappUrl = computed(() => {
  const phone = '6281234567890'; // Replace with company's actual WhatsApp phone
  const rawMsg = t.value.waText
    .replace('{vol}', volumeLitres.value.toLocaleString(props.lang === 'id' ? 'id-ID' : 'en-US'))
    .replace('{trucks}', deliveryPlan.value.totalTrucks.toString());
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(rawMsg)}`;
});
</script>

<template>
  <div class="w-full max-w-4xl mx-auto rounded-3xl backdrop-blur-md bg-white/40 border border-white/20 p-6 md:p-10 shadow-lg text-accent">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
        { t.title }
      </h2>
      <p class="text-sm md:text-base text-muted mt-2">
        { t.subtitle }
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <!-- Input Sliders -->
      <div class="space-y-6 bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-border">
        <!-- Water Purpose Toggle -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-muted mb-2">{ t.labelType }</label>
          <div class="grid grid-cols-2 gap-3">
            <button 
              @click="type = 'pool'"
              :class="type === 'pool' ? 'bg-primary text-white shadow-sm' : 'bg-tint text-accent hover:bg-border'"
              class="py-3 px-4 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              { t.typePool }
            </button>
            <button 
              @click="type = 'tank'"
              :class="type === 'tank' ? 'bg-primary text-white shadow-sm' : 'bg-tint text-accent hover:bg-border'"
              class="py-3 px-4 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              { t.typeTank }
            </button>
          </div>
        </div>

        <!-- Slider Inputs -->
        <div class="space-y-4">
          <!-- Length -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-semibold text-accent">{ t.labelLength }</span>
              <span class="text-lg font-bold text-secondary">{{ length }}m</span>
            </div>
            <input 
              type="range" 
              v-model.number="length" 
              min="1" 
              max="50" 
              step="0.5"
              class="w-full h-2 bg-tint rounded-lg appearance-none cursor-pointer accent-primary" 
            />
          </div>

          <!-- Width -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-semibold text-accent">{ t.labelWidth }</span>
              <span class="text-lg font-bold text-secondary">{{ width }}m</span>
            </div>
            <input 
              type="range" 
              v-model.number="width" 
              min="1" 
              max="20" 
              step="0.5"
              class="w-full h-2 bg-tint rounded-lg appearance-none cursor-pointer accent-primary" 
            />
          </div>

          <!-- Depth -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-semibold text-accent">{ t.labelDepth }</span>
              <span class="text-lg font-bold text-secondary">{{ depth }}m</span>
            </div>
            <input 
              type="range" 
              v-model.number="depth" 
              min="0.5" 
              max="4" 
              step="0.1"
              class="w-full h-2 bg-tint rounded-lg appearance-none cursor-pointer accent-primary" 
            />
          </div>
        </div>
      </div>

      <!-- Results Display Box -->
      <div class="space-y-6 bg-gradient-to-br from-accent to-secondary text-white p-6 md:p-8 rounded-2xl shadow-md">
        <div>
          <span class="block text-xs font-bold uppercase tracking-wider opacity-85">{ t.resultsTitle }</span>
          <div class="text-4xl md:text-5xl font-black tracking-tight mt-1">
            {{ volumeLitres.toLocaleString(props.lang === 'id' ? 'id-ID' : 'en-US') }}
            <span class="text-lg font-semibold opacity-90">Litres</span>
          </div>
        </div>

        <div class="border-t border-white/20 pt-4 space-y-4">
          <h4 class="text-sm font-bold uppercase tracking-wider text-primary">{{ t.requiredFleet }}</h4>
          
          <div class="space-y-3">
            <div v-if="deliveryPlan.trucks8k > 0" class="flex justify-between items-center">
              <span class="text-sm opacity-90">{{ t.truckText8k }}</span>
              <span class="text-base font-extrabold bg-white/15 px-3 py-1 rounded-md">{{ deliveryPlan.trucks8k }}x</span>
            </div>

            <div v-if="deliveryPlan.trucks5k > 0" class="flex justify-between items-center">
              <span class="text-sm opacity-90">{{ t.truckText5k }}</span>
              <span class="text-base font-extrabold bg-white/15 px-3 py-1 rounded-md">{{ deliveryPlan.trucks5k }}x</span>
            </div>

            <div class="flex justify-between items-center border-t border-white/10 pt-2 font-bold text-lg text-primary">
              <span>{{ t.totalText }}</span>
              <span>{{ deliveryPlan.totalTrucks }} Trucks</span>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <a 
          :href="whatsappUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="block text-center bg-primary hover:bg-primary/95 text-white font-extrabold py-4 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-primary/40 cursor-pointer"
        >
          { t.ctaButton }
        </a>
      </div>
    </div>
  </div>
</template>
```

---

### 🎨 Phase 4: Scroll Animation & Performance Polish

#### Objective
Coordinate the site's load feels and scroll interactions using GSAP while staying highly lightweight to safeguard Core Web Vitals performance.

#### GSAP Animation Standards
All scroll-triggered reveals must be driven with standard GSAP triggers tied into native Astro lifecycles.

1.  **Register GSAP Integrations Correctly:**
    Only load and run animation scripts in the browser. Wrap initializations in standard browser-environment checks:

    ```typescript
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }
    ```

2.  **Ensure Flawless Re-entry (Stagger Reveals):**
    For cards, sections, and items, use clean GSAP declarations:

    ```typescript
    export function initScrollAnimations() {
      if (typeof window === 'undefined') return;

      // Animate cards on scroll
      gsap.from('.anim-card-reveal', {
        scrollTrigger: {
          trigger: '.anim-section-trigger',
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
    ```

3.  **Prevent Layout Shift (CLS):**
    Ensure target classes have fallback CSS styles (like `opacity: 0; transform: translateY(44px);` mapped in `@layer utilities` within `/src/styles/global.css`) so there is no layout jump when JavaScript loads.

4.  **Hardware-Accelerate Motions:**
    Optimize heavy elements. Do not apply dynamic mouse-tracking to large complex backgrounds. Let lightweight SVG waves flow naturally using light, hardware-accelerated CSS animations where possible.

---

## 🤖 System Prompt Adaptation Checklist for AI Agents

When executing tasks on this codebase, always use this quick checklist to review your work before presenting:

- [ ] **Internationalization:** Did you include translation strings for *both* `'id'` and `'en'` in `/src/i18n/ui.ts`?
- [ ] **Semantic Markup:** Is the HTML semantic, structured with logical headers and structured tables for AI crawlers?
- [ ] **SEO/GEO Audit:** Have you verified the canonical, alternate hreflang tags, and the JSON-LD schemas inside the head wrapper?
- [ ] **Design Tokens:** Are you using Tailwind CSS v4 variables (`--color-primary`, `--color-accent`, etc.) instead of hardcoded hex values?
- [ ] **Pristine Aesthetics:** Does the newly added UI feature glassmorphic transparency, soft water gradients, and precise borders?
- [ ] **Responsive Design:** Is the component fully tested on layout dimensions from 320px mobile to wide desktop?
- [ ] **Accessibility (WCAG AA):** Are the font sizes readable, button colors contrasting, and keyboard focus states fully implemented?
- [ ] **Core Web Vitals:** Are images set to modern AVIF/WebP formats with appropriate loading/eager hydration behaviors?
- [ ] **Animation Performance:** Are GSAP scripts running exclusively on the client, animating only transforms/opacities?
