export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
  PROFILE: `${API_BASE_URL}/auth/profile`,
} as const;

export const GROUP_ENDPOINTS = {
  LIST: `${API_BASE_URL}/groups`,
  CREATE: `${API_BASE_URL}/groups`,
  DETAIL: (id: string) => `${API_BASE_URL}/groups/${id}`,
  JOIN: `${API_BASE_URL}/groups/join`,
  MEMBERS: (id: string) => `${API_BASE_URL}/groups/${id}/members`,
  INVITE: (id: string) => `${API_BASE_URL}/groups/${id}/invite`,
  SUMMARY: (id: string) => `${API_BASE_URL}/groups/${id}/summary`,
} as const;

export const EXPENSE_ENDPOINTS = {
  LIST: `${API_BASE_URL}/expenses`,
  CREATE: `${API_BASE_URL}/expenses`,
  DETAIL: (id: string) => `${API_BASE_URL}/expenses/${id}`,
  UPDATE: (id: string) => `${API_BASE_URL}/expenses/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/expenses/${id}`,
  GROUP_EXPENSES: (groupId: string) => `${API_BASE_URL}/groups/${groupId}/expenses`,
  UPLOAD_RECEIPT: `${API_BASE_URL}/expenses/upload-receipt`,
  PROCESS_RECEIPT: `${API_BASE_URL}/expenses/process-receipt`,
} as const;

export const USER_ENDPOINTS = {
  LIST: `${API_BASE_URL}/users`,
  DETAIL: (id: string) => `${API_BASE_URL}/users/${id}`,
} as const;

export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Accommodation",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Other",
] as const
