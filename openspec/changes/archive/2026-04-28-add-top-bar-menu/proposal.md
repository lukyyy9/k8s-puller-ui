## Why

A top navigation bar is needed to provide consistent branding and quick access to core user actions like logging out. It enhances the modern UI feel and gives users a persistent way to manage their session.

## What Changes

- Add a global top navigation bar that renders above the main application view.
- The bar will have rounded corners and be translucent (glassmorphism effect).
- Display "k8s-puller UI" on the left side of the bar.
- Display a working "Log out" button on the right side of the bar, visible only if the user is currently signed in.
- The log out button will invoke the backend logout endpoint and redirect the user or clear the local authentication state.

## Capabilities

### New Capabilities

- `top-navigation`: Covers the rendering and layout of the new top navigation bar, including the application title and conditionally rendered actions.

### Modified Capabilities

- `user-authentication`: Adding the logout requirement. The user must be able to log out from the application, clearing their session and updating the UI state accordingly.

## Impact

- `src/App.jsx` or a layout component will be modified to include the new top bar.
- `src/hooks/useAuth.js` or equivalent might need a `logout` function if not already present.
- UI layout will be slightly adjusted to accommodate the top bar without overlapping main content.