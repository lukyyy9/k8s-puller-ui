## Why

The services table currently lacks comprehensive filtering capabilities, making it difficult for users to find specific services in large environments. Adding a complete set of filters will improve usability and allow users to quickly narrow down their view based on relevant criteria such as status, team, or other metadata.

## What Changes

- Add a filter bar above the services table with various filter options.
- Integrate the existing search by dependency name and dependency version directly into the new filter bar, placing them next to each other visually.
- Support filtering by service status, owner/team, cluster, and other relevant metadata alongside dependency name and version.
- Multi-select fields (Cluster and Namespace) MUST use a custom toggleable dropdown menu instead of a native scrollable list to improve user experience (allowing straightforward select and unselect of single or multiple items).
- Ensure filters can be combined across categories (AND logic), while allowing multiple selections within the same category (OR logic within cluster/namespace).
- Provide visual feedback for active filters and an option to clear all filters.

## Capabilities

### New Capabilities

### Modified Capabilities

- `service-filtering`: Enhance existing service filtering capabilities to support a comprehensive set of filters (status, owner, etc.) for the services table.

## Impact

- Frontend components for the services table (likely `SbomDataGrid.jsx`).
- State management for active filters.
- Potentially API calls if filtering is server-side, or client-side filtering logic if the entire dataset is loaded.
