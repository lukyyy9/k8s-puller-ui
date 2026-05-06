## 1. Setup and Installation

- [x] 1.1 Install `tailwindcss` and `@tailwindcss/vite` dependencies via npm.
- [x] 1.2 Update `vite.config.js` to include the `@tailwindcss/vite` plugin.
- [x] 1.3 Replace the contents of `src/index.css` with the fundamental `@import "tailwindcss";` directive and basic body styling for dark mode.

## 2. Removing Legacy Boilerplate

- [x] 2.1 Remove or significantly strip `src/App.css` to remove the default Vite styling.
- [x] 2.2 Remove `src/pages/Login.css` as styles will be inline classes.

## 3. Applying 2026 Dark Design Utilities

- [x] 3.1 Update `src/App.jsx` to utilize dark theme Tailwind utility classes.
- [x] 3.2 Update `src/pages/Login.jsx` form and design elements to utilize Tailwind classes and a modern dark aesthetic.
- [x] 3.3 Ensure the background and text color of the root layout align with the dark scheme (e.g., `bg-slate-900`, `text-slate-100`).