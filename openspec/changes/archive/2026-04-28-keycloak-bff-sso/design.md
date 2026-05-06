## Context

Nous passons d'une interface de login générique à une sécurisation réelle gérée par Keycloak. L'architecture respecte le pattern Backend-For-Frontend (BFF) : le code Vue/React (frontend) s'appuie sur le backend (Spring Boot) pour négocier la sécurité OIDC. Le frontend ne manipulera aucun Token OAuth2 directement. Il reposera sur une persistance gérée par cookie httponly déposé par le backend, validée via un appel GET `/api/auth/me`.

## Goals / Non-Goals

**Goals:**
- Déléguer l'URL de connexion complète à un endpoint du backend (par exemple `/api/auth/oidc/redirect/keycloak`).
- Gérer les erreurs (ex: `?error=OIDC_FAILED`) qui pourraient nous être retournées via un query param de l'URL pour renseigner l'utilisateur dans l'UI.
- Gérer l'identification de l'utilisateur actif (`isAuthenticated`) initialement via un appel à `/api/auth/me`.

**Non-Goals:**
- Mettre en place un routeur privé bloquant pour l'instant – l'objectif est d'abord le fonctionnement du Login et du hook pour obtenir le statut.
- Mettre en place le serveur Spring Boot. C'est présumé déjà supporté.
- Traiter un rafraîchissement manuel de token (le BFF s'en occupera nativement).

## Decisions

- **Choix d'identification des connexions (Hook React vs AuthProvider complet):** Nous commençons avec un simple hook `useAuth` qui vérifie le statut global. Ce hook sera injecté initialement à un niveau racine ou par page pour valider l'existence de la session via le backend BFF.
- **Stratégie d'erreur (Query parameters vs Local State):** Si le BFF échoue, il effectue un Redirect `HTTP 302` vers notre route `/login?error=OIDC_FAILED`. Nous utiliserons l'API `URLSearchParams` (ou `useSearchParams` de React Router) pour déclencher l'affichage visuel correspondant sans exposer l'utilisateur à des stack traces.

## Risks / Trade-offs

- [Risque de Cross-Site Scripting (XSS)] → Mitigé par l'utilisation du pattern BFF et de HttpOnly cookies pour la conservation du token.
- [Le hook `/api/auth/me` peut ralentir l'affichage initial] → Mitigé en acceptant l'état de chargement (`loading`) pendant lequel on attend l'information, et non en rendant immédiatement des pages protégées.