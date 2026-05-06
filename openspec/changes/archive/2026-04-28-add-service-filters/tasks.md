## 1. Filter UI Components

- [x] 1.1 Create the FilterBar component structure with text inputs for "Dependency Name" and "Service Name".
- [x] 1.2 Add a "Clear Filters" button to reset the filter values.
- [x] 1.3 Add text input for "Dependency Version" directly next to "Dependency Name".
- [x] 1.4 Create a custom `MultiSelectDropdown` sub-component to eliminate the native `<select multiple>` scrollable box. It should handle proper toggling (click to select and unselect) for multiple items.
- [x] 1.5 Implement this custom `MultiSelectDropdown` for the "Cluster" and "Owner/Namespace" UI inputs in `FilterBar.jsx`.
- [x] 1.6 Reorder filters visually from left to right as: Cluster, Namespace, Service Name, Dependency Name & Version.

## 2. State Management

- [x] 2.1 Add/consolidate React `useState` hooks inside App.jsx's Home view for filter criteria (`dependencyName`, `name`).
- [x] 2.2 Reintroduce `dependencyVersion` to the consolidated filters state.
- [x] 2.3 Refactor the `cluster` and `namespace` states in the `filters` object from string to Array of strings.
- [x] 2.4 Wire the "Clear Filters" button to reset all filter state objects (including arrays and new versions).

## 3. Core Filtering Implementation

- [x] 3.1 Implement an inline client-side filtering mechanism to derive the visible `services` list.
- [x] 3.2 Ensure case-insensitive string filtering works correctly for text inputs.
- [x] 3.3 Update client filtering logic for `cluster` and `namespace` to check if the value is included within the selected array elements (or pass if array is empty).
- [x] 3.4 Wire up the `dependencyVersion` mock filter logic.

## 4. Final Review

- [x] 4.1 Verify the new UI uses the custom dropdown, matching the desired specification.
- [x] 4.2 Test the custom multi-select filter behaviors to ensure straightforward toggling (select and unselect) resolves the table rows correctly without weird scroll list behaviors.
