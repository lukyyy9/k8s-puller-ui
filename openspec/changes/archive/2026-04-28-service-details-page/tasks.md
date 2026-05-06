## 1. Setup & Routing

- [x] 1.1 Create the empty page component `ApplicationDetails.jsx` in `src/pages/`.
- [x] 1.2 Add the route for `/applications/:id` in `src/App.jsx` pointing to the new page.
- [x] 1.3 Update the existing applications table component to navigate to `/applications/:id` on row click.

## 2. Shared Components

- [x] 2.1 Create the `ApplicationHeader.jsx` component inside `src/components/`, ensuring it can receive backend data (cluster, namespace, max CVSS score badge, image full path).
- [x] 2.2 Create the `ApplicationKPIs.jsx` component, setting up layout for 3 metric cards (Total dependencies, Critical CVSS >= 9.0, High CVSS 7.0-8.9).

## 3. DataGrid Component (SBOM)

- [x] 3.1 Setup the `SbomDataGrid.jsx` component using the project's preferred table solution (e.g. Tailwind or headless component) showing dependency dimensions (Name, Version, Package Type, CVE list, CVSS Score).
- [x] 3.2 Ensure the SBOM grid is sorted by CVSS Score descending by default.
- [x] 3.3 Add clickable interactive CVE tags within the column layout.

## 4. API Integration & Page State

- [x] 4.1 In `ApplicationDetails.jsx`, implement a `const { id } = useParams()` hook and fetch data from `GET /api/services/{id}`.
- [x] 4.2 Map the loaded JSON payload into state objects and pass them as props to `ApplicationHeader` and `ApplicationKPIs`.
- [x] 4.3 Extract the `dependencies` array from the payload and pass it to the `SbomDataGrid` component.

## 5. Interactive Details Drawer

- [x] 5.1 Create a `VulnerabilityDrawer.jsx` side-panel component that receives vulnerability context (text description, CVE info) as props.
- [x] 5.2 Implement state inside `ApplicationDetails.jsx` (or internal to `SbomDataGrid.jsx`) to control Drawer visibility.
- [x] 5.3 Configure row/CVE click handlers in the `SbomDataGrid` to open the drawer and display the appropriate info.
