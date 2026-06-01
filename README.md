# Buschkoetter's Nursery, Lawn & Garden Center

Single-page marketing site for **Buschkoetter's Nursery, Lawn & Garden Center, Inc.** — a family-owned nursery in Jasper, Indiana, serving Dubois County since 1978.

Built from the *A Light in the Sky* design handoff (`design_handoff_buschkoetter_nursery`). Static HTML/CSS with a small vanilla-JS file for scroll-reveal, header condense, the mobile menu, and today's-hours highlighting — no build step, no runtime framework.

## Business

- **Address** — 1638 N 350 W (Hwy 56), Jasper, IN 47546
- **Phone** — (812) 482-5577
- **Hours** — Mon–Fri 8:00–5:30 · Sat 8:00–4:00 · Sun Closed
- **Service area** — Dubois County / Southwestern Indiana

## Structure

```
index.html              # the page (all sections, JSON-LD, meta/OG)
css/
  colors_and_type.css   # design tokens (Bark accent baked in)
  kit.css               # shared component styles
  nursery.css           # site-specific styles
js/main.js              # scroll-reveal, header, mobile nav, hours, year
assets/
  logo/                 # Buschkoetter's seal (svg/png)
  photos/               # 12 production photos
```

## Notes on the build

- Design system ported verbatim from `colors_and_type.css`; only the `tree`/Bark accent is kept (other theme presets and the in-design tweak panel were stripped per the handoff).
- Fonts (Archivo + JetBrains Mono) load from Google Fonts.
- Lucide icons and the heritage seal are inlined as SVG — no icon CDN at runtime.
- The Visit-section map is a real Google Maps embed of the address (the handoff shipped a stylized placeholder).
- Scroll-reveal uses `IntersectionObserver`.
- "Built by A Light in the Sky" credit is retained in the footer.

## Deploy

No build step. Hosted on Vercel; pushes to `main` auto-deploy.
