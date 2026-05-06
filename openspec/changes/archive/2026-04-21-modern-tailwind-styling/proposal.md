## Why

The current React/Vite boilerplate styling is basic and doesn't represent the modern, polished look expected of a 2026 web application. By introducing Tailwind CSS and adopting a beautiful 2026 dark design system, we can significantly elevate the user experience, brand perception, and developer velocity for styling.

## What Changes

- Remove the default Vite boilerplate CSS styles.
- Install and configure Tailwind CSS in the project.
- Implement a modern 2026 dark mode design system as the default.
- Refactor existing global styles to use Tailwind utilities.
- Update the layout and appearance of existing components (such as App.jsx and Login.jsx) with the new dark theme.
- **BREAKING**: Existing inline styles and CSS class reliance without Tailwind utility mapping might need overhaul.

## Capabilities

### New Capabilities
- `modern-theme`: Provides the foundation for a 2026 dark design system relying on Tailwind CSS utilities across the application.

### Modified Capabilities

None

## Impact

- All UI components will have their styling mechanism shifted to Tailwind utilities.
- `index.css` and `App.css` will be heavily modified or simplified to basic Tailwind imports.
- Addition of PostCSS and Tailwind to the build pipeline dependencies (`package.json`, `vite.config.js`).