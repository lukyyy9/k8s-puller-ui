## Context

The main `Home` view (defined in `App.jsx`) currently lists services, but lacks filtering. As the number of services grows (currently over 240 elements per the mock data), users need a way to filter services by attributes like context, namespace, or cluster to quickly find what they need.

## Goals / Non-Goals

**Goals:**
- Provide a responsive filtering UI on the `Home` view (services dashboard).
- Allow filtering by dependency name and version, cluster name (multi-select), namespace (multi-select), and service name.
- Group the dependency version next to dependency name visually.
- Connect filter state to the grid representation so the list automatically updates when a filter is applied.

**Non-Goals:**
- Backend API pagination or remote filtering design (if current mock data is client-side, we will do client-side filtering; if server-side, we simulate query parameters). For this design, we focus just on the React frontend components.

## Decisions

- **State Management**: Use React `useState` in the `Home` component to store the active filter values.
  - `dependencyName`: string (migrated from existing standalone search)
  - `dependencyVersion`: string (restored and migrated from existing standalone search)
  - `name`: string
  - `cluster`: Array of strings (mapped to a custom dropdown menu components, not native selects)
  - `namespace`: Array of strings (mapped to a custom dropdown menu components, not native selects)
- **Filter UI Component**: Introduce a new UI bar above the services grid containing TextInputs for service and dependency name/version, and Custom Dropdown Menus for Cluster/Namespace allowing straightforward toggling (select/unselect) of multiple options. We keep it inside `Home` to easily pass state to the table filtering logic. The filters will be ordered visually from left-to-right: Cluster, Namespace, Service Name, Dependency Name & Version.
- **Client-Side Filtering**: Since the current data structure in `App.jsx` handles a list of services, we will derive a filtered list by iterating over the services array based on the state.

## Risks / Trade-offs

- Performance [Risk] → If filtering hundreds of items on every keystroke, the UI might stutter. Mitigation: The dataset is small (a few hundred items per page) so React's render cycle should handle it without debouncing, but we can add an explicit "Apply/Clear" button if performance becomes an issue.
- Layout Clutter [Risk] → Overcomplicating the UI. Mitigation: Place the filters horizontally with a flex container above the grid.

## Migration Plan

No complicated migration plan needed. The component state and UI are updated inline. Unfiltered state will yield the same view as the current implementation.

## Open Questions

- Should we support sorting in conjunction with these filters? 
- Will the UI be expanded to support querying the backend when pagination is fully implemented?