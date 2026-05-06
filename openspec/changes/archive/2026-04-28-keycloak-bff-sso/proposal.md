## Why

Actuellement, l'application possède une interface de connexion, mais aucune intégration SSO via Keycloak n'est encore implémentée de bout en bout. Nous devons migrer vers un pattern Backend For Frontend (BFF) pour déléguer toute la logique de sécurité OIDC et la manipulation du token au backend Spring Boot. L'application frontend ne doit manier strictement aucun secret.

## What Changes

- Remplacement du mécanisme de connexion natif par une redirection vers la route d'authentification OIDC du backend BFF.
- Création d'un hook `useAuth` pour vérifier l'état de session au montage ou après une redirection `/api/auth/me`.
- Gestion des erreurs OIDC transmises via les query parameters (`?error=OIDC_FAILED`) afin d'afficher des messages pertinents sur l'UI du composant Login existant.

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `user-authentication`: Refonte des exigences de connexion pour supporter une délégation complète de l'Authentication Code Flow vers un backend BFF (Keycloak). L'application délègue l'authentification et ne gère qu'un état validé.

## Impact

- Le composant `Login.jsx` (redirections, UI paramétrable).
- Routage principal (besoin d'intégrer le hook Auth pour la validation de session).
- Mises à jour des spécifications relatives à la connexion de l'utilisateur.