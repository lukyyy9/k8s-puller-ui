## 1. Remove Login Page

- [x] 1.1 Delete `src/pages/Login.jsx`
- [x] 1.2 Remove the `/login` route from `src/App.jsx`
- [x] 1.3 Remove any imports of `Login.jsx` across the application

## 2. Implement Direct Redirection

- [x] 2.1 Update authentication logic (e.g., in `ProtectedRoute.jsx` or `useAuth.js`) to trigger Keycloak login directly instead of navigating to `/login` when a user is unauthenticated.
- [x] 2.2 Verify that the original requested route is preserved and correctly redirected back to after successful authentication in Keycloak.

## 3. Testing and Verification

- [x] 3.1 Test accessing a protected route as an unauthenticated user to ensure direct redirection to the Keycloak login screen.
- [x] 3.2 Test successful authentication and redirection back to the requested app route.