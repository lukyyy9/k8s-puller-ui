## ADDED Requirements

### Requirement: Search form layout
The system SHALL provide a search interface consisting of an input for "Dependency Name", an optional input for "Version", and a "Search" submit button.

#### Scenario: Display search interface
- **WHEN** the user navigates to the "search application by dependency" page
- **THEN** the system displays the "Dependency Name" and "Version" input fields and the search button.

### Requirement: Search mock result payload
The system SHALL respond and display a mocked JSON structure when the user submits a search. 

#### Scenario: Trigger search submit
- **WHEN** the user clicks the "Search" button
- **THEN** the system displays a mocked summary indicating total services impacted, queried dependency CVSS score, and an array of resulting objects detailing individual services, their clusters, namespaces, images, and max CVSS scores.