## Context

The application currently lacks a way for users to log in. To provide secure access, a login page needs to be built. We are implementing both a standard email/password form and an integration with Keycloak for SSO. The UI should be clean and responsive.

## Goals / Non-Goals

**Goals:**
- Implement a responsive and accessible login page.
- Build the UI components: email input, password input, remember me checkbox, primary login button, separator, and Keycloak login button.
- Integrate with existing routing to display the page at `/login` (or equivalent auth route).

**Non-Goals:**
- Implementing the actual backend authentication API.
- Implementing the Keycloak integration logic (this is UI only for this change).
- Managing global authentication state (tokens, session expiration) beyond basic UI interactions.

## Decisions

- **UI Framework/Library**: Use the existing UI patterns and CSS (or any chosen component library in the project) to build the login form to maintain visual consistency.
- **Form State Management**: Use React's local state or a lightweight form library (e.g., `react-hook-form` if already in the project) to handle email, password, and remember me inputs.
- **Layout**: Center the login card on the screen. Use a distinct horizontal divider (`<hr>`) with the text "or" between the standard login and the Keycloak button to clearly separate the two authentication methods.

## Risks / Trade-offs

- **Risk**: The UI might not perfectly align with future authentication backend requirements if fields change.
  **Mitigation**: Keep the form components decoupled from the submission logic so they can be easily extended.