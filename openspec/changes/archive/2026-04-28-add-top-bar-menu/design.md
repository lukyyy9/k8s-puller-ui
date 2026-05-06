## Context

The current `k8s-puller-project` UI application does not provide a global navigation bar. Users cannot easily see the application name or interact with session controls (like logging out) once they are authenticated and redirected to the home view. This limits both branding and usability.

## Goals / Non-Goals

**Goals:**
- Provide a persistent top navigation bar that floats above the main UI content.
- Ensure the bar follows the modern, dark "glassmorphism" theme (translucent, rounded corners).
- Display the application name "k8s-puller UI" on the left.
- Conditionally display a "Log out" button on the right if the user is currently authenticated via the BFF.
- Implement the actual logout logic to destroy the user's session securely.

**Non-Goals:**
- Creating a sidebar or complex multi-page navigation menus.
- Modifying the existing Keycloak configuration or SSO flows directly, beyond triggering a standard logout.

## Decisions

1. **TopBar Component (`src/components/TopBar.jsx`)**: 
   A dedicated component will be created to house the navigation bar. It will be positioned fixed or sticky at the top, utilizing Tailwind classes like `backdrop-blur-md`, `bg-slate-900/60`, and `rounded-2xl` to achieve the requested visual style.

2. **Integration into `App.jsx`**:
   The `TopBar` will be rendered within `App.jsx` so it spans across protected and unprotected routes (or just inside a main layout wrapper). This ensures it remains visible across the entire application lifecycle.

3. **Logout Logic via `useAuth.js`**:
   The `useAuth` hook will be extended or modified to support a `logout` function. The function will issue a request (typically `POST /api/auth/logout`) to the Spring Boot backend to terminate the session. Given the BFF architecture, the backend clears the HttpOnly cookie and initiates the OIDC logout. Upon successful completion, the frontend will navigate back to the `/login` view or reload.

## Risks / Trade-offs

- **Risk: Layout overlapping**: The fixed/sticky top bar might obscure content at the top of the existing pages.
  *Mitigation*: Add adequate padding to the top of the main content container in `App.jsx` to push the page contents below the navigation bar.
- **Risk: Logout complexity**: Depending on the Spring Boot implementation of OIDC logout, a simple fetch to `/logout` might require a redirect.
  *Mitigation*: The log out function will trigger a full page redirect to a backend endpoint like `http://localhost:8080/api/auth/logout` if the standard fetch request requires user-agent navigation to clear Keycloak central session.