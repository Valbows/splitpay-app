// API Service for SplitPay Frontend
const API_BASE_URL = 'http://localhost:3001';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
}

export interface Group {
  id: number;
  name: string;
  description?: string;
  category?: string;
  created_by_user_id: number;
  created_at: string;
  updated_at?: string;
  member_count?: number;
}

export interface GroupMember {
  id: number;
  group_id: number;
  user_id: number;
  role: 'admin' | 'member';
  joined_at: string;
  user?: User;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  group_id: number;
  paid_by_user_id: number;
  receipt_url?: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  group?: Group;
  paid_by_user?: User;
}

export interface ExpenseSplit {
  id: number;
  expense_id: number;
  user_id: number;
  amount: number;
  split_type: 'equal' | 'exact' | 'percentage';
  settled_at?: string;
  settled_by_user_id?: number;
  user?: User;
}

export interface DashboardMetrics {
  total_balance: number;
  active_groups: number;
  pending_actions: number;
  settled_payments: number;
  balance_change: number;
  groups_change: number;
  actions_change: number;
  payments_change: number;
}

export interface ChartData {
  spending_trends: Array<{ date: string; amount: number }>;
  pending_payments: Array<{ group_name: string; amount: number }>;
}

export interface Activity {
  id: number;
  user_id: number;
  group_id?: number;
  activity_type: string;
  description: string;
  created_at: string;
  group?: Group;
  user?: User;
}

export interface GroupInvitation {
  id: number;
  group_id: number;
  email?: string;
  invited_by_user_id: number;
  invitation_code: string;
  expires_at: string;
  accepted_at?: string;
}

export interface GroupBalance {
  user_id: number;
  user_name: string;
  avatar_url?: string;
  balance_type: 'owe' | 'owed';
  balance_amount: number;
}

// Generic API function with authentication
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      // Add authentication token when available
      ...(localStorage.getItem('auth_token') && {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      })
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Dashboard API
export const dashboardApi = {
  getMetrics: (): Promise<DashboardMetrics> => apiRequest('/api/dashboard/metrics'),
  getChartData: (): Promise<ChartData> => apiRequest('/api/dashboard/charts'),
  getRecentActivity: (limit = 10): Promise<Activity[]> => 
    apiRequest(`/api/dashboard/activity?limit=${limit}`),
};

// Users API
export const usersApi = {
  getAll: (): Promise<User[]> => apiRequest('/api/users'),
  getById: (id: number): Promise<User> => apiRequest(`/api/users/${id}`),
  getCurrentUser: (): Promise<User> => apiRequest('/api/users/me'),
  create: (user: Omit<User, 'id' | 'created_at'>): Promise<User> =>
    apiRequest('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
  update: (id: number, user: Partial<User>): Promise<User> =>
    apiRequest(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),
  delete: (id: number): Promise<{ message: string }> =>
    apiRequest(`/api/users/${id}`, { method: 'DELETE' }),
  uploadAvatar: (id: number, file: File): Promise<User> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiRequest(`/api/users/${id}/avatar`, {
      method: 'POST',
      body: formData,
      headers: {
        // Remove Content-Type to let browser set it with boundary
        ...(localStorage.getItem('auth_token') && {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        })
      },
    });
  },
};

// Groups API
export const groupsApi = {
  getAll: (): Promise<Group[]> => apiRequest('/api/groups'),
  getUserGroups: (): Promise<Group[]> => apiRequest('/api/groups/user'),
  getById: (id: number): Promise<Group> => apiRequest(`/api/groups/${id}`),
  create: (group: Omit<Group, 'id' | 'created_at' | 'updated_at' | 'created_by_user_id'>): Promise<Group> =>
    apiRequest('/api/groups', {
      method: 'POST',
      body: JSON.stringify(group),
    }),
  update: (id: number, group: Partial<Group>): Promise<Group> =>
    apiRequest(`/api/groups/${id}`, {
      method: 'PUT',
      body: JSON.stringify(group),
    }),
  delete: (id: number): Promise<{ message: string }> =>
    apiRequest(`/api/groups/${id}`, { method: 'DELETE' }),
  
  // Group Members
  getMembers: (groupId: number): Promise<GroupMember[]> => 
    apiRequest(`/api/groups/${groupId}/members`),
  addMember: (groupId: number, userId: number, role: 'admin' | 'member' = 'member'): Promise<GroupMember> =>
    apiRequest(`/api/groups/${groupId}/members`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, role }),
    }),
  removeMember: (groupId: number, userId: number): Promise<{ message: string }> =>
    apiRequest(`/api/groups/${groupId}/members/${userId}`, { method: 'DELETE' }),
  updateMemberRole: (groupId: number, userId: number, role: 'admin' | 'member'): Promise<GroupMember> =>
    apiRequest(`/api/groups/${groupId}/members/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    }),
  
  // Group Balances
  getBalances: (groupId: number): Promise<GroupBalance[]> =>
    apiRequest(`/api/groups/${groupId}/balances`),
  
  // Group Invitations
  createInvitation: (groupId: number, email: string): Promise<GroupInvitation> =>
    apiRequest(`/api/groups/${groupId}/invitations`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  createInviteLink: (groupId: number): Promise<{ link: string; code: string }> =>
    apiRequest(`/api/groups/${groupId}/invite-link`, { method: 'POST' }),
  acceptInvitation: (invitationCode: string): Promise<{ group: Group; message: string }> =>
    apiRequest('/api/invitations/accept', {
      method: 'POST',
      body: JSON.stringify({ invitation_code: invitationCode }),
    }),
  getPendingInvitations: (groupId: number): Promise<GroupInvitation[]> =>
    apiRequest(`/api/groups/${groupId}/invitations/pending`),
};

// Expenses API
export const expensesApi = {
  getAll: (groupId?: number): Promise<Expense[]> => {
    const endpoint = groupId ? `/api/expenses?groupId=${groupId}` : '/api/expenses';
    return apiRequest(endpoint);
  },
  getById: (id: number): Promise<Expense> => apiRequest(`/api/expenses/${id}`),
  getUserExpenses: (): Promise<Expense[]> => apiRequest('/api/expenses/user'),
  create: (expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>): Promise<Expense> =>
    apiRequest('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expense),
    }),
  update: (id: number, expense: Partial<Expense>): Promise<Expense> =>
    apiRequest(`/api/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(expense),
    }),
  delete: (id: number): Promise<{ message: string }> =>
    apiRequest(`/api/expenses/${id}`, { method: 'DELETE' }),
  uploadReceipt: (id: number, file: File): Promise<Expense> => {
    const formData = new FormData();
    formData.append('receipt', file);
    return apiRequest(`/api/expenses/${id}/receipt`, {
      method: 'POST',
      body: formData,
      headers: {
        ...(localStorage.getItem('auth_token') && {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        })
      },
    });
  },
  
  // Expense Splits
  getSplits: (expenseId: number): Promise<ExpenseSplit[]> =>
    apiRequest(`/api/expenses/${expenseId}/splits`),
  createSplits: (expenseId: number, splits: Omit<ExpenseSplit, 'id' | 'expense_id'>[]): Promise<ExpenseSplit[]> =>
    apiRequest(`/api/expenses/${expenseId}/splits`, {
      method: 'POST',
      body: JSON.stringify({ splits }),
    }),
  updateSplit: (expenseId: number, splitId: number, split: Partial<ExpenseSplit>): Promise<ExpenseSplit> =>
    apiRequest(`/api/expenses/${expenseId}/splits/${splitId}`, {
      method: 'PUT',
      body: JSON.stringify(split),
    }),
  settleSplit: (expenseId: number, splitId: number): Promise<ExpenseSplit> =>
    apiRequest(`/api/expenses/${expenseId}/splits/${splitId}/settle`, { method: 'POST' }),
  
  // Expense Comments
  getComments: (expenseId: number): Promise<any[]> =>
    apiRequest(`/api/expenses/${expenseId}/comments`),
  addComment: (expenseId: number, comment: string): Promise<any> =>
    apiRequest(`/api/expenses/${expenseId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    }),
};

// Authentication API
export const authApi = {
  login: (email: string, password: string): Promise<{ user: User; token: string }> =>
    apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (user: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> =>
    apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
  logout: (): Promise<{ message: string }> =>
    apiRequest('/api/auth/logout', { method: 'POST' }),
  refreshToken: (): Promise<{ token: string }> =>
    apiRequest('/api/auth/refresh', { method: 'POST' }),
  forgotPassword: (email: string): Promise<{ message: string }> =>
    apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  resetPassword: (token: string, password: string): Promise<{ message: string }> =>
    apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),
};

// Health check
export const healthCheck = (): Promise<{ status: string; timestamp: string }> =>
  apiRequest('/health');

// Export all APIs
export default {
  dashboard: dashboardApi,
  users: usersApi,
  groups: groupsApi,
  expenses: expensesApi,
  auth: authApi,
  healthCheck,
}; 