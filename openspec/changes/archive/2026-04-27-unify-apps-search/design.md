## Context

The UI currently has separate pages for viewing applications and searching for applications by dependency. Searching by dependency is essentially filtering the applications list. Combining them simplifies navigation, reduces code duplication, and improves user workflow.

## Goals / Non-Goals

**Goals:**
- Move "Dependency Name" and "Dependency Version" inputs into the Applications page as filters.
- Use the same table component to display results for both unfiltered lists and filtered dependency searches.
- Remove the `/search-dependency` route.

**Non-Goals:**
- Modifying backend APIs or actual backend filtering logic (using mock data in UI).
- Implementing new filter criteria beyond dependency name and version.

## Decisions

- **UI Location**: The search inputs will be placed at the top of the Applications list view (`src/pages/Home` in `App.jsx`). They will replace the "Search Dependencies" button.
- **State Management**: Add local React state `dependencyName` and `dependencyVersion` in the `Home` component.
- **Mock Data Handling**: The current `Home` component uses `MOCK_DASHBOARD_DATA`. The search behavior will continue to use the same layout and display mocked summaries as specified in the original dependency search requirements, but integrated into the Applications view.

## Risks / Trade-offs

- **Risk**: Cluttering the Applications page with too many inputs if more filters are added later.
  **Mitigation**: Use a clean inline layout for inputs that visually integrates with the table controls.
