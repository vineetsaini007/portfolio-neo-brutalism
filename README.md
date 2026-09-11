# Vineet Saini — developer portfolio
A responsive, reference-inspired portfolio with an original SVG architecture, project concepts, a skills dashboard, an animated terminal, and accessible project dialogs.


## Development

- `npm install`
- `npm run dev` (port 5173)
- `npx tsc --noEmit`
- `npm run build`

## Structure

- `app/`: route, metadata, shared styles
- `components/graphics/`: original isometric SVG and illustrative project previews
- `components/sections/`: portfolio sections and dialogs
- `components/animations/`: scoped scroll animation and pointer enhancements
- `data/portfolio.ts`: editable portfolio content

Google Fonts are loaded from the Google Fonts stylesheet, with system fallbacks. No backend, contact submission, or private API credentials are required.


## Interaction system

`hooks/useMotionScope.ts` scopes GSAP animations and ScrollTriggers with `matchMedia`, reverting them on unmount and preference changes. Event listeners, animation frames, SplitText instances and custom DOM changes register cleanup alongside the GSAP context. `components/animations/Animations.tsx` defines distinct section sequences; `TerminalText.tsx` owns the one-shot command timeline.

Motion uses transforms and rectangular clipping. Natural line masks reflow with fonts and viewport width. Marquee and grid signals pause offscreen or in hidden tabs. Fine-pointer parallax uses cached hit rectangles and reusable `quickTo` tweens. Reduced-motion mode leaves content fully visible, disables decorative loops/pointer movement and shows the complete terminal transcript.

Numeric stats count once on entry; text metrics stay textual. Education and certification rows participate in the sequential row reveal.

Run bounded-speed and pointer-limit checks with `node --test --test-isolation=none tests/motion.test.mjs`.
