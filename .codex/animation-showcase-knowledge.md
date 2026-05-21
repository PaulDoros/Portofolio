# Animation Showcase Knowledge

## Motion for React

- In this Remix project, use `framer-motion` imports for the Motion React API.
- Use `MotionConfig reducedMotion="user"` at the route or feature boundary so transform and layout animations respect the visitor's reduced-motion preference.
- Use `layout` for list/card size and position changes. Use `layoutId` for shared element transitions between related UI states.
- Use `AnimatePresence` for exit transitions only when elements leave the tree. Avoid modal previews when an inline detail panel keeps the page lighter.
- Use `useScroll`, `useTransform`, and `useSpring` for scroll progress bars, parallax, SVG path drawing, and mapped color/opacity values.
- Use `useMotionTemplate` for pointer-driven CSS strings such as spotlight gradients and filter/shadow composition.
- Use `useAnimate` for scoped imperative sequences, but only target elements inside that scope.
- Use `Reorder` plus `useDragControls` for drag-to-rank or priority-list interfaces.
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
- Use `Draggable` with `InertiaPlugin` for physical controls like sliders, rails, and carousels.
- Use `ScrambleTextPlugin` and `DrawSVGPlugin` when the concept benefits from text/state transformation or SVG line-drawing, not as generic decoration.

## Current Showcase Routes

- `app/routes/summit-realty.tsx` is a map/search workspace using Motion `Reorder`, `useDragControls`, `useAnimate`, `useMotionTemplate`, shared layout, and scroll-linked SVG path drawing.
- `app/routes/novadent-clinic.tsx` is a triage/check-in journey using GSAP `SplitText`, pinned `ScrollTrigger`, `Flip`, `Observer`, `Draggable`, and `InertiaPlugin`.
- `app/routes/atlas-legal.tsx` is a dossier/briefing experience using GSAP `ScrollSmoother`, `SplitText`, `ScrambleTextPlugin`, `DrawSVGPlugin`, `Observer`, `InertiaPlugin`, and `Physics2DPlugin`.
