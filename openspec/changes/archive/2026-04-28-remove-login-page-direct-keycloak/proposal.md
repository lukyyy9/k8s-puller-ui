## Why

The current login flow requires users to navigate to a login page and then click a button to authenticate with Keycloak. This adds unnecessary friction to the user experience. By redirecting directly to Keycloak, we can streamline the authentication process and improve user convenience.

## What Changes

- Complete removal of the `Login.jsx` page and its associated route.
- Any unauthenticated access that would previously redirect to the login page will now directly initiate the Keycloak login flow.
- Ensure the callback from Keycloak correctly restores the desired application state without relying on the intermediate login page.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `user-authentication`: The authentication flow is changing from an intermediate login page to a direct redirect to Keycloak.

## Impact

- `src/pages/Login.jsx` will be deleted.
- `src/App.jsx` routing will be updated to remove the login route and adjust the fallback/unauthenticated behavior.
- `src/hooks/useAuth.js` or wherever the redirect logic is housed will need to be updated to trigger the Keycloak login directly instead of navigating to `/login`.
