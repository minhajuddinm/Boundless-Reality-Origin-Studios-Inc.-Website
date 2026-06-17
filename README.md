# BROS Inc. — Boundless Reality Origin Studios

Accessibility-first VR game studio website. Features an immersive 3D scroll-driven experience for users with motion enabled, and a fully accessible static layout for users who prefer reduced motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## How the scroll-camera system works

### Architecture overview

```
Home.tsx
├── Fixed div (z-0, aria-hidden, pointer-events: none)
│   └── JourneyScene.tsx   ← 3D canvas, always full-viewport
└── Relative div (z-10, scrollable)
    └── JourneyHome.tsx    ← all semantic HTML content
```

The 3D canvas lives in a `position: fixed` layer behind the page. It is marked `aria-hidden="true"` so screen readers skip it entirely — all content lives in real semantic DOM above it. The canvas container has `pointer-events: none` so scroll and click events pass through to the content layer.

### Scroll tracking

`Home.tsx` attaches a passive `scroll` listener to `window` and writes `scrollY / (scrollHeight - innerHeight)` into a `MutableRefObject<number>`. This ref is passed to `JourneyScene` and read every frame via `useFrame` — no React re-renders triggered, zero overhead.

### Camera rig

Six waypoints define the journey (one per station):

| t    | Station          | Camera position       | Look-at target       |
|------|------------------|-----------------------|----------------------|
| 0.0  | Hero             | `[0, 0, 12]`          | `[0, 0, 0]`          |
| 0.2  | Mission          | `[1.5, 0.5, 5]`       | `[0, 0, 2]`          |
| 0.4  | Eyes of the Soul | `[0, 0, -2]`          | `[0, 0, -9]`         |
| 0.6  | Approach         | `[-1.5, 0, -12]`      | `[0, 0, -16]`        |
| 0.8  | Founders         | `[0, 1.5, -20]`       | `[0, 0.5, -24]`      |
| 1.0  | Contact          | `[2, 3, -16]`         | `[0, 1.5, -22]`      |

Two `CatmullRomCurve3` splines (position + look-at) are built from these points. Each frame:

```
t = clamp(scrollRef.current, 0, 0.999)
posSpline.getPoint(t, targetPos)
lookSpline.getPoint(t, targetLook)

α = 1 - exp(-4 * deltaTime)   // frame-rate-independent lerp factor
smoothPos  = lerp(smoothPos,  targetPos,  α)
smoothLook = lerp(smoothLook, targetLook, α)

camera.position.copy(smoothPos)
camera.lookAt(smoothLook)
// + small sine-wave idle drift layered on top
```

The exponential lerp makes movement feel weighty — fast acceleration, long ease-out.

### Sonar pulses

`SonarRing` components sit at fixed world-space positions (`z = 0, -5, -10, …, -30`). Each ring uses a local time counter that loops at its `speed` value, mapping to a 0→1 progress that drives both scale and opacity.

### Adding or reordering stations

**Add a station:**
1. Add a waypoint to `CAM_POS` and `CAM_LOOK` in `JourneyScene.tsx`.
2. Add the station component to `JourneyHome.tsx` at the right DOM position.
3. Add the section `id` to `navLinks` in `Nav.tsx` if needed.

**Reorder stations:** move the `<Station />` in `JourneyHome.tsx` and its matching waypoint pair in `CAM_POS`/`CAM_LOOK` in the same order.

**Control travel time:** increase `min-height` on a section to give the camera more scroll distance on that segment.

## Accessibility

- `prefers-reduced-motion` is detected on load and disables all 3D/animation, switching to a clean static layout. The **Motion On/Off** button in the nav lets users toggle at any time.
- The 3D canvas is `aria-hidden="true"` — screen readers see only real semantic HTML.
- Glass scrims (`rgba(4,6,10,0.62)` + `backdrop-filter: blur`) behind overlaid text ensure WCAG AA contrast.
- Focus never enters the canvas. All interactive elements are in the DOM layer.
- Mobile: particle counts halved, post-processing disabled, camera rig remains active.

## Placeholders to replace

| Item | Where |
|------|-------|
| Founder headshots | Replace initials avatars in `FoundersStation` (`JourneyHome.tsx`) |
| LinkedIn URLs | `href="#"` in each founder card |
| Social media URLs | `href="#"` in `ContactStation` |
| Logo asset | `Nav.tsx` — currently a CSS ring/dot |
| Game screenshots | `public/gameplay.jfif`, `public/sonar.jfif` |

## Stack

React 18 · Vite · TypeScript · @react-three/fiber · @react-three/drei · @react-three/postprocessing · Framer Motion · Tailwind CSS · React Router
