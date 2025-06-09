import { EXPENSE_ENDPOINTS } from '../../constants/api-endpoints';
import { CreateExpenseInput, Expense } from '../../types/expense.types';
import { api } from '../utils/api-client';

interface ExpenseResponse {
  data: {
    expense: Expense;
  };
}

interface ExpensesResponse {
  data: {
    expenses: Expense[];
  };
}

interface ReceiptUploadResponse {
  data: {
    receiptUrl: string;
    extractedData: {
      amount: number;
      date: string;
      description: string;
      category?: string;
      items?: Array<{
        description: string;
        amount: number;
      }>;
    };
  };
}

export const expenseService = {
  async fetchExpenses(groupId: string): Promise<Expense[]> {
    const response = await api.get<ExpensesResponse>(
      EXPENSE_ENDPOINTS.GROUP_EXPENSES(groupId)
    );
    return response.data.expenses;
  },

  async createExpense(input: CreateExpenseInput): Promise<Expense> {
    const response = await api.post<ExpenseResponse>(
      EXPENSE_ENDPOINTS.CREATE,
      input
    );
    return response.data.expense;
  },

  async updateExpense(
    id: string,
    input: Partial<CreateExpenseInput>
  ): Promise<Expense> {
    const response = await api.put<ExpenseResponse>(
      EXPENSE_ENDPOINTS.UPDATE(id),
      input
    );
    return response.data.expense;
  },

  async deleteExpense(id: string): Promise<void> {
    await api.delete(EXPENSE_ENDPOINTS.DELETE(id));
  },

  async fetchExpenseById(id: string): Promise<Expense> {
    const response = await api.get<ExpenseResponse>(EXPENSE_ENDPOINTS.DETAIL(id));
    return response.data.expense;
  },

  async uploadReceipt(groupId: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('receipt', file);
    formData.append('groupId', groupId);

    const response = await api.post<ReceiptUploadResponse>(
      EXPENSE_ENDPOINTS.UPLOAD_RECEIPT,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.receiptUrl;
  },

  async processReceipt(receiptUrl: string): Promise<ReceiptUploadResponse['data']['extractedData']> {
    const response = await api.post<ReceiptUploadResponse>(
      EXPENSE_ENDPOINTS.PROCESS_RECEIPT,
      { receiptUrl }
    );
    return response.data.extractedData;
  },
};
