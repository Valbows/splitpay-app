import { User } from './auth.types';

export interface ExpenseSplit {
  user: User;
  amount: number;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: User;
  splitBetween: ExpenseSplit[];
  date: Date;
  category: string;
  notes?: string;
  receiptUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExpenseInput {
  groupId: string;
  description: string;
  amount: number;
  paidBy: string; // userId
  splitBetween: { userId: string; amount: number }[];
  date: Date;
  category: string;
  notes?: string;
  receiptUrl?: string;
}

export interface ExpensesState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
}

export interface ExpenseContextType extends ExpensesState {
  createExpense: (input: CreateExpenseInput) => Promise<Expense>;
  updateExpense: (id: string, input: Partial<CreateExpenseInput>) => Promise<Expense>;
  deleteExpense: (id: string) => Promise<void>;
  fetchExpenses: (groupId: string) => Promise<Expense[]>;
  fetchExpenseById: (id: string) => Promise<Expense>;
}

export interface ExpenseCategory {
  id: string
  name: string
  icon: string
  color: string
}

export interface ReceiptData {
  description: string
  amount: string
  date: string
  merchant: string
  category: string
}

export interface AIConfidence {
  description: number
  amount: number
  date: number
  merchant: number
}
