## 1. Authentication Hook

- [x] 1.1 Créer un dossier `src/hooks` si manquant et y ajouter `useAuth.js`.
- [x] 1.2 Implémenter le hook `useAuth` utilisant `useState` et `useEffect` pour faire une requête `fetch` GET vers `/api/auth/me`.
- [x] 1.3 Retourner l'état `isAuthenticated` et un booléen `isLoading` dans le hook.

## 2. Interface de Login

- [x] 2.1 Mettre à jour `src/pages/Login.jsx` pour inclure le hook `useSearchParams` de `react-router-dom` afin de lire la variable `?error=`.
- [x] 2.2 Ajouter une bannière d'alerte rouge en haut du formulaire si l'erreur URL correspond à (ou indique) un échec OIDC (comme `OIDC_FAILED`).
- [x] 2.3 Remplacer le comportement du bouton "Sign in with Keycloak" pour faire un `window.location.href = 'http://localhost:8080/api/auth/oidc/redirect/keycloak'`.

## 3. Mise à jour de l'intégration dans l'application

- [x] 3.1 Importer et intégrer le hook `useAuth` dans un composant racine ou la page de routage (`src/App.jsx`) (même si aucune route n'est bloquée, cela validera globalement le comportement).