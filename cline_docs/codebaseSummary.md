# Codebase Summary: SplitPay APP

This document provides a concise overview of the SplitPay APP project structure and recent changes, aligning with the Cline AI Development Framework.

## Key Components and Their Interactions

*   **Backend (Node.js/Express.js):** Located in the `src/` directory. This is the API layer that will handle requests from the frontend, interact with the database, and integrate with external services like the Google Gemini API.
*   **Database (PostgreSQL via Supabase):** Managed externally through Supabase. The backend interacts with the database using the `@supabase/supabase-js` client library.
*   **Environment Variables:** Managed using `dotenv` and stored in the `.env` file in the project root. These are used to configure connections to Supabase and the Google Gemini API.

## Data Flow

(To be detailed in later phases as API endpoints are implemented)

## External Dependencies

*   **npm Packages:**
    *   `express`: Web framework for Node.js.
    *   `cors`: Middleware for enabling CORS.
    *   `@supabase/supabase-js`: Supabase client library.
    *   `@google/generative-ai`: Google Gemini API client library.
    *   `dotenv`: For loading environment variables.
*   **Supabase:** Provides database, authentication, and storage services.
*   **Google Gemini 2.0 Flash:** Used for OCR processing (to be implemented in Phase 2).

## Recent Significant Changes

*   Initialized Node.js project using `npm init -y`.
*   Installed core backend dependencies (`express`, `cors`, `@supabase/supabase-js`, `@google/generative-ai`, `dotenv`).
*   Created `src/index.js` with basic Express server setup, dotenv configuration, and client initializations for Supabase and Google AI.
*   Renamed `.env.local` to `.env` and updated `dotenv` configuration in `src/index.js` to load variables correctly.
*   Added a `start` script to `package.json` to run the backend server.

## User Feedback Integration and Its Impact on Development

(To be documented as user feedback is received and integrated)

## Additional Reference Documents

*   `.clinerules/01-project-context.md`: Project background, goals, and constraints.
*   `.clinerules/02-planning-standards.md`: Backend planning standards.
*   `.clinerules/03-coding-standards.md`: Backend coding standards.
*   `.clinerules/04-testing-strategy.md`: Backend testing strategy.
*   `.clinerules/05-documentation-reqs.md`: Project documentation requirements.
