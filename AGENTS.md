# Architecture rules
- Keep official external profile URLs in `src/data/site-links.ts` so all site links use the same destinations.
- Preserve Vercel filesystem-first routing with an index.html fallback so static assets work and client-side pages survive direct visits and refreshes.
- Display only source-verified five-star Google reviews; keep review selection separate from its homepage presentation so unverified or lower-rated entries cannot appear.
- Keep owner-supplied guest reviews in a separate selected dataset, preserve provenance, and do not label them Google-verified or attach unverified ratings or dates.
- Resolve all site image pointers through `src/data/site-media.ts` with an absolute asset origin so external hosting never treats image requests as SPA pages.
- Keep uploaded property photography in the shared media list so About and Gallery use identical optimized assets.
- Bookings, admin-added reviews and photos live in Lovable Cloud; built-in reviews/photos stay in code and are removed via `hidden_items`, merged in `src/lib/site-content.ts`, so static content and admin edits share one display path.
- Admin access is granted only by a database trigger for the confirmed owner email into `user_roles`; never check admin status client-side alone.
- Booking notifications use a wa.me click-to-chat link (no WhatsApp API), so the guest must press send.
