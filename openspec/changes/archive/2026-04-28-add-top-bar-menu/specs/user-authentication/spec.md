## ADDED Requirements

### Requirement: User Logout
The system SHALL allow authenticated users to log out of their session via a "Log out" button located on the right side of the top navigation bar. The button MUST ONLY be visible to authenticated users.

#### Scenario: Visibility of Log Out button when authenticated
- **WHEN** an authenticated user views the top navigation bar
- **THEN** a "Log out" button is displayed on the right side of the bar

#### Scenario: Visibility of Log Out button when unauthenticated
- **WHEN** an unauthenticated user views the top navigation bar (e.g., on the login page)
- **THEN** the "Log out" button is not rendered

#### Scenario: Performing a Logout
- **WHEN** an authenticated user clicks the "Log out" button
- **THEN** the system terminates the session via the backend API
- **AND** the system redirects the user to the `/login` page
