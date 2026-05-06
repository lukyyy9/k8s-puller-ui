## ADDED Requirements

### Requirement: Network Topology Graph Visualization
The system SHALL provide a graphical interface rendering structural relationships between services in a clustered environment. Nodes MUST represent individual services, and edges MUST represent network calls inferred by observability tools (Hubble API).

#### Scenario: Displaying network topology as nodes and edges
- **WHEN** the dashboard is toggled into Graph View mode
- **THEN** the system visualizes the network entities as nodes
- **THEN** the system draws contextual connecting edges representing active network traffic between them

### Requirement: Shared Filtering State
The system SHALL apply any actively set criteria from the `FilterBar` to the graph view instantly, hiding non-compliant nodes and any edges connected to them.

#### Scenario: Filtering nodes inside the graph view
- **WHEN** the user is in Graph View
- **WHEN** the user types into the `FilterBar`
- **THEN** matching nodes remain visible while non-matching nodes disappear from the layout immediately

### Requirement: Node Vulnerability Formatting
The system SHALL color-code or highlight nodes within the network graph based on their associated `highestVulnerability` metadata tag.

#### Scenario: Conditional color formatting of graph nodes based on security posture
- **WHEN** a rendered node indicates a "High" `highestVulnerability`
- **THEN** the node assumes a red border/highlight alerting users to the degraded security posture