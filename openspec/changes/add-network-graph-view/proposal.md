## Why

The current network observability data on the Home page relies solely on a tabular format, which makes it difficult to quickly grasp complex network topologies and relationships. Adding a graph view option allows users to intuitively visualize the relationships and traffic between services in the cluster, leveraging the rich observability data provided by the Hubble API.

## What Changes

- Add a toggle switch between the FilterBar and the data table on the Home page to swap between the "Table" and "Graph" views.
- Implement a graph visualization where the table rows seamlessly transition into nodes, and the network relationships (edges) are drawn between them.
- Adapt the mock data to include both `nodes` and `edges` (Hubble API response structure) containing network relationship information (e.g. source, target, protocol, verdict).
- Ensure the FilterBar remains visible and dynamically functional in the graph view.
- Support a fluid, seamless animation back to the table view where nodes revert to standard rows.

## Capabilities

### New Capabilities
- `network-graph-view`: Handles the rendering of the network topology graph, including nodes, edges, styling based on node metadata (e.g., vulnerabilities), and edge metadata (e.g., protocols, call metrics).

### Modified Capabilities
- `services-dashboard`: Modifies the dashboard to include a new view toggle mechanism. Modifies the dashboard data consumption models and view-state transitions between the data table and the new network graph visualization layer, preserving FilterBar functionality.

## Impact

- **UI Components**: Modifications to the `SbomDataGrid` or Home page component to introduce the toggle and seamless view-state transitions.
- **Data Layer / Mocks**: Updates `mockData.js` to include the new Hubble API-compliant `nodes` and `edges` structures.
- **Dependencies**: May require an implementation library for the graph rendering and the seamless transition animations (e.g., D3.js, framer-motion, or react-flow).