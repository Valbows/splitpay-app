# Coding Standards: SplitPay APP Backend

This document outlines the coding standards for the SplitPay APP backend development, aligning with the Cline AI Development Framework and the project's specific context, focusing on the Node.js/Express.js backend.

## Referencing the Global Framework

All coding activities should adhere to the "Code Quality Standards" guidelines in the global framework, emphasizing clean code, error handling, modular design, and security.

## Backend (Node.js/Express.js) Standards

### General Practices

*   **Code Readability:** Write clean, self-documenting code. Use meaningful variable and function names.
*   **Modularity:** Break down code into smaller, reusable modules and functions.
*   **Asynchronous Operations:** Use `async/await` for handling asynchronous operations (database calls, API requests) to improve readability and manageability.
*   **Error Handling:** Implement centralized error handling middleware in Express.js. Log errors effectively and return informative but not overly detailed error responses to the client.
*   **Input Validation:** Strictly validate all incoming request data on the server-side to prevent security vulnerabilities and ensure data integrity. Use libraries like Joi or Express-validator.
*   **Configuration Management:** Use environment variables for sensitive information (database credentials, API keys) and configuration settings. Utilize libraries like `dotenv`.
*   **Logging:** Implement a consistent logging strategy for debugging and monitoring. Use libraries like Winston or Morgan (for request logging).

### API Development

*   **RESTful Principles:** Design API endpoints following RESTful principles. Use appropriate HTTP methods (GET, POST, PUT, DELETE).
*   **Status Codes:** Return appropriate HTTP status codes in API responses (e.g., 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error).
*   **JSON Format:** All API requests and responses should use JSON format.
*   **API Versioning:** Consider API versioning (e.g., `/api/v1/groups`) to manage changes over time.
*   **Authentication and Authorization:** Implement robust authentication using Supabase Auth or Passport.js. Ensure proper authorization checks are in place for all protected routes.

### Database Interaction (with Supabase/PostgreSQL)

*   **Supabase Client:** Use the official Supabase client library for interacting with the database and other Supabase services.
*   **Data Sanitization:** Sanitize any user-provided data before inserting or updating records in the database.
*   **Error Handling:** Handle potential database errors gracefully and provide informative feedback.

## Common Pitfalls and Mitigation (Backend)

*   **Callback Hell:** Avoid deeply nested callbacks by using `async/await`.
*   **Lack of Input Validation:** Always validate user input on the server-side.
*   **Insufficient Error Handling:** Implement comprehensive error handling for all potential failure points.
*   **Exposing Sensitive Information:** Never expose sensitive data (like database credentials or API keys) in client-side code or detailed error messages.
*   **SQL Injection:** Use parameterized queries or the Supabase client's built-in methods to prevent SQL injection.

## Guidelines for Cline (Backend Role)

*   Adhere to the coding standards outlined above when writing backend code.
*   Prioritize implementing robust input validation and error handling for all new endpoints.
*   Use `async/await` for all asynchronous operations.
*   Ensure sensitive information is handled using environment variables.
*   When implementing API endpoints, define the expected request/response structure and status codes first.
*   Collaborate with the Database role to ensure correct database interactions.
