## Context

The Home dashboard currently displays a list of services in a table format with columns: Service, Cluster, Namespace, Image, and Max CVSS. However, the table data cannot be sorted, making it difficult for users to find specific services or organize the view by attributes like the highest vulnerability score (Max CVSS). We need to introduce client-side sorting of the `visibleServices` array in `App.jsx` based on the selected column.

## Goals / Non-Goals

**Goals:**
- Allow users to sort the services table by any of the 5 columns (Service, Cluster, Namespace, Image, Max CVSS).
- Support ascending and descending sort directions, toggled by clicking the column header.
- Provide a clear visual indicator (e.g., an arrow or chevron icon) next to the active sorting column header to communicate the current sort state.
- Set "Service Name" as the default sorted column, in ascending order.
- Implement sorting on the client side since the data is currently a mock local object and will be loaded in batches/all together.

**Non-Goals:**
- Server-side sorting (pagination and sorting over API are out of scope for this specific frontend UI change).
- Multi-column sorting (e.g., sorting by Cluster then Service).
- Adding sorting to the SbomDataGrid or other components, this change is strictly for the Home dashboard services table.

## Decisions

- **State Management:** Use a React `useState` hook in the `Home` component to track the current `sortConfig`, containing the `key` (column identifier) and `direction` ('asc' or 'desc').
- **Sort Logic:** Implement a derived sorting function using `useMemo` that takes the `visibleServices` and applies the `sortConfig`. This ensures the table only re-sorts when the `visibleServices` array or the `sortConfig` changes, avoiding unnecessary re-renders.
- **Icons:** We will use simple textual or inline SVG icons (e.g., `↑` / `↓` or Heroicons if available) standard to the project to denote the sort direction next to the active column header.
- **Default State:** `sortConfig` will be initialized to `{ key: 'serviceName', direction: 'asc' }`.

## Risks / Trade-offs

- [Risk] Client-side sorting performance on large datasets → Mitigation: `useMemo` memoizes the sorted array. If data becomes huge in the future, server-side sorting should be evaluated, but client-side is fine for the current `MOCK_DASHBOARD_DATA` and reasonable API response sizes.
