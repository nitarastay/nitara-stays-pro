# Architecture rules
- Keep official external profile URLs in `src/data/site-links.ts` so all site links use the same destinations.
- Preserve Vercel filesystem-first routing with an index.html fallback so static assets work and client-side pages survive direct visits and refreshes.
- Display only source-verified five-star Google reviews; keep review selection separate from its homepage presentation so unverified or lower-rated entries cannot appear.
- Keep owner-supplied guest reviews in a separate selected dataset, preserve provenance, and do not label them Google-verified or attach unverified ratings or dates.
- Resolve all site image pointers through `src/data/site-media.ts` with an absolute asset origin so external hosting never treats image requests as SPA pages.
- Keep uploaded property photography in the shared media list so About and Gallery use identical optimized assets.
