## Context

Engineers navigating from the global applications table directly need insights on the specific application to effectively tackle vulnerabilities. We currently lack an application details page that provides a unified view of the environment details, summary metrics (KPIs), and the detailed dependency Software Bill of Materials (SBOM) for an individual application. The page needs to handle the payload defined in the `GET /api/services/{id}` endpoint and visually present it for quick assessment.

## Goals / Non-Goals

**Goals:**
- Provide a responsive layout featuring three main sections: a Context Header, a KPI bar, and a Dependnecies Grid (SBOM).
- Allow users to quickly identify critical information such as the `maxCvssScore`, environment variables (namespace, cluster), and the exact image path.
- Provide interactive elements such as clicking on a CVE tag or table row to display comprehensive textual vulnerability details inside a side panel (Drawer).
- Render a robust UI capable of displaying nested JSON data (dependency arrays containing CVE arrays). 

**Non-Goals:**
- Allowing the user to modify or update the SBOM/dependencies manually from this page (read-only interface).
- Implementing filtering logic on the backend (we assume the endpoint provides the given comprehensive JSON).

## Decisions

- **Routing:** Add a new route in `src/App.jsx` for `/applications/:id`.
- **UI Layout Composition:** 
  - Sub-divide into three primary React components: `ApplicationHeader`, `ApplicationKPIs`, and `SbomDataGrid`. This promotes reusability.
  - The side panel will be implemented using a Drawer component (e.g. standard Material UI, Headless UI, or raw Tailwind based on project conventions) that overlays the screen on click events.
- **State Management:** Load the data in a central page component (`ApplicationDetailsPage`), using `useEffect` for data fetching or a custom hook like `useApplicationDetails`. Control the Drawer visibility via local state inside the page component, passing the currently selected vulnerability as props down to the Drawer component.
- **Performance:** For the SBOM DataGrid, use a virtualized table or pagination natively supported by the grid component in use to ensure stable performance if the dependency list is large.

## Risks / Trade-offs

- **Performance with extensive SBOMs** → If an image has hundreds or thousands of dependencies, rendering the grid might become slow. **Mitigation:** We will implement virtualization or pagination in the DataGrid component.
- **Incomplete Vulnerability Details** → If the Drawer requires missing vulnerability data. **Mitigation:** Rely on the existing `Vulnerability` entity in the database and gracefully handle missing textual descriptions with a fallback message.
