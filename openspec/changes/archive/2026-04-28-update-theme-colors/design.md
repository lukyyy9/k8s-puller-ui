## Context

The current `modern-theme` specification is underutilized. The application uses hardcoded Tailwind utility classes (like `fuchsia-400` or `fuchsia-500`) for primary buttons and interactive components. We need to formalize the color palette in our specifications to ensure consistency, specifically updating the primary action color to `#2C4583`.

## Goals / Non-Goals

**Goals:**
- Formally document the existing background and text colors in the `modern-theme` specification.
- Standardize the primary action color to `#2C4583` across the application.
- Update Tailwind classes to use arbitrary values `[#2C4583]` or add a custom color to `tailwind.config.js` to replace the "fuchsia" references.

**Non-Goals:**
- Completely redesigning the application's layout.
- Changing colors other than the primary action color.
- Changing the overall dark mode styling (`bg-slate-900`, `text-slate-200`, etc.), just formally specifying them.

## Decisions

- **Tailwind Configuration vs. Arbitrary Values:** We will add the primary color `#2C4583` to the Tailwind configuration (e.g., as `primary` or `brand-primary`) to avoid scattering arbitrary values like `bg-[#2C4583]` throughout the codebase. If no `tailwind.config.js` is present, we'll create/update it.
- **Specification First:** We will update the `modern-theme` `spec.md` first to reflect this brand update, then perform the code replacements for fuchsia classes in `App.jsx` and other components.

## Risks / Trade-offs

- **Risk:** Some `fuchsia` utility classes might be used for non-primary actions or decorative elements where `#2C4583` might not look appropriate.
  - **Mitigation:** Carefully review usages of `fuchsia` in the codebase before applying a blanket replacement, focusing on primary buttons and interactive elements as requested.
