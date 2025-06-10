# Testing Strategy: SplitPay APP Backend

This document outlines the testing strategy for the SplitPay APP backend development, aligning with the Cline AI Development Framework and the project's specific context.

## Referencing the Global Framework

All testing activities should adhere to the "Testing Requirements" guidelines in the global framework, emphasizing unit tests, integration tests, and manual testing.

## Backend Testing Approach

The backend testing strategy will focus on ensuring the reliability, functionality, and security of the Node.js/Express.js API and its interactions with the Supabase database.

### Unit Testing

*   **Purpose:** To test individual functions, modules, or classes in isolation.
*   **Scope:** Focus on core logic, utility functions, and data processing.
*   **Tools:** Use a testing framework like Jest or Mocha with assertion libraries like Chai.
*   **Guidelines:**
    *   Write tests for all critical backend functions.
    *   Mock external dependencies (e.g., database calls, external API requests) to ensure true unit isolation.
    *   Aim for high code coverage for core logic.

### Integration Testing

*   **Purpose:** To test the interaction between different components, particularly the API endpoints and the database.
*   **Scope:** Focus on API routes, middleware, and database operations.
*   **Tools:** Use testing frameworks (Jest/Mocha) along with libraries for making HTTP requests (e.g., Supertest).
*   **Guidelines:**
    *   Test all API endpoints for correct request handling, response formats, and status codes.
    *   Verify that data is correctly saved, retrieved, updated, and deleted in the database through the API.
    *   Test authentication and authorization middleware to ensure protected routes are secure.
    *   Include tests for error handling scenarios.

### Manual Testing

*   **Purpose:** To perform end-to-end testing of key user flows and verify the integrated system.
*   **Scope:** Testing the backend API in conjunction with the frontend application.
*   **Guidelines:**
    *   Collaborate with the Frontend role to define manual testing scenarios for core features (e.g., user signup/login, group creation, expense entry, receipt upload, split calculation).
    *   Use tools like Postman or Insomnia to manually test API endpoints during development.

## Testing by Phase (Backend Focus)

*   **Phase 0: Foundation & Project Setup:** Basic server startup tests, environment variable loading tests, initial database connection tests.
*   **Phase 1: Core Functionality:** Unit tests for CRUD logic, integration tests for group and expense API endpoints, authentication endpoint tests.
*   **Phase 2: AI-Powered Receipt Processing:** Unit tests for OCR parsing logic, integration tests for image upload and processing endpoints, tests for saving parsed data to the database.
*   **Phase 3: Splitting Logic & Financial Summary:** Unit tests for split calculation logic with various scenarios, integration tests for the financial summary endpoint.

## Common Pitfalls and Mitigation (Backend Testing)

*   **Insufficient Test Coverage:** Ensure critical logic and API endpoints are covered by tests.
*   **Over-reliance on Manual Testing:** Automate unit and integration tests to ensure faster feedback and prevent regressions.
*   **Flaky Tests:** Design tests to be independent and avoid reliance on external factors where possible. Use proper mocking.
*   **Ignoring Error Paths:** Write tests specifically for error handling scenarios.
*   **Testing External APIs Directly:** Mock external API calls in unit tests; integration tests can verify the correct interaction with the mocking layer or a test environment.

## Guidelines for Cline (Backend Role)

*   Write unit tests for all new backend functions and modules.
*   Implement integration tests for all new API endpoints.
*   Ensure tests cover both successful and error scenarios.
*   Use mocking effectively to isolate units of code.
*   Run tests frequently during development.
*   Collaborate with the team to define and execute manual testing scenarios.
*   Document any complex testing setups or strategies in the project documentation.
