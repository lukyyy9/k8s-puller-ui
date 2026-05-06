## ADDED Requirements

### Requirement: Sortable Services Data Grid
The system SHALL provide a mechanism to sort the services list table on the Home dashboard by any of its displayed attributes. 

#### Scenario: Default Sort Order
- **WHEN** the user navigates or reloads the Home dashboard
- **THEN** the services table is sorted by the "Service Name" column in ascending order (A-Z) by default.
- **AND** a visual indicator pointing up is displayed next to the "Service" column header.

#### Scenario: Toggle Sort Order on Column Click
- **WHEN** the user clicks on an unsorted column header (e.g., "Max CVSS")
- **THEN** the services table is sorted by that column's values in ascending order.
- **AND** the visual sort indicator is moved to this column.
- **WHEN** the user clicks the same column header again
- **THEN** the table is resorted in descending order.

#### Scenario: Sort by Text Columns
- **WHEN** the user sorts the table by "Service", "Cluster", "Namespace", or "Image"
- **THEN** the values are ordered alphabetically (case-insensitive).

#### Scenario: Sort by Numeric Column (Max CVSS)
- **WHEN** the user sorts the table by the "Max CVSS" column
- **THEN** the values are ordered numerically.

#### Scenario: Visual Indication of Sort State
- **WHEN** a column is actively being used for sorting
- **THEN** it displays a sort indicator arrow denoting the direction: up for ascending, down for descending.
- **AND** inactive columns do not display a sort indicator arrow.
