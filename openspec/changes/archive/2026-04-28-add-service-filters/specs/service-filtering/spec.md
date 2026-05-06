## ADDED Requirements

### Requirement: Services list filters
The system SHALL provide inputs to filter services by specific criteria (e.g., Dependency Name and Version, multi-select Status, Owner, Cluster) on the Services page.

#### Scenario: Display filter inputs on services page
- **WHEN** the user views the Services page
- **THEN** the system displays the filter inputs (Dependency Name and Dependency Version grouped together, Service Name, and custom multi-select toggleable dropdown menus for Cluster and Namespace/Owner) above the table.

#### Scenario: Apply multi-select service filters
- **WHEN** the user clicks to toggle options on or off (select and unselect) within a filter category's custom dropdown menu (like Cluster or Namespace)
- **THEN** the services table is instantly updated to display records matching ANY of the active items within that category (OR logic), combined with AND logic against other active filters.

#### Scenario: Clear active filters
- **WHEN** the user clicks the option to clear filters
- **THEN** all filter inputs are reset and the table displays the unfiltered list of services.
