# Animation Showcase Knowledge

## Motion for React

- In this Remix project, use `framer-motion` imports for the Motion React API.
- Use `MotionConfig reducedMotion="user"` at the route or feature boundary so transform and layout animations respect the visitor's reduced-motion preference.
- Use `layout` for list/card size and position changes. Use `layoutId` for shared element transitions between related UI states.
- Use `AnimatePresence` for exit transitions only when elements leave the tree. Avoid modal previews when an inline detail panel keeps the page lighter.
- Use `useScroll`, `useTransform`, and `useSpring` for scroll progress bars, parallax, SVG path drawing, and mapped color/opacity values.
- Use the Motion MCP CSS spring generator for reusable Tailwind/CSS `linear()` springs.

## GSAP React

- Use `@gsap/react` `useGSAP()` with a scoped container ref. Register `useGSAP` and GSAP plugins before use.
- Prefer scoped selectors inside `useGSAP` and let `gsap.context()` cleanup route animations on unmount.
- Use `window.matchMedia('(prefers-reduced-motion: reduce)')` to replace transform-heavy sequences with immediate visible states.
- Animate `transform` and `autoAlpha` for smooth performance. Avoid animating layout properties when transform equivalents are possible.
- Use `ScrollTrigger.batch()` for repeated reveal groups and scrubbed timelines for scroll-linked progress.
- Use `SplitText.create()` for headline reveals. Split only the needed units, use `aria: 'auto'`, and call `revert()` during cleanup.
- Use `Flip.getState()` then `Flip.from()` for UI state changes where cards/tabs would otherwise jump.
- Use `Observer.create()` for wheel/touch/pointer intent without manually juggling browser input events.
- Use `InertiaPlugin.track()` and inertia tweens for restrained glide/momentum interactions.
- Use `Physics2DPlugin` sparingly for subtle particles or accent motion. It is not a full physics engine.
- Use `ScrollSmoother` only when the page has the required wrapper/content structure and skip it for reduced motion or contexts where native scroll must remain untouched.

## Current Showcase Routes

- `app/routes/summit-realty.tsx` uses Motion layout transitions, scroll-linked values, SVG path drawing, gestures, and the Motion MCP CSS spring.
- `app/routes/novadent-clinic.tsx` uses GSAP `useGSAP`, `SplitText`, `ScrollTrigger`, and `Flip` for a calm clinic site.
- `app/routes/atlas-legal.tsx` uses GSAP `ScrollSmoother`, `ScrollTrigger`, `SplitText`, `Observer`, `InertiaPlugin`, and `Physics2DPlugin` for a restrained legal site.
