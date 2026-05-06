## Context

The UI application was initialized with Vite's standard React template. The current look and feel consist of boilerplate styles and an out-of-the-box light/dark mode approach depending on the browser. We want to update the aesthetic to a modern "2026 dark design" and adopt Tailwind CSS, the industry standard utility-first CSS framework, replacing the current vanilla CSS approach.

## Goals / Non-Goals

**Goals:**
- Eliminate pure CSS files holding boilerplate (e.g., heavily modifying `App.css`, `index.css`, `Login.css`).
- Setup Tailwind CSS as a Vite plugin via PostCSS.
- Enable `dark` mode globally using Tailwind features to provide deep blacks, subtle gradients, and glowing accents synonymous with "2026 design trends."
- Replace raw CSS references with their Tailwind utility equivalents in existing components (`App.jsx`, `Login.jsx`).

**Non-Goals:**
- Introduce a full component library like shadcn/ui or MUI; we are just applying Tailwind CSS utilities.
- Add complex animation libraries if simple Tailwind transitions suffice.

## Decisions

- **Framework integration**: The integration will follow the standard Tailwind CSS setup instructions for Vite: install `tailwindcss`, `@tailwindcss/vite`, configure `vite.config.js` and input the base directives into `index.css`.
- **Dark Mode Strategy**: Default the entire app to a dark dark-grey/black background (e.g., `bg-slate-900`) and white/light text. By setting the `class="dark"` logic at the root HTML or employing tailwind's dark mode media features, the modern design will lock in.
- **Cleanup Strategy**: Rather than keeping unused CSS rules around, aggressive pruning of CSS files (`index.css`, `App.css`, `Login.css`) will occur. Only base Tailwind imports (`@import "tailwindcss";`) will exist in `index.css`.

## Risks / Trade-offs

- **Risk**: Rapidly rewriting styles can break unexpected layouts from the boilerplate (like SVG positioning).
  **Mitigation**: Review the components thoroughly and remap flexbox/grid alignments. Ensure no functionality breaks, purely presentation.
- **Trade-off**: The markup sizes increase due to utility classes in JSX. However, the developer speed and maintainability gain offset this significantly.