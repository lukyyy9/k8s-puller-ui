## MODIFIED Requirements

### Requirement: User Login Flow

The application MUST authenticate users via the configured Keycloak SSO provider.

#### Scenario: Unauthenticated access to protected route

- **WHEN** an unauthenticated user attempts to access any protected route (e.g., `/`)
- **THEN** they MUST be immediately redirected to the Keycloak login page without passing through an intermediate `/login` route.

#### Scenario: Authentication callback

- **WHEN** a user successfully authenticates and is redirected back from Keycloak
- **THEN** they MUST be authenticated and able to access the requested protected resources.

## REMOVED Requirements

### Requirement: Dedicated Login Page

**Reason**: This requirement is superseded by the direct Keycloak redirection flow, eliminating the extra step in the user experience.

**Migration**: The `Login.jsx` component and the `/login` route will be removed. The direct redirection logic will handle unauthenticated access.