## Why

Users need the ability to scan their infrastructure to see which applications are running specific dependencies or vulnerable versions to assess and remediate risks quickly. Building a "Search application by dependency" page allows security and devops teams to locate these workloads seamlessly.

## What Changes

- Add a new "Search application by dependency" page/route to the UI.
- Implement an input field for "Dependency Name" (required).
- Implement an optional input field for "Version".
- Implement a "Search" button that triggers the query.
- Use a mock backend response to display a JSON or structured list of results detailing cluster, namespace, image, service name, and vulnerability scores.

## Capabilities

### New Capabilities
- `dependency-search`: Defines the functionality for searching the application catalog by package dependency name and version, and displaying the results.

### Modified Capabilities
None

## Impact

- Adds a new route for dependency searching.
- Adds new React components handling the search form and results state.
- Introduces mock data fetch logic that will later be connected to a real API.