## 1. Project Navigation

- [x] 1.1 Add a new `DependencySearch.jsx` basic component under `src/pages/`.
- [x] 1.2 Import and configure the `/search` route in `src/App.jsx` navigating to `<DependencySearch />`.
- [x] 1.3 Add a link from the Home page (`/`) to the Search page so users can navigate there easily.

## 2. Search Page Form Implementation

- [x] 2.1 Set up the React states for `dependencyName` (string) and `version` (string).
- [x] 2.2 Create the input components for 'Dependency Name' and 'Version' using Tailwind styling.
- [x] 2.3 Implement the "Search" button linked to an `onSubmit` handler for the form.

## 3. Results Mocking & Display

- [x] 3.1 Define the mock JSON payload as a constant object inside or alongside the `DependencySearch` component.
- [x] 3.2 Add a state array `resultsData` initially null, to hold the data after clicking search.
- [x] 3.3 Within the `onSubmit` handler, update `resultsData` state with the mocked JSON payload.
- [x] 3.4 Conditionally render a results container displaying the `totalServices` and `queriedDependencyCvssScore`.
- [x] 3.5 Map completely through the mocked `results` list and display each service's properties in a styled grid or list visually.