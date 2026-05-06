## Context

Actuellement, l'application possède une UI de connexion (`/login`) et un point d'entrée (`/`) sur la page "Get Started" qui, ainsi que les autres routes (comme `DependencySearch`), restent librement accessibles à tous. Avec l'introduction d'un login SSO, nous devons renforcer la sécurité et restreindre toutes les pages applicatives.

## Goals / Non-Goals

**Goals:**
- Mettre en place un wrapper `ProtectedRoute` pour conditionner l'accès aux pages qui nécessitent une authentification.
- Rediriger automatiquement vers `/login` les personnes non authentifiées essayant d'accéder aux routes de l'application.
- Rediriger un utilisateur connecté et actif sur `/login` automatiquement vers `/` ("Get Started").
- Proposer une expérience claire sans "scintillement" (FOUC: Flash of Unauthenticated Content) durant le contrôle du token.

**Non-Goals:**
- Implémenter des autorisations complexes (RBAC/Roles). Nous gérons un état d'authentification binaire pour le moment.
- Persister des informations complexes côté client (tout est toujours géré par BFF et cookie httpOnly).

## Decisions

- **Utilisation d'un composant `ProtectedRoute` au niveau routeur:**
  Idéal pour englober dans `Routes` (ex: `element={<ProtectedRoute><Home /></ProtectedRoute>}`) toutes les zones sécurisées.
  - *Alternatives considérées*: Appliquer le blocage manuellement à l'intérieur de chaque composant ou refaire un composant route spécifique. L'utilisation d'un wrapper réutilisable en utilisant le hook existant `useAuth` est la norme dans React Router v6.
- **Gestion de l'état `isLoading` du Hook Auth:**
  Le `ProtectedRoute` retournera une interface temporaire "Loading..." ou vide tant que `isLoading` du `useAuth` hook est `true`, afin d'éviter la redirection inopportune en cours de vérification de session avec le backend.

## Risks / Trade-offs

- [Boucle de redirection] → Mitigé par une vérification stricte `isAuthenticated` combinée au flag `isLoading` et une conception isolée pour la page de Login (qui elle ne se trouve pas derrière le `ProtectedRoute`).
- [Expérience visuelle bloquée durant le "Loading"] → Un loader léger sera affiché pour préserver le feedback visuel pendant la requête initiale HTTP.