"use client"

import { useState, useEffect } from "react"
import type { Expense, CreateExpenseData, UpdateExpenseData } from "@/types/expense.types"
import * as expensesService from "@/services/api/expenses"
import { useToast } from "@/context/ToastContext"

export const useExpenses = (groupId?: string) => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToast } = useToast()

  const fetchExpenses = async () => {
    try {
      setIsLoading(true)
      const data = groupId ? await expensesService.getGroupExpenses(groupId) : await expensesService.getExpenses()
      setExpenses(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch expenses")
    } finally {
      setIsLoading(false)
    }
  }

  const createExpense = async (data: CreateExpenseData) => {
    try {
      const newExpense = await expensesService.createExpense(data)
      setExpenses((prev) => [newExpense, ...prev])
      addToast({
        title: "Expense added successfully!",
        description: `${data.description} has been added to the group.`,
        variant: "success",
      })
      return newExpense
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create expense"
      addToast({
        title: "Failed to add expense",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  const updateExpense = async (data: UpdateExpenseData) => {
    try {
      const updatedExpense = await expensesService.updateExpense(data)
      setExpenses((prev) => prev.map((expense) => (expense.id === data.id ? updatedExpense : expense)))
      addToast({
        title: "Expense updated successfully!",
        variant: "success",
      })
      return updatedExpense
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update expense"
      addToast({
        title: "Failed to update expense",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  const deleteExpense = async (id: string) => {
    try {
      await expensesService.deleteExpense(id)
      setExpenses((prev) => prev.filter((expense) => expense.id !== id))
      addToast({
        title: "Expense deleted successfully!",
        variant: "success",
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete expense"
      addToast({
        title: "Failed to delete expense",
        description: message,
        variant: "destructive",
      })
      throw err
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [groupId])

  return {
    expenses,
    isLoading,
    error,
    createExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses,
  }
}
