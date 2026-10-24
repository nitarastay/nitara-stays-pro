## Nitara Stays — Ultra-Luxury Mountain Retreat Website

A complete multi-page React + Tailwind site inspired by matterhornparadise.ch, built fully frontend with hardcoded content, cinematic visuals, and mobile-first responsive design.

### Design System
- **Colors**: Charcoal `#1a1a1a`, Ivory `#F5F0E8`, Gold `#C8A96E`, White
- **Typography**: Playfair Display (headings), Inter (body) — loaded via Google Fonts
- **Tokens**: Added as HSL CSS variables in `index.css` and mapped in `tailwind.config.ts`
- **Motion**: Fade-up scroll reveals (IntersectionObserver), hover zoom on cards, smooth route transitions, gold shimmer on buttons

### Global Components
- **Navbar**: Sticky, transparent over hero → solid white on scroll. Logo "NITARA STAYS" (gold accent), center nav, gold "Book Now" CTA. Destinations mega-dropdown (4 columns, dark). Mobile: animated hamburger, full-screen right slide-in panel with staggered links.
- **Footer**: Dark charcoal, 5 columns (Brand+social, Navigate, Explore, Stay, Address), bottom legal bar.
- **Floating WhatsApp** (green) and **Scroll-to-top** (gold) buttons.
- **Page Loader**: Black overlay with "NITARA" + gold loading bar, fades out after 1.5s on first load.

### Pages & Routes
1. `/` — **Home**: YouTube hero (ID `ZDO-b1uwRGM`, start 5400s, muted/autoplay/loop), Our Retreats horizontal strip (9 cards), Three Pillars, Experiences split screen, Anatoli Boukreev parallax quote, Explore Kumaon 3×2 grid, Testimonials carousel (auto 5s), Gallery preview masonry, Newsletter.
2. `/destinations` — Hero + filter tabs (All/Mountain/Forest/Premium) + 3-col grid of 9 retreats.
3. `/experiences` — Hero + 6 experience cards (trek, stargazing, cooking, spa, village walk, birding) + CTA strip.
4. `/gallery` — Hero + filter tabs + masonry grid + lightbox with keyboard nav.
5. `/about` — Story, 3 pillars, team (3 cards), awards strip, location map placeholder, CTA.
6. `/contact` — Form (frontend-only, console.log on submit) + contact card + 3 info cards.
7. `/booking` — 3-step form with progress: Stay Details (live price calc with 18% tax), Guest Details + 4 add-ons, Review → success modal with random `NIT-XXXXXX` reference. Sticky summary sidebar.
8. `/destinations/mukteshwar-temple`
9. `/destinations/chauli-ki-jali`
10. `/destinations/jageshwar-dham`
11. `/destinations/kasar-devi`
12. `/destinations/bhalugaad-waterfall`
13. `/destinations/kainchi-dham`

Each destination detail page reuses one template: hero, intro + facts strip, two-column body with sticky info card, 3-image gallery, how-to-get-there steps, 3 nearby cards, CTA banner. Content for all 6 destinations populated exactly as supplied.

### Content
- All 9 retreats with names, prices, and provided Unsplash URLs.
- All 6 nearby destinations with full taglines, facts, descriptions, and highlights as provided.
- 4 testimonials (Khanna, Venkataraman, Bose, Rao).
- Uploaded images (6) saved to `src/assets/` and woven into the gallery, hero fallbacks, and destination pages alongside the Unsplash imagery.

### Technical Notes
- React Router for all routes; catch-all 404 preserved.
- YouTube iframe sized with `aspect-video`/object-cover wrapper trick to fully cover hero with no black bars.
- IntersectionObserver hook for reveal animations.
- Lightbox built with a small custom component (no extra deps) supporting arrow keys + swipe.
- Booking price calc: `nights * nightlyRate + addons` then `*1.18`, animated number transitions.
- Mobile-first: every section reflows to single column, nav becomes slide-in, horizontal strips become snap-scroll.
- SEO: per-route `<title>` and meta description via a tiny `useDocumentMeta` hook.
- **Lovable branding removed**: replace `index.html` title/favicon/meta (mountain emoji favicon), remove any Lovable og-tags, GPT-Engineer script tag, and badge.

### Out of Scope (intentional)
- No backend, auth, payments, or DB.
- Form submissions are frontend-only.
- Map is a styled placeholder (no API key).

### Build Order
1. Theme tokens, fonts, global components (Navbar, Footer, Loader, floating buttons), router shell, strip Lovable branding.
2. Home page sections + shared Card/Section primitives.
3. Destinations, Experiences, Gallery, About, Contact pages.
4. Booking 3-step flow with sticky summary and success modal.
5. Destination detail template + 6 destination pages.
6. Polish: animations, mobile QA, SEO meta, favicon.