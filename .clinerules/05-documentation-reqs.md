# Documentation Requirements: SplitPay APP

This document outlines the documentation requirements for the SplitPay APP, aligning with the Cline AI Development Framework and the project's specific context.

## Referencing the Global Framework

All documentation activities should adhere to the "Documentation Standards" guidelines in the global framework, including the format for the Progress Log and Lessons Learned.

## Project-Specific Documentation

In addition to the core documentation files (`project-context.md`, `task-breakdown.md`, `progress-log.md`, `lessons-learned.md`) outlined in the global framework, the following project-specific documentation should be maintained within the `cline_docs/` folder:

*   **techStack.md:** Detail the key technology choices and architectural decisions for both the Web App (PERN stack) and the planned iOS App (SwiftUI), including justifications for the choices.
*   **codebaseSummary.md:** Provide a concise overview of the project structure, key components (frontend, backend, database interactions), data flow, external dependencies (Supabase, Gemini API), and recent significant changes. This should also note the existence and purpose of other reference documents like `styleAesthetic.md` or `wireframes.md` if they are created.
*   **databaseSchema.md:** (Specific to the Database role, but relevant for backend development) Document the database schema, including tables, columns, relationships, and any relevant constraints or indexing strategies. Cline (in the backend role) should refer to this document for database interactions.
*   **apiEndpoints.md:** Document all backend API endpoints, including their purpose, HTTP method, request parameters, request body structure, response body structure, and possible status codes. This can start as a simple markdown file and potentially evolve into an OpenAPI/Swagger specification in the future.

## Documentation Standards for Cline (Backend Role)

*   **Progress Log (`progress-log.md`):** Update this file regularly to track progress on backend tasks, following the specified format (Objective, Approach, Implementation, Tests/Validation, Status, Next Steps).
*   **Lessons Learned (`lessons-learned.md`):** Document any errors encountered and their solutions, useful backend code patterns, successful library versions/configurations (Node.js modules, Supabase client), and effective debugging strategies for the backend.
*   **Code Comments:** Include clear and concise comments in the backend code, especially for complex logic, API endpoint functionality, and database interaction details.
*   **API Documentation (`apiEndpoints.md`):** Contribute to and refer to the API endpoint documentation to ensure clear communication with the frontend team and maintain a clear understanding of the backend interface.
*   **Codebase Summary (`codebaseSummary.md`):** Ensure that significant backend architectural decisions or changes are reflected in the codebase summary.

## Common Pitfalls and Mitigation (Documentation)

*   **Outdated Documentation:** Make a conscious effort to update documentation whenever significant changes are made to the codebase or project plan.
*   **Insufficient Detail:** Provide enough detail in documentation for other team members (and future selves) to understand the context and implementation.
*   **Inconsistent Formatting:** Adhere to the specified markdown formats for consistency.

By maintaining thorough and up-to-date documentation, the team can ensure a shared understanding of the project, facilitate onboarding of new members, and streamline the development and maintenance process.
