## MODIFIED Requirements

### Requirement: Keycloak SSO Login Option
The system SHALL provide a login button for "Sign in with Keycloak" which redirects directly to the backend's OIDC initiation endpoint (`/api/auth/oidc/redirect`) using a browser redirect (`window.location.href`).

#### Scenario: Clicking Keycloak SSO
- **WHEN** the user clicks the "Sign in with Keycloak" button
- **THEN** the system triggers a full browser redirect to the BFF OIDC redirect endpoint `http://localhost:8080/api/auth/oidc/redirect/keycloak`


## ADDED Requirements

### Requirement: Global Authentication Validation
The system SHALL perform a session validation upon accessing the application using a `useAuth` hook calling the backend (`GET /api/auth/me`).

#### Scenario: Valid session check on mount
- **WHEN** the application mounts and the user has a valid HttpOnly cookie
- **THEN** the API returns a success response and the user is considered authenticated

#### Scenario: Invalid session check on mount
- **WHEN** the application mounts and the user lacks authentication via the backend
- **THEN** the API returns an error/empty state, and the user is redirected or kept on the login interface

### Requirement: Authentication Error Handling via Query Parameters
The system SHALL parse query parameters on the `/login` route to detect authentication errors returned by the BFF (e.g., `?error=OIDC_FAILED`) and display a clear, styled error message to the user.

#### Scenario: Displaying an OIDC error
- **WHEN** the user is redirected to `/login?error=OIDC_FAILED`
- **THEN** an error message is visible on the login interface indicating that the Keycloak login failed.