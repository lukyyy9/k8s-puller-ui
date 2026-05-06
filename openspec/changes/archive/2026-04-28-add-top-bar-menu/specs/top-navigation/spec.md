## ADDED Requirements

### Requirement: Global Top Navigation Bar
The system SHALL display a global top navigation bar that floats above the main application view on all routes. The bar MUST feature rounded corners and a translucent (glassmorphism) background style.

#### Scenario: Viewing the application
- **WHEN** a user views any page in the application
- **THEN** the top navigation bar is visibly rendered at the top of the viewport
- **AND** the bar has a translucent background and rounded corners

### Requirement: Application Branding
The top navigation bar SHALL display the application name "k8s-puller UI" aligned to the left side.

#### Scenario: Branding visibility
- **WHEN** the top navigation bar is rendered
- **THEN** the text "k8s-puller UI" is displayed on the left side of the bar

