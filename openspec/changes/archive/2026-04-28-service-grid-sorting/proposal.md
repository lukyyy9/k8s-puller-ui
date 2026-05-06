## Why

Users need the ability to sort the data grid by various columns (service name, cluster name, namespace name, image name, and max cvss value) to more easily find, organize, and analyze information. Sorting is a standard and expected interaction for data tables.

## What Changes

- Add sorting capability to the data grid component.
- Make column headers clickable to toggle sorting direction (ascending/descending).
- Display a visual indicator (e.g., an arrow) next to the currently sorted column header.
- Implement a default sorting order by "service name" upon initial load.

## Capabilities

### New Capabilities
- `service-grid-sorting`: Ability to sort the grid columns and display visual sorting indicators.

### Modified Capabilities

## Impact

- Updates to the data grid component (`SbomDataGrid`) to manage sorting state and sorting logic.
