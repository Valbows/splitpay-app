# Project Context: SplitPay APP

This document outlines the project-specific context for the SplitPay APP, aligning with the principles of the Cline AI Development Framework.

## Background and Motivation

The SplitPay APP aims to simplify and automate the process of splitting group expenses, eliminating manual calculations and potential errors. The motivation is to provide a clear, fair, and automated platform for tracking shared costs among friends, freelancers, and businesses, offering "Altruistic value" by reducing financial friction in group settings.

## Success Criteria and Constraints

**Success Criteria:**

*   Successfully implement core manual expense management (Phase 1).
*   Successfully integrate AI-powered receipt processing (Phase 2).
*   Successfully implement splitting logic and financial summary (Phase 3).
*   Secure user authentication and data handling.
*   Deploy the MVP to Netlify and Supabase free tiers.
*   Achieve a "Simple MVP" that delivers core value.
*   Design the architecture to be "Xtensible" for future iOS app development.
*   Ensure the design is "Clairvoyant," anticipating future AI features.

**Constraints:**

*   Initial development is focused on the Web App MVP.
*   Utilize free tiers for initial deployment (Netlify, Supabase).
*   Adhere to a four-phase implementation timeline.
*   Small team size (3 developers: Backend, Frontend, Database).
*   Beginner experience level within the team.
*   My role is strictly focused on backend development.

## Key Stakeholders and Requirements

*   **Users:** Individuals and groups needing to split expenses (friends, freelancers, businesses). Requirements include ease of use, accuracy in calculations, secure data, and clear financial summaries.
*   **Development Team:** Requires clear tasks, well-defined architecture, and efficient tools.
*   **Project Owner:** Requires timely delivery of features according to the phased plan and adherence to budget constraints (free tiers).

## Technical Architecture Overview

The SplitPay APP follows a PERN stack architecture for the Web App MVP:

*   **Frontend:** React (via Vite) for a dynamic user interface.
*   **Backend:** Node.js with Express.js for building robust APIs.
*   **Database:** PostgreSQL, managed by Supabase for database, authentication, and storage services.

The architecture is designed to be Xtensible, allowing for the future integration of a SwiftUI-based iOS application that will interact with the same backend services.

**Key Technologies:**

*   React, Vite
*   Node.js, Express.js
*   PostgreSQL, Supabase
*   Google Gemini 2.0 Flash (for Web App OCR)
*   Apple's Vision framework (for future iOS OCR)
*   Git (Simplified Git-Flow)
*   Supabase Auth / Passport.js

This project context serves as a foundational document for all development activities, ensuring alignment with the project's vision and constraints as per the Cline AI Development Framework.
