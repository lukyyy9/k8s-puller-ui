## 1. Protected Route Component

- [x] 1.1 Create `src/components/ProtectedRoute.jsx`.
- [x] 1.2 Implement the component to use the `useAuth` hook.
- [x] 1.3 Display a simple "Loading..." state if `isLoading` is true.
- [x] 1.4 Render a `<Navigate to="/login" replace />` if `isAuthenticated` is false.
- [x] 1.5 Render `children` if authenticated.

## 2. Update Application Routing

- [x] 2.1 Update `src/App.jsx` to import `ProtectedRoute`.
- [x] 2.2 Wrap the `<Home />` (`/`) and `<DependencySearch />` (`/search-dependency`) components within the `<ProtectedRoute>` to secure them.
- [x] 2.3 Update the `<Login />` component in `src/pages/Login.jsx` to check auth status and use `<Navigate to="/" replace />` if `isAuthenticated` is true, keeping a "Loading..." check first.