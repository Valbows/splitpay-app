export const ROUTES = {
  // Main Application Routes
  DASHBOARD: '/',
  
  // Groups
  GROUPS: '/groups',
  GROUP_LIST: '/groups',
  CREATE_GROUP: '/groups/create',
  JOIN_GROUP: '/groups/join',
  GROUP_DETAIL: '/groups/:id',
  GROUP_MEMBERS: '/groups/:id/members',
  GROUP_EXPENSES: '/groups/:id/expenses',
  GROUP_SUMMARY: '/groups/:id/summary',

  // Expenses
  EXPENSES: '/expenses',
  ADD_EXPENSE: '/expenses/add',
  UPLOAD_RECEIPT: '/expenses/upload',
  EXPENSE_DETAIL: '/expenses/:id',

  // Settings
  SETTINGS: '/settings',
  PROFILE: '/settings/profile',
  NOTIFICATIONS: '/settings/notifications',
  ACCOUNT: '/settings/account',
} as const;

// Helper function to generate actual routes from route patterns
export const generatePath = (route: string, params: Record<string, string> = {}) => {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  );
};

export const getGroupDetailRoute = (id: string) => `/groups/${id}`
export const getExpenseDetailRoute = (id: string) => `/expenses/${id}`
export const getGroupInviteRoute = (id: string) => `/groups/${id}/invite`
export const getExpenseCreateRoute = (groupId: string) => `/groups/${groupId}/expenses/create`
export const getExpenseUploadRoute = (groupId: string) => `/groups/${groupId}/expenses/upload`
export const getExpenseReviewRoute = (groupId: string) => `/groups/${groupId}/expenses/review`
