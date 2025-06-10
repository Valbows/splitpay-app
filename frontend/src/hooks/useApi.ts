import { useState, useEffect } from 'react';
import api, { 
  DashboardMetrics, 
  ChartData, 
  Activity, 
  Group, 
  Expense, 
  GroupMember, 
  GroupBalance,
  ExpenseSplit 
} from '../services/api';

// Generic hook for API calls with loading and error states
export const useApiCall = <T>(
  apiCall: () => Promise<T>, 
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Dashboard hooks
export const useDashboardMetrics = () => {
  return useApiCall<DashboardMetrics>(() => api.dashboard.getMetrics());
};

export const useChartData = () => {
  return useApiCall<ChartData>(() => api.dashboard.getChartData());
};

export const useRecentActivity = (limit = 10) => {
  return useApiCall<Activity[]>(() => api.dashboard.getRecentActivity(limit), [limit]);
};

// Groups hooks
export const useUserGroups = () => {
  return useApiCall<Group[]>(() => api.groups.getUserGroups());
};

export const useGroup = (groupId: number) => {
  return useApiCall<Group>(() => api.groups.getById(groupId), [groupId]);
};

export const useGroupMembers = (groupId: number) => {
  return useApiCall<GroupMember[]>(() => api.groups.getMembers(groupId), [groupId]);
};

export const useGroupBalances = (groupId: number) => {
  return useApiCall<GroupBalance[]>(() => api.groups.getBalances(groupId), [groupId]);
};

// Expenses hooks
export const useUserExpenses = () => {
  return useApiCall<Expense[]>(() => api.expenses.getUserExpenses());
};

export const useGroupExpenses = (groupId: number) => {
  return useApiCall<Expense[]>(() => api.expenses.getAll(groupId), [groupId]);
};

export const useExpense = (expenseId: number) => {
  return useApiCall<Expense>(() => api.expenses.getById(expenseId), [expenseId]);
};

export const useExpenseSplits = (expenseId: number) => {
  return useApiCall<ExpenseSplit[]>(() => api.expenses.getSplits(expenseId), [expenseId]);
};

// Mutation hooks for creating/updating data
export const useCreateGroup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGroup = async (groupData: {
    name: string;
    description?: string;
    category?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.groups.create(groupData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create group';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createGroup, loading, error };
};

export const useCreateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createExpense = async (expenseData: {
    description: string;
    amount: number;
    group_id: number;
    paid_by_user_id: number;
    receipt_url?: string;
    notes?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.expenses.create(expenseData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create expense';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createExpense, loading, error };
};

export const useCreateExpenseSplits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSplits = async (expenseId: number, splits: {
    user_id: number;
    amount: number;
    split_type: 'equal' | 'exact' | 'percentage';
  }[]) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.expenses.createSplits(expenseId, splits);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create splits';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createSplits, loading, error };
};

export const useSettleSplit = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const settleSplit = async (expenseId: number, splitId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.expenses.settleSplit(expenseId, splitId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to settle split';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { settleSplit, loading, error };
};

export const useInviteToGroup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inviteByEmail = async (groupId: number, email: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.groups.createInvitation(groupId, email);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send invitation';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createInviteLink = async (groupId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.groups.createInviteLink(groupId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create invite link';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { inviteByEmail, createInviteLink, loading, error };
}; 