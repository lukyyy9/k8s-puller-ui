## Why

The current theme uses an imprecise color scheme, with primary buttons using `fuchsia-400`. We need to define a more precise, official branding color scheme in our specifications, specifically using `#2C4583` for primary actions. The existing `modern-theme` spec is underutilized and needs to be updated to formalize these choices.

## What Changes

- Update the primary button color from `fuchsia-400` to `#2C4583`.
- Formalize other existing theme colors in the `modern-theme` specification.
- Ensure the application properly uses the new primary color for buttons and interactive elements where applicable.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `modern-theme`: Updating the specified color palette to explicitly define primary actions (e.g., `#2C4583`) and formally document the other existing colors being used by the application.

## Impact

- `src/App.jsx` (and any other components using `fuchsia-400` or `fuchsia-500` for primary button actions via Tailwind).
- `openspec/specs/modern-theme/` specifications.
- Tailwind config might also be impacted if we need to add a custom color, or we can use arbitrary values `bg-[#2C4583]`.