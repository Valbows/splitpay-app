# SplitPay Frontend Structure

```
frontend/
├── src/
│   ├── assets/                    # Static files
│   │   ├── images/               # Image assets
│   │   ├── icons/                # Icon assets
│   │   ├── fonts/                # Custom fonts
│   │   └── styles/               # Global styles
│   │       ├── global.css
│   │       └── variables.css     # CSS variables and themes
│   │
│   ├── components/               # Reusable UI components
│   │   ├── auth/                 # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   └── AuthLayout.tsx
│   │   │
│   │   ├── core/                # Core UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   ├── expenses/            # Expense-related components
│   │   │   ├── ExpenseForm.tsx
│   │   │   ├── ExpenseList.tsx
│   │   │   ├── ExpenseCard.tsx
│   │   │   ├── ReceiptUpload.tsx
│   │   │   └── ExpenseSummary.tsx
│   │   │
│   │   ├── groups/              # Group-related components
│   │   │   ├── GroupList.tsx
│   │   │   ├── GroupCard.tsx
│   │   │   ├── GroupForm.tsx
│   │   │   └── GroupMembers.tsx
│   │   │
│   │   └── shared/              # Shared/utility components
│   │       ├── ErrorBoundary.tsx
│   │       ├── Toast.tsx
│   │       └── Tooltip.tsx
│   │
│   ├── pages/                    # Application pages/routes
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── SignUpPage.tsx
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   ├── groups/
│   │   │   ├── GroupListPage.tsx
│   │   │   └── GroupDetailPage.tsx
│   │   ├── expenses/
│   │   │   ├── ExpenseListPage.tsx
│   │   │   └── ExpenseDetailPage.tsx
│   │   └── settings/
│   │       └── SettingsPage.tsx
│   │
│   ├── services/                 # API and external services
│   │   ├── api/
│   │   │   ├── auth.ts          # Authentication API calls
│   │   │   ├── expenses.ts      # Expenses API calls
│   │   │   ├── groups.ts        # Groups API calls
│   │   │   └── users.ts         # User-related API calls
│   │   └── utils/
│   │       ├── api-client.ts    # Axios/Fetch configuration
│   │       └── storage.ts       # Local storage utilities
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useGroups.ts
│   │   ├── useExpenses.ts
│   │   └── useToast.ts
│   │
│   ├── context/                  # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── expense.types.ts
│   │   └── group.types.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── date-formatter.ts
│   │   ├── currency-formatter.ts
│   │   └── validators.ts
│   │
│   ├── constants/                # Constants and configurations
│   │   ├── routes.ts
│   │   └── api-endpoints.ts
│   │
│   ├── App.tsx                   # Main App component
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts            # Vite type declarations
│
├── public/                       # Public static files
│   ├── favicon.ico
│   └── manifest.json
│
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── .eslintrc.json               # ESLint configuration
└── .prettierrc                  # Prettier configuration
```

## Key Features of This Structure

1. **Component Organization**
   - Modular components grouped by feature
   - Shared components for reusability
   - Clear separation of concerns

2. **Type Safety**
   - Full TypeScript integration
   - Centralized type definitions
   - Strict type checking

3. **State Management**
   - React Context for global state
   - Custom hooks for shared logic
   - Centralized API services

4. **Styling**
   - Global CSS variables
   - Component-specific styles
   - Responsive design support

5. **Code Quality**
   - ESLint configuration
   - Prettier formatting
   - Consistent code style

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ``` 