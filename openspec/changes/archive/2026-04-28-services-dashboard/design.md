## Context

Currently, the `Home` component in `App.jsx` presents a generic "Get started" page with a counter and Vite/React logos. The user needs a compact but attractive "spreadsheet" view to see all running applications in production upon logging in. 

## Goals / Non-Goals

**Goals:**
- Provide a responsive tabular view of mocked services data.
- Show columns corresponding to the JSON format `serviceName`, `clusterName`, `namespaceName`, `image`, and `serviceMaxCvssScore`.
- Ensure styling uses the `modern-tailwind-styling` approach (dark theme, glassmorphism, accent colors like fuchsia/indigo/etc.), applying semantic styling to elements like CVSS scores (e.g., higher scores are red).

**Non-Goals:**
- Implementing actual backend data fetching (we will use mock data locally directly in the component using a simple standard React state/effect or a local const).
- Implementing complete pagination logic. We will display the data and maybe a static UI element denoting pages based on the mock data response.

## Decisions

1. **Dashboard Component**: The `Home` component inside `App.jsx` (which acts as the landing page) will be gutted and repurposed to render the `applications-dashboard` view.
2. **Tabular Representation**: The tabular data will be rendered using semantic HTML `<table>`, styled with Tailwind CSS to match the workspace's slate dark mode and tight density (`py-2`, `px-4`, etc. for table cells).
3. **Data State**: The data will be statically initialized using `useState` and we'll simulate a fast fetch with `useEffect` (or just inline it, but `useEffect` mimics future real-world fetching better). 
4. **CVSS Score Highlighting**: We will utilize a utility function in the UI to conditionally format `serviceMaxCvssScore` (e.g., `text-rose-500` for `> 7.0`, `text-amber-500` for `4.0-7.0`, `text-emerald-500` for `< 4.0`).

## Risks / Trade-offs

- **Risk: Fixed Mock Data Structure:** We are aligning on a specific mock data shape. If the backend drifts from this shape, integration will be broken later. -> *Mitigation*: Strictly typing or matching the structure in comments to adapt easily later.