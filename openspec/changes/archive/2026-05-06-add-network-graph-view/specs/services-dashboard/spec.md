## ADDED Requirements

### Requirement: Dashboard View Toggle
The system SHALL provide a toggle switch positioned between the FilterBar and the data visualization area, allowing users to alternate between the tabular data grid and the network graph views. 

#### Scenario: Toggling the dashboard display modes
- **WHEN** the user is viewing the dashboard
- **THEN** a switch element is accessible denoting (0/1 or List/Graph) states
- **WHEN** the user clicks the switch
- **THEN** the dashboard alternates its visual representation between `SbomDataGrid` and the network topology graph

### Requirement: Seamless View Transitions
The system SHALL perform a visually fluid transition representing table rows expanding/transforming into graph nodes (and correspondingly reverting properties from graph nodes to table rows) precisely when the toggle state changes.

#### Scenario: Animating the transition state
- **WHEN** the user toggles from Table View to Graph View
- **THEN** table rows gracefully transform matching node elements in the generated topology without sudden DOM unmounting flashes

## MODIFIED Requirements

### Requirement: Service Data Table View
The system SHALL present a dual-modal view of all running services on the root user dashboard (`/` route), defaulting to the tabular view. The table MUST display the `serviceName`, `label`, `clusterName`, `namespaceName`, and `highestVulnerability` metadata extracted from the network `nodes` structure.

#### Scenario: Displaying running services list
- **WHEN** the user navigates to the root application path (`/`) after authenticating
- **THEN** the system immediately displays a dark-styled table listing services derived from the Hubble API `nodes` mocked dataset