## 1. Setup Mock Data

- [x] 1.1 Create the mock applications JSON object locally within `src/App.jsx` conforming to the provided format with `totalElements`, `services`, etc.

## 2. Refactor App.jsx `Home` Component

- [x] 2.1 Remove the existing "Get started" landing page code (logos, count button, specific descriptive texts) from the `Home` component.
- [x] 2.2 Re-structure the layout of the `Home` component into a full-width or very wide dashboard layout (using standard Tailwind container styling).

## 3. Implement the Spreadsheet Table

- [x] 3.1 Create a `<table>` inside the `Home` component styled with Tailwind for a dark theme spreadsheet look. Include `thead` for columns: "Service", "Cluster", "Namespace", "Image", "Max CVSS".
- [x] 3.2 Initialize a `useState` and `useEffect` directly in the `Home` component to load the mock data on component mount instantly.
- [x] 3.3 Map over `data.services` in the `<tbody>` to render a `<tr>` for each application.
- [x] 3.4 Implement conditional styling rules for the `serviceMaxCvssScore` column (`text-rose-500` for >= 7.0, `text-amber-500` for 4.0-6.9, `text-emerald-500` for < 4.0).

## 4. Final Polish

- [x] 4.1 Ensure headers and cell paddings look compact yet professional (e.g. `py-3 px-4`, subtle bottom borders for rows).
- [x] 4.2 Add a summary counter at the bottom of the table (e.g., "Showing 10 of 245 results") using the `totalElements` mockup value.
- [x] 4.3 Add a dropdown menu allowing users to select the number of elements displayed per page.
- [x] 4.4 Add pagination navigation controls (Previous, Next, and page numbers) at the bottom of the table using the `totalPages` mockup value.
- [x] 4.5 Test responsiveness and visual appeal, adjusting Tailwind classes as needed to maintain a clean look across different screen sizes.