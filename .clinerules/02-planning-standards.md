# Planning Standards: SplitPay APP Backend

This document outlines the planning standards for the SplitPay APP backend development, aligning with the Cline AI Development Framework and the project's specific context.

## Referencing the Global Framework

All planning activities should adhere to the "Planning Phase" guidelines in the global framework, emphasizing task breakdown, success criteria definition, and dependency identification.

## Task Breakdown for Backend Development

Backend tasks should be broken down into small, manageable units that align with the project's four phases:

### Phase 0: Foundation & Project Setup

*   Set up Node.js/Express.js project structure.
*   Configure environment variables for database and API keys.
*   Implement basic server setup and routing.
*   Integrate with Supabase for database connection.

### Phase 1: Core Functionality - Manual Expense Management

*   Design and implement database schema for users, groups, and expenses (collaborate with Database role).
*   Develop CRUD API endpoints for groups.
*   Develop CRUD API endpoints for expenses.
*   Implement user authentication endpoints (signup, login, logout) using Supabase Auth or Passport.js.
*   Define clear API request and response formats.

### Phase 2: AI-Powered Receipt Processing

*   Create backend endpoint for image uploads.
*   Integrate with Supabase Storage for image storage.
*   Implement logic to send images to Google Gemini 2.0 Flash API for OCR.
*   Develop parsing logic for Gemini API response to extract relevant data (items, prices, etc.).
*   Implement logic to save parsed data to the database.

### Phase 3: Splitting Logic & Financial Summary

*   Develop backend logic to calculate unequal expense splits.
*   Implement endpoint to calculate and return financial summaries ("who owes whom").
*   Consider edge cases for splitting logic (e.g., partial payments, multiple currencies - though this might be future scope).

## Defining Success Criteria

Each backend task must have clear, verifiable success criteria. Examples:

*   **API Endpoint:** The endpoint should return the expected data structure with correct status codes for all possible scenarios (success, validation errors, authentication errors).
*   **Database Interaction:** Data should be correctly saved, retrieved, updated, or deleted in the PostgreSQL database via Supabase.
*   **Authentication:** Users should be able to successfully sign up, log in, and log out, with appropriate session management.
*   **OCR Integration:** The backend should successfully send an image to the Gemini API, receive a response, and extract the required information accurately.
*   **Splitting Logic:** The calculation endpoint should produce correct net balances based on provided expense and split data.

## Identifying Dependencies and Blockers

*   **Database Schema:** Backend development is heavily dependent on the database schema defined by the Database role.
*   **Frontend Requirements:** Collaborate with the Frontend role to ensure API endpoints meet their UI needs.
*   **External APIs:** Dependencies on Supabase and Google Gemini API availability and documentation.
*   **Team Coordination:** Ensure clear communication with Frontend and Database roles to avoid conflicts and ensure smooth integration.

## Common Pitfalls and Mitigation (Backend)

*   **API Versioning:** Plan for API versioning from the start to handle future changes gracefully.
*   **Input Validation:** Implement robust server-side input validation for all API endpoints to prevent security vulnerabilities and data corruption.
*   **Error Handling:** Implement consistent and informative error handling for all API responses.
*   **Asynchronous Operations:** Properly handle asynchronous operations (e.g., API calls, database queries) using Promises or async/await.
*   **Security:** Pay close attention to authentication, authorization, and data security best practices, especially when handling sensitive financial data.

## Guidelines for Cline (Backend Role)

*   Prioritize tasks based on the defined project phases and dependencies.
*   Before implementing an API endpoint, clearly define its purpose, expected request/response, and success criteria.
*   When working on database interactions, refer to the agreed-upon database schema.
*   For API integrations (Supabase, Gemini), carefully review their documentation.
*   Implement comprehensive error handling for all backend logic.
*   Write unit tests for core backend functions and integration tests for API endpoints.
*   Document API endpoints using a standard format (e.g., OpenAPI/Swagger - though this might be future scope, start with clear markdown descriptions).
*   Communicate any blockers or uncertainties related to database schema, frontend requirements, or external APIs.
