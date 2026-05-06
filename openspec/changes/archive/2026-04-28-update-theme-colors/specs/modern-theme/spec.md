## ADDED Requirements

### Requirement: Primary Action Brand Color
The system MUST use `#2C4583` for all primary interactive elements, such as main buttons and key call-to-action triggers, replacing any previous generic utility colors (e.g., `fuchsia-400`).

#### Scenario: Displaying primary buttons
- **WHEN** a primary button or action is rendered
- **THEN** it MUST be styled with background color `#2C4583`

## MODIFIED Requirements

### Requirement: Application Dark Mode 2026 Style
The UI MUST default to an aesthetically dark design (a "2026 dark design" style), specifically incorporating deep slates (`bg-slate-900`) and readable contrasting text (`text-slate-200`).

#### Scenario: Visual display
- **WHEN** the user views the landing and login pages
- **THEN** the core layout renders with dark mode utility classes applied via Tailwind (e.g., `bg-slate-900` for background and `text-slate-200` for text)
