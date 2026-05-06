## ADDED Requirements

### Requirement: Email and Password Login
The system SHALL provide a login form containing input fields for email and password, a "Remember me" checkbox, and a primary submit button.

#### Scenario: Valid email and password
- **WHEN** the user inputs a valid email and password and clicks the primary login button
- **THEN** the system submits the credentials for authentication

### Requirement: SSO Integration Visual Divider
The system SHALL display a visual divider between the standard login form and the SSO login option.

#### Scenario: Displaying the divider
- **WHEN** the login page is rendered
- **THEN** a divider with the text "or" is visible below the primary login button and above the SSO button

### Requirement: Keycloak SSO Login Option
The system SHALL provide a secondary login button for "Sign in with Keycloak".

#### Scenario: Clicking Keycloak SSO
- **WHEN** the user clicks the "Sign in with Keycloak" button
- **THEN** the system triggers the Keycloak authentication flow