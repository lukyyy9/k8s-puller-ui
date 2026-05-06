## 1. Setup Theme Configuration

- [x] 1.1 Create `tailwind.config.js` if it doesn't exist to register the new primary brand color `#2C4583` as `primary` or `brand` (or decide to use arbitrary bracket notation).
- [x] 1.2 Document the newly created color constants to be injected into the existing Vite styling setup.

## 2. Refactor Components to use the New Primary Color

- [x] 2.1 Update `src/App.jsx` to replace `fuchsia-*` classes with the new primary color for buttons, selections, borders, and active pagination items.
- [x] 2.2 Update `src/components/ServiceKPIs.jsx` to replace `fuchsia-400` with the primary color scheme.
- [x] 2.3 Update `src/components/VulnerabilityDrawer.jsx` to replace `fuchsia-500` ring utilities.
- [x] 2.4 Update `src/components/ProtectedRoute.jsx` loading spinner to use the new primary color.
- [x] 2.5 Update `src/pages/ServiceDetails.jsx` to replace `fuchsia-500` loading spinner values with the new primary color.

## 3. Verification

- [x] 3.1 Verify that the primary action buttons correctly display the `#2C4583` color.
- [x] 3.2 Ensure focus rings, selections, and other interactive elements originally styling with fuchsia are consistent with the new brand color.
