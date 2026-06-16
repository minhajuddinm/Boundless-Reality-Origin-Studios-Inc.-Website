# BROS Inc. — Marketing Website

**Boundless Reality Origin Studios Inc.** — accessibility-first indie game studio.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Tech stack

| Layer | Library |
|---|---|
| UI | React 18 + TypeScript |
| Bundler | Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| 3D | React Three Fiber + Drei + Three.js |
| Routing | React Router v6 |

## Swapping in real assets

All placeholder spots are marked with `{/* PLACEHOLDER: … */}` comments in the source. Here is a quick map:

### Studio logo
- **`src/components/Nav.tsx`** — Replace the letter `B` circle with an `<img>` pointing to your logo file.
- **`src/sections/Footer.tsx`** — Same, footer logo mark.

### Game screenshots
- **`src/sections/FlagshipGame.tsx`** — The `<ScreenshotPlaceholder>` components. Replace with `<img src="…" alt="…" className="w-full h-full object-cover" />` inside the containing `div`.

### Game trailer
- **`src/sections/FlagshipGame.tsx`** — The trailer placeholder div. Replace with an `<iframe>` (YouTube/Vimeo embed) or `<video>` tag.

### Founder headshots
- **`src/pages/Founders.tsx`** — Inside each `FounderCard`, find the `role="img"` div with the initials avatar. Replace the inner content with:
  ```tsx
  <img src="/assets/founders/firstname-lastname.jpg" alt="Founder Name" className="w-full h-full object-cover" />
  ```
  Recommended size: **400×520 px**, aspect ratio ~3:4.

### Contact / social URLs
- **`src/sections/Contact.tsx`** — Replace `href` values on social icon links.
- **`src/sections/Contact.tsx`** — Replace `mailto:hello@brosinc.studio` with the real email.
- **`src/pages/Founders.tsx`** — Replace `href="#"` LinkedIn links per founder.

## Accessibility features

- Skip-to-main-content link at top of page
- All interactive elements have visible `:focus-visible` outlines (2 px cyan)
- ARIA labels on nav, landmarks, cards, icon links
- 3D canvas has `aria-hidden="true"` and `tabIndex={-1}` — it will not trap keyboard focus
- `prefers-reduced-motion` respected via `MotionContext` — heavy animation and 3D are disabled automatically
- Manual **Motion On / Motion Off** toggle in the nav bar (also in the mobile menu)
- WCAG AA color contrast on all text
- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)

## Project structure

```
src/
  components/     Nav.tsx
  context/        MotionContext.tsx
  hooks/          useReducedMotion.ts
  pages/          Home.tsx, Founders.tsx
  sections/       Hero, Mission, FlagshipGame, Approach, Contact, Footer
  three/          SonarScene.tsx
  App.tsx
  main.tsx
  index.css
public/
  favicon.svg
```
