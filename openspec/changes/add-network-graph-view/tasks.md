## 1. Setup & Data Layer

- [x] 1.1 Update `mockData.js` to export the new structure involving `nodes` (id, label, type, namespace, cluster, metadata) and `edges` (source, target, protocol, verdict).
- [x] 1.2 Install necessary visual and layout dependencies (e.g., `framer-motion` for shared layout transitions and `d3-force` for graph placements) if not already present.
- [x] 1.3 Audit and refactor `SbomDataGrid` to accept `nodes` for its source arrays to maintain compatibility with the table view.

## 2. Graph View Components

- [x] 2.1 Create the `NetworkGraph` component shell that will hold the visual mapping of nodes and edges.
- [x] 2.2 Implement SVG or container-based edge rendering matching source/target IDs from `edges` and connecting them dynamically.
- [x] 2.3 Implement `<motion.div>` wrapped Node elements mapped from `nodes`, assigning them unique `layoutId` props based on their `id`.
- [x] 2.4 Apply vulnerability style rules (Colors/Themes) to individual nodes inside `NetworkGraph` based on `highestVulnerability` metadata.
- [x] 2.5 Initialize basic node positioning logic dynamically utilizing `d3-force` or rigid mathematical placement for layout rendering.

## 3. Dashboard Integration & Filters

- [x] 3.1 Add a toggle UI switch (Graph/Table) inside the dashboard (e.g. near `FilterBar` or Main container).
- [x] 3.2 Introduce shared view-state logic (`isGraphView`: boolean) in the dashboard parent capable of dictating which view handles the data.
- [x] 3.3 Wrap the conditional rendering block (Table vs. Graph) within `AnimateSharedLayout` (or modern framer-motion approach) to empower seamless transformations. 
- [x] 3.4 Wire `FilterBar` logic to dynamically mutate the list of valid `nodes`, cascading the updated arrays safely to the active view component without disrupting animations.
