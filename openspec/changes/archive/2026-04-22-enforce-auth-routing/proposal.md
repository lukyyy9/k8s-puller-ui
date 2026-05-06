## Why

L'application possède désormais une intégration SSO Keycloak via BFF, mais l'accès aux pages reste public. Il est nécessaire de restreindre l'accès à toute l'application de sorte que seules les personnes authentifiées puissent voir les pages métier, et d'utiliser la page de login comme porte d'entrée par défaut. Cela sécurise l'application et offre une meilleure expérience utilisateur en redirigeant intelligemment selon l'état de session.

## What Changes

- Redéfinir la page `/login` comme page de garde et point d'entrée pour les utilisateurs non authentifiés.
- **BREAKING**: L'accès aux autres pages, y compris la route racine actuelle `/`, nécessitera une authentification valide.
- Si un utilisateur non authentifié tente d'accéder à l'application ou à une autre page, il est redirigé vers `/login`.
- Une fois connectés de manière validée, les utilisateurs sont redirigés automatiquement vers la page d'accueil sécurisée (ex: "Get started" / `/home`).

## Capabilities

### New Capabilities

*(None)*

### Modified Capabilities

- `user-authentication`: Renforcement des exigences d'authentification pour intégrer un accès gardé (Protected Routes) interdisant toute navigation à un utilisateur non-connecté et orchestrer les redirections automatiques.

## Impact

- `src/App.jsx` : Modification globale du routage pour intégrer des composants de type "Route Protégée".
- `src/pages/Login.jsx` : Modification pour gérer une redirection automatique (ex: `/home`) si l'utilisateur y accède alors qu'il est déjà authentifié.
- L'expérience globale de navigation et les tests E2E potentiels, qui devront désormais s'accommoder d'un cycle de connexion.