# API Endpoints: SplitPay APP Backend

This document details the API endpoints implemented in the SplitPay APP backend, aligning with the project's documentation requirements.

## Authentication Endpoints

### `POST /auth/signup`

*   **Purpose:** Register a new user.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
*   **Response Body (Success 201):**
    ```json
    {
      "user": { ... }, // Supabase user object
      "session": { ... } // Supabase session object
    }
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `POST /auth/login`

*   **Purpose:** Authenticate an existing user.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
*   **Response Body (Success 200):**
    ```json
    {
      "user": { ... }, // Supabase user object
      "session": { ... } // Supabase session object
    }
    ```
*   **Response Body (Error 401):**
    ```json
    {
      "error": "Error message"
    }
    ```

## Groups Endpoints

### `GET /groups`

*   **Purpose:** Retrieve a list of groups (currently fetches all, will be refined for user association).
*   **Method:** `GET`
*   **Request Parameters:** None (will add filtering/user association later)
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "name": "Group Name",
        "created_at": "timestamp"
        // potentially other fields
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `POST /groups`

*   **Purpose:** Create a new group.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "name": "New Group Name"
    }
    ```
*   **Response Body (Success 201):**
    ```json
    [
      {
        "id": "uuid",
        "name": "New Group Name",
        "created_at": "timestamp"
        // potentially other fields
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `PUT /groups/:id`

*   **Purpose:** Update an existing group.
*   **Method:** `PUT`
*   **URL Parameters:** `:id` (Group ID)
*   **Request Body:**
    ```json
    {
      "name": "Updated Group Name"
    }
    ```
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "name": "Updated Group Name",
        "created_at": "timestamp"
        // potentially other fields
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `DELETE /groups/:id`

*   **Purpose:** Delete a group.
*   **Method:** `DELETE`
*   **URL Parameters:** `:id` (Group ID)
*   **Request Body:** None
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "name": "Deleted Group Name",
        "created_at": "timestamp"
        // potentially other fields
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

## Expenses Endpoints

### `GET /expenses`

*   **Purpose:** Retrieve expenses for a specific group.
*   **Method:** `GET`
*   **Request Query Parameters:** `group_id` (Required)
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "group_id": "uuid",
        "description": "Expense Description",
        "amount": 100.00,
        "paid_by_user_id": "uuid",
        "date": "YYYY-MM-DD",
        "raw_text": "Optional raw text from receipt",
        "created_at": "timestamp"
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `POST /expenses`

*   **Purpose:** Create a new expense.
*   **Method:** `POST`
*   **Request Body:**
    ```json
    {
      "group_id": "uuid",
      "description": "New Expense",
      "amount": 50.00,
      "paid_by_user_id": "uuid",
      "date": "YYYY-MM-DD",
      "raw_text": "Optional raw text"
    }
    ```
*   **Response Body (Success 201):**
    ```json
    [
      {
        "id": "uuid",
        "group_id": "uuid",
        "description": "New Expense",
        "amount": 50.00,
        "paid_by_user_id": "uuid",
        "date": "YYYY-MM-DD",
        "raw_text": "Optional raw text",
        "created_at": "timestamp"
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `PUT /expenses/:id`

*   **Purpose:** Update an existing expense.
*   **Method:** `PUT`
*   **URL Parameters:** `:id` (Expense ID)
*   **Request Body:**
    ```json
    {
      "description": "Updated Expense",
      "amount": 60.00,
      "paid_by_user_id": "uuid",
      "date": "YYYY-MM-DD",
      "raw_text": "Updated raw text"
    }
    ```
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "group_id": "uuid",
        "description": "Updated Expense",
        "amount": 60.00,
        "paid_by_user_id": "uuid",
        "date": "YYYY-MM-DD",
        "raw_text": "Updated raw text",
        "created_at": "timestamp"
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `DELETE /expenses/:id`

*   **Purpose:** Delete an expense.
*   **Method:** `DELETE`
*   **URL Parameters:** `:id` (Expense ID)
*   **Request Body:** None
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "group_id": "uuid",
        "description": "Deleted Expense",
        "amount": 60.00,
        "paid_by_user_id": "uuid",
        "date": "YYYY-MM-DD",
        "raw_text": "Deleted raw text",
        "created_at": "timestamp"
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

## Participants Endpoints

### `GET /groups/:id/participants`

*   **Purpose:** Retrieve participants for a specific group.
*   **Method:** `GET`
*   **URL Parameters:** `:id` (Group ID)
*   **Request Parameters:** None
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "group_id": "uuid",
        "user_id": "uuid",
        "created_at": "timestamp",
        "users": { // Joined from 'users' table
          "email": "participant@example.com"
        }
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
    ```

### `POST /groups/:id/participants`

*   **Purpose:** Add a participant to a group.
*   **Method:** `POST`
*   **URL Parameters:** `:id` (Group ID)
*   **Request Body:**
    ```json
    {
      "user_id": "uuid" // User ID to add
    }
    ```
*   **Response Body (Success 201):**
    ```json
    [
      {
        "id": "uuid",
        "group_id": "uuid",
        "user_id": "uuid",
        "created_at": "timestamp"
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
  ```

### `DELETE /groups/:id/participants/:user_id`

*   **Purpose:** Remove a participant from a group.
*   **Method:** `DELETE`
*   **URL Parameters:** `:id` (Group ID), `:user_id` (User ID to remove)
*   **Request Body:** None
*   **Response Body (Success 200):**
    ```json
    [
      {
        "id": "uuid",
        "group_id": "uuid",
        "user_id": "uuid",
        "created_at": "timestamp"
      }
    ]
    ```
*   **Response Body (Error 400):**
    ```json
    {
      "error": "Error message"
    }
