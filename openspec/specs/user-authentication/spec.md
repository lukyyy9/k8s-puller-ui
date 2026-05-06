## ADDED Requirements

### Requirement: User Login Flow
The application MUST authenticate users via the configured Keycloak SSO provider.

#### Scenario: Unauthenticated access to protected route
- **WHEN** an unauthenticated user attempts to access any protected route (e.g., `/`)
- **THEN** they MUST be immediately redirected to the Keycloak login page (via the BFF OIDC redirect endpoint `http://localhost:8080/api/auth/oidc/redirect/keycloak`) without passing through an intermediate `/login` route.

#### Scenario: Authentication callback
- **WHEN** a user successfully authenticates and is redirected back from Keycloak
- **THEN** they MUST be authenticated and able to access the requested protected resources.

### Requirement: Protected Application Routes
The system SHALL require a valid authentication session (via BFF) for any page access.

#### Scenario: Accessing a protected route while unauthenticated
- **WHEN** an unauthenticated user attempts to navigate to any protected route (e.g., `/` or `/services/:serviceId`)
- **THEN** the system denies access and redirects the user directly to the Keycloak initialization endpoint.

#### Scenario: Accessing a protected route while authenticated
- **WHEN** an authenticated user attempts to navigate to a protected route
- **THEN** the system grants access and renders the requested page

#### Scenario: Wait for Authentication Check before Redirection
- **WHEN** the authentication status check is in progress (`isLoading === true`)
- **THEN** the system displays a loading indicator (e.g., "Loading...") instead of rendering protected content or triggering premature redirects

### Requirement: Global Authentication Validation
The system SHALL perform a session validation upon accessing the application using a `useAuth` hook calling the backend (`GET /api/auth/me`).

#### Scenario: Valid session check on mount
- **WHEN** the application mounts and the user has a valid HttpOnly cookie
- **THEN** the API returns a success response and the user is considered authenticated

#### Scenario: Invalid session check on mount
- **WHEN** the application mounts and the user lacks authentication via the backend
- **THEN** the API returns an error/empty state, and the user is redirected to the Keycloak login.

### Requirement: Authentication Error Handling via Query Parameters
The system SHALL parse query parameters on the application entry route to detect authentication errors returned by the BFF (e.g., `?error=OIDC_FAILED`) and display a clear, styled error message to the user.

#### Scenario: Displaying an OIDC error
- **WHEN** the user is redirected back to the application with `?error=OIDC_FAILED`
- **THEN** an error message is visible indicating that the Keycloak login failed.

### Requirement: User Logout
The system SHALL allow authenticated users to log out of their session via a "Log out" button located on the right side of the top navigation bar. The button MUST ONLY be visible to authenticated users.

#### Scenario: Visibility of Log Out button when authenticated
- **WHEN** an authenticated user views the top navigation bar
- **THEN** a "Log out" button is displayed on the right side of the bar

#### Scenario: Visibility of Log Out button when unauthenticated
- **WHEN** an unauthenticated user views the top navigation bar (e.g., when viewing an error page)
- **THEN** the "Log out" button is not rendered

#### Scenario: Performing a Logout
- **WHEN** an authenticated user clicks the "Log out" button
- **THEN** the system terminates the session via the backend API
- **AND** the system redirects the user to the Keycloak login page (via the BFF OIDC redirect endpoint or backend redirect mapping)
