# Project Roadmap: SplitPay APP

## High-Level Goals

*   Implement core manual expense management (Phase 1).
*   Integrate AI-powered receipt processing (Phase 2).
*   Implement splitting logic and financial summary (Phase 3).
*   Ensure secure user authentication and data handling.
*   Deploy the MVP to Netlify and Supabase free tiers.
*   Design for Xtensibility for future iOS app development.
*   Design for Clairvoyance, anticipating future AI features.

## Key Features

*   User authentication (signup, login, logout).
*   Group creation and management.
*   Expense entry and management.
*   Adding and removing participants from groups.
*   Uploading and processing receipt images using AI.
*   Calculating and displaying expense splits.
*   Generating financial summaries ("who owes whom").

## Completion Criteria

*   All key features are implemented and tested.
*   The application is successfully deployed to Netlify and Supabase free tiers.
*   User data is handled securely.
*   The architecture supports future expansion (iOS app, additional AI features).

## Progress Tracker

### Phase 0: Foundation & Project Setup
- [x] Set up Node.js/Express.js project structure.
- [x] Configure environment variables for database and API keys.
- [x] Implement basic server setup and routing.
- [x] Integrate with Supabase for database connection.
- [x] Implement backend data transformation layer (UUID to Integer IDs).

### Phase 1: Core Functionality - Manual Expense Management
- [ ] Design and implement database schema for users, groups, and expenses.
- [ ] Develop CRUD API endpoints for groups.
- [ ] Develop CRUD API endpoints for expenses.
- [ ] Implement user authentication endpoints (signup, login, logout).

### Phase 2: AI-Powered Receipt Processing
- [ ] Create backend endpoint for image uploads.
- [ ] Integrate with Supabase Storage for image storage.
- [ ] Implement logic to send images to Google Gemini 2.0 Flash API for OCR.
- [ ] Develop parsing logic for Gemini API response.
- [ ] Implement logic to save parsed data to the database.

### Phase 3: Splitting Logic & Financial Summary
- [ ] Develop backend logic to calculate unequal expense splits.
- [ ] Implement endpoint to calculate and return financial summaries.

## Completed Tasks

*   Implemented backend data transformation layer (UUID to Integer IDs), including creating `transformers.js`, modifying existing endpoints, and adding the `/api/users/me` endpoint.
