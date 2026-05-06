## 1. State Management Setup

- [x] 1.1 Add a `sortConfig` state hook to `App.jsx` initialized with `{ key: 'serviceName', direction: 'asc' }`.
- [x] 1.2 Create a toggle sorting function in `App.jsx` (e.g., `requestSort(key)`) that updates `sortConfig`. When clicking the currently sorted column, toggle the direction; otherwise, set the new column as the key with an 'asc' direction.

## 2. Implement Sorting Logic

- [x] 2.1 Use the `useMemo` hook in `App.jsx` to create a `sortedVisibleServices` array derived from `visibleServices` and `sortConfig`.
- [x] 2.2 Implement comparison logic inside `useMemo` to sort strings (like service name, cluster name, namespace name, image name) and numbers (like max cvss value) correctly according to the current `direction`.

## 3. Update Table UI

- [x] 3.1 Update the table body in `App.jsx` to iterate over `sortedVisibleServices` instead of `visibleServices`.
- [x] 3.2 Update table headers in `App.jsx` to be clickable, attaching the `requestSort` function to their `onClick` events.
- [x] 3.3 Add visual indicators (arrows) to the column header cells in `App.jsx` that conditionally display based on the `sortConfig` state.
