## 1. TopBar Component

- [x] 1.1 Create `src/components/TopBar.jsx` with a basic structure.
- [x] 1.2 Implement the floating behavior, rounded corners, and translucent background using Tailwind CSS (`fixed top-4 left-4 right-4 z-50 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-slate-700/50`).
- [x] 1.3 Add the application branding "k8s-puller UI" to the left side of the top bar components.

## 2. Authentication Hook Updates

- [x] 2.1 Update `src/hooks/useAuth.js` to expose a `logout` function.
- [x] 2.2 Implement the logic to send an empty POST to `/api/auth/logout`, clear local unauthenticated state, and then redirect to the local `/login` page instead of the keycloak server.

## 3. Integrating TopBar and Logout Button

- [x] 3.1 Fetch the authentication state (`isAuthenticated, isLoading`) and the `logout` function within `TopBar.jsx`.
- [x] 3.2 Conditionally render the "Log out" button on the right side if the user is authenticated.
- [x] 3.3 Bind the `logout` function to the "Log out" button.

## 4. Layout Updates

- [x] 4.1 Import `TopBar` into `src/App.jsx` and render it at the root of the application (e.g., inside the main Router or layout).
- [x] 4.2 Adjust the main padding or margins of the routes to ensure the floating TopBar doesn't overlap the top of the page content.