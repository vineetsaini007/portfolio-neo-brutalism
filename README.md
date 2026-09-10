# Vineet Saini — developer portfolio

A responsive, reference-inspired portfolio with an original SVG architecture, project concepts, a skills dashboard, an animated terminal, and accessible project dialogs.

## Edit content

`data/portfolio.ts` contains the profile, project descriptions, technology groups, contact URLs, CV URL, employment, and education. Project interfaces are illustrative concepts, not screenshots of verified deployed products. Add verified project links and career details before public sharing. Empty employment data displays areas of technical practice, not invented job history. Unprovided contact information is explained in the contact dialog; CV download becomes available when `profile.cv` is set.

## Development

- `npm install`
- `npm run dev` (port 5173)
- `npx tsc --noEmit`
- `npm run build`

The Sites starter uses Vinext with Next.js App Router conventions, React 19, TypeScript, and Tailwind CSS. GSAP/ScrollTrigger handles viewport motion; Framer Motion handles card interactions. Motion effects and the decorative cursor respect reduced-motion preferences. Dialogs support focus trapping and Escape via Radix UI.

## Structure

- `app/`: route, metadata, shared styles
- `components/graphics/`: original isometric SVG and illustrative project previews
- `components/sections/`: portfolio sections and dialogs
- `components/animations/`: scoped scroll animation and pointer enhancements
- `data/portfolio.ts`: editable portfolio content

Google Fonts are loaded from the Google Fonts stylesheet, with system fallbacks. No backend, contact submission, or private API credentials are required.
