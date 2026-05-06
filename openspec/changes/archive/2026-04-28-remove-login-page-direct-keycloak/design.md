## Context

Currently, unauthenticated users are redirected to a local `/login` route (`src/pages/Login.jsx`), which presents a button that triggers the actual Keycloak authentication flow. This intermediate step introduces friction and is unnecessary for SSO integrations where the identity provider (Keycloak) should handle the entire login experience.

## Goals / Non-Goals

**Goals:**
- Eliminate the `/login` route and the `Login.jsx` component.
- Automatically redirect unauthenticated users directly to Keycloak's login page.
- Ensure that after successful authentication to Keycloak, users are redirected back to the originally requested route within the application.

**Non-Goals:**
- Modifying the underlyingKeycloak configuration or realm settings.
- Changing the authentication token storage or refresh logic (unless strictly required to support the direct redirect).

## Decisions

1.  **Remove `Login.jsx` and `/login` Route**: The `Login.jsx` file and its corresponding route definition in `App.jsx` will be completely removed.
2.  **Update `ProtectedRoute` or `useAuth` hook**: The logic that previously navigated the user to `/login` when unauthenticated will be updated to directly invoke the Keycloak login method (e.g., `keycloak.login()`).
3.  **Preserve Intent Route**: Before redirecting to Keycloak, the application must ensure it captures the current route so that Keycloak can redirect back to it upon successful authentication. This is usually handled natively by the Keycloak client adapter if configured correctly, but we must verify this behavior is preserved without the intermediate login page.

## Risks / Trade-offs

-   **Risk**: The Keycloak client might not be fully initialized when an unauthenticated route is accessed, potentially causing the direct login call to fail or behave unexpectedly.
    -   **Mitigation**: Ensure the authentication check and redirection logic waits for Keycloak initialization to complete before triggering the login. Use appropriate loading states if necessary.
-   **Risk**: Loss of application state during the redirect if not handled properly by the Keycloak adapter.
    -   **Mitigation**: Verify that the Keycloak client adapter is configured to use the current URL as the redirect URI.