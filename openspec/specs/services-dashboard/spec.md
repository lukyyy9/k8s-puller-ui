# Capability: Services Dashboard

## Description
This capability enables users to view and assess running services along with their risk levels on the main dashboard.

## Requirements

### Requirement: Service Data Table View
The system SHALL present a tabular view of all running services on the root user dashboard (`/` route). The table MUST display the `serviceName`, `clusterName`, `namespaceName`, `image`, and `serviceMaxCvssScore` columns.

#### Scenario: Displaying running services list
- **WHEN** the user navigates to the root application path (`/`) after authenticating
- **THEN** the system immediately displays a dark-styled table listing services with mocked backend data

### Requirement: CVSS Score Highlight
The system SHALL visually format the `serviceMaxCvssScore` to indicate risk levels: scores 7.0 and up should appear red (high risk), 4.0 to 6.9 amber (medium risk), and below 4.0 green (low risk).

#### Scenario: Conditional color formatting of CVSS score
- **WHEN** the dashboard renders a service row
- **THEN** the score's text color changes according to the established threshold rules (Red > 7.0, Amber 4.0-7.0, Green < 4.0)