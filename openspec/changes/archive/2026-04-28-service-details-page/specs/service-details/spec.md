## ADDED Requirements

### Requirement: Application Navigation
The system SHALL allow users to navigate to an application's details page from the existing applications table.

#### Scenario: Navigate to application details
- **WHEN** the user clicks on an application row in the global applications table
- **THEN** they are routed to the specific application's details page at `/applications/:id`

### Requirement: Application Context Header
The system SHALL display an application context header giving engineers execution environment details.

#### Scenario: Display Header Information
- **WHEN** the application details page loads
- **THEN** it displays the application name as the title, along with the `clusterName`, `namespaceName`, and the full `image` path for easy terminal usage.
- **AND** it displays a prominently colored badge showing the `securityMaxCvssScore`.

### Requirement: Application Key Performance Indicators (KPIs)
The system SHALL display a row of KPI cards summarizing the dependencies and vulnerabilities.

#### Scenario: Display KPI Metrics
- **WHEN** the application details page loads
- **THEN** it displays three cards containing: the total number of dependencies, the total number of critical vulnerabilities (CVSS >= 9.0), and the total number of high vulnerabilities (CVSS 7.0 - 8.9).

### Requirement: Application Dependencies DataGrid (SBOM)
The system SHALL present a detailed software bill of materials (SBOM) grid for the application.

#### Scenario: Display Dependencies SBOM Grid
- **WHEN** the application details page loads
- **THEN** it displays a DataGrid detailing the application's dependencies.
- **AND** the columns must include: dependency name, version, package type (e.g., maven, npm, deb), a list of CVEs as clickable tags, and the CVSS Score (sorted in descending order by default).

### Requirement: Interactive Vulnerability Drawer
The system SHALL allow users to view detailed textual descriptions of a selected vulnerability in a side panel.

#### Scenario: Open Vulnerability Details Drawer
- **WHEN** the user clicks on a dependency row or a specific CVE tag within the DataGrid
- **THEN** a side panel (Drawer) opens to display the detailed textual description of the selected vulnerability.
