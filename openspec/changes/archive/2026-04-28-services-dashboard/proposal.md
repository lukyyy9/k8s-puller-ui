## Why

The current main "Get started" landing page serves no functional purpose for users who just logged in. Replacing the default placeholder view with a compact, tabular dashboard of all applications running in production will provide immediate situational awareness and value.

## What Changes

- Completely redesign the main `App` page (`Home` component).
- Introduce a compact spreadsheet-style table displaying application data.
- Integrate mock data representing a payload with `totalElements`, `totalPages`, `currentPage`, and an array of `services`.
- Each service in the mock data will display its `serviceName`, `clusterName`, `namespaceName`, `image`, and `serviceMaxCvssScore`.
- The data is loaded and displayed immediately upon the page mounting.

## Capabilities

### New Capabilities
- `applications-dashboard`: Covers the visualization of running services across clusters in a dedicated tabular view on the main application page.

### Modified Capabilities

- None

## Impact

- `src/App.jsx` will be heavily modified. The existing `Home` component (with the Vite/React logos, count button, and "Get started" text) will be replaced by the dashboard table component.