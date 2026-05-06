## Context

The Home page currently features a data table (`SbomDataGrid`) summarizing information globally per service (e.g. max CVSS score), but lacks an intuitive way to understand network topologies. A new requirement mandates augmenting this dashboard with an interactive network graph, built upon Hubble API observability data (which includes detailed relationships via nodes and edges). A critical aspect requires transitioning gracefully—nodes mapping 1:1 to rows—to maintain a fluid user experience without losing context.

## Goals / Non-Goals

**Goals:**
- Provide a responsive network graph visualization mode for the Home page.
- Implement a fluid toggle mechanism between the table and graph modes that animates the rows turning into nodes (and vice-versa).
- Incorporate Hubble API mock models (`nodes`, `edges`) into the application state.
- Retain dynamic filter functionality (via `FilterBar`) for both Table and Graph views concurrently.

**Non-Goals:**
- Removing the service grid altogether (table view should persist as the default or selectable option).
- Real-time/live updates of the data; we limit this scope to integrating the updated mock data schema.

## Decisions

- **Graph Animation Library:** Use `framer-motion` for shared layout animations (`layoutId`). By applying identical `layoutId`s to a table row and its corresponding graph node, Framer Motion can perform a seamless morphology transition between the two states. 
- **Graph State / Layout:** For positioning the network layout (force-directed or hierarchical), we can either use `d3-force` running on the client (to calculate node positions iteratively) while rendering nodes as React components (to leverage `framer-motion`).
- **Data Model Overhaul:** The `mockData.js` will be updated to emit an object containing `{ nodes: [], edges: [] }` rather than the old array of services. Table parsing logic will automatically map `nodes` to its row structures to preserve regression-free data handling in the grid.
- **Toggle Placement:** A stateless switch element will be inserted between `FilterBar` and `SbomDataGrid`. The state of this toggle (`isGraphView`: boolean) will be lifted to `App.jsx` or the encompassing `Home/Dashboard` container, which delegates rendering control between `TableView` and `GraphView`.

## Risks / Trade-offs

- **Risk: Performance degradation with large networks:** Rendering highly dense graphs, especially with morphing animations on Hundreds of DOM elements via framer-motion can be intensive.
  - **Mitigation:** Rely heavily on the `FilterBar` to restrict the node set. Perhaps implement a maximum node threshold before disabling layout animations (fallback to instant switch).
- **Trade-off: Layout Stability vs Flexibility:** Using a force-simulation requires time to "cool down", which can misalign with exact fluid layout transitions. 
  - **Mitigation:** Pre-calculate or quickly compute initial positioning heuristics before springing into the graph to make the transition smoother.