## ADDED Requirements

### Requirement: Protected Application Routes
The system SHALL require a valid authentication session (via BFF) for any page access excluding the `/login` route.

#### Scenario: Accessing a protected route while unauthenticated
- **WHEN** an unauthenticated user attempts to navigate to any protected route (e.g., `/` or `/search-dependency`)
- **THEN** the system denies access and redirects the user to the `/login` page

#### Scenario: Accessing a protected route while authenticated
- **WHEN** an authenticated user attempts to navigate to a protected route
- **THEN** the system grants access and renders the requested page

#### Scenario: Accessing the login route while authenticated
- **WHEN** an authenticated user attempts to navigate to the `/login` page
- **THEN** the system denies access and redirects the user to the application's root page `/` ("Get Started")

#### Scenario: Wait for Authentication Check before Redirection
- **WHEN** the authentication status check is in progress (`isLoading === true`)
- **THEN** the system displays a loading indicator (e.g., "Loading...") instead of rendering protected content or triggering premature redirects