## Why

When an engineer or DevSecOps professional clicks on a specific service from the global table, they need instant context on its execution environment (to know who to contact) and a detailed inventory (SBOM) to pinpoint exactly which software component is causing a vulnerability. This streamlines the remediation process and provides an immediate assessment of the workload's security posture.

## What Changes

- Add a new Service Details page that engineers can navigate to by clicking a service in the global table.
- This page will fetch data from a backend `GET /api/services/{id}` endpoint.
- Add a **Context Header**: Displays the service name, cluster, namespace, full image path (for easy copy-pasting), and a prominent colored badge showing the Max CVSS Score.
- Add a **KPI Bar**: Displays cards for quick metrics: Total dependencies, Critical vulnerabilities (CVSS ≥ 9.0), and High vulnerabilities (CVSS 7.0 - 8.9).
- Add a **Dependencies Table (SBOM)**: A DataGrid displaying dependency name, version, package type (e.g., maven, npm, deb), clickable CVE tags, and CVSS score (sorted descending).
- Add a **Vulnerability Details Drawer**: Clicking on a dependency row or a CVE tag opens a side panel with the textual description of the vulnerability.

## Capabilities

### New Capabilities
- `service-details`: Covers the new detailed view for a single service, including execution context, KPIs, and the SBOM data grid with vulnerability insights.

### Modified Capabilities
None.

## Impact

- **UI**: A new page and route for service details will be added (e.g., `/services/:id`).
- **Navigation**: The existing services table will be modified to support clicking a row/service to navigate to the new details page.
- **API**: The frontend must integrate with the `GET /api/services/{id}` endpoint to fetch the payload required for the context, KPIs, and SBOM.
