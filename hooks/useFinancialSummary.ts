import { useMemo } from 'react'
import { useTransactionStore } from '../stores/useTransactionStore'
import { useBudgetStore } from '../stores/useBudgetStore'
import { useSettingsStore } from '../stores/useSettingsStore'
import { Category } from '../types'
import { CATEGORIES } from '../constants/categories'

export function useFinancialSummary() {
  const transactions = useTransactionStore((s) => s.transactions)
  const budgets = useBudgetStore((s) => s.budgets)
  const getPeriodRange = useBudgetStore((s) => s.getPeriodRange)
  const currencySymbol = useSettingsStore((s) => s.settings.currencySymbol)

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  )

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  )

  const balance = useMemo(
    () => totalIncome - totalExpenses,
    [totalIncome, totalExpenses]
  )

  const spendingByCategory = useMemo(() => {
    const map: Record<string, number> = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] ?? 0) + t.amount
      })
    return map
  }, [transactions])

  const budgetUtilization = useMemo(() => {
    return budgets.map((budget) => {
      const { start, end } = getPeriodRange(budget.period)
      const spent = transactions
        .filter(
          (t) =>
            t.type === 'expense' &&
            t.category === budget.category &&
            t.date >= start &&
            t.date <= end
        )
        .reduce((sum, t) => sum + t.amount, 0)

      const percentage = Math.min((spent / budget.amount) * 100, 100)
      const remaining = Math.max(budget.amount - spent, 0)
      const isOverBudget = spent > budget.amount

      return {
        budget,
        spent,
        remaining,
        percentage,
        isOverBudget,
        meta: CATEGORIES[budget.category as Category],
      }
    })
  }, [budgets, transactions, getPeriodRange])

  const monthlyTrend = useMemo(() => {
    const map: Record<string, { income: number; expense: number }> = {}
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7)
      if (!map[month]) map[month] = { income: 0, expense: 0 }
      if (t.type === 'income') map[month].income += t.amount
      else map[month].expense += t.amount
    })
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, values]) => ({ month, ...values }))
  }, [transactions])

  return {
    totalIncome,
    totalExpenses,
    balance,
    spendingByCategory,
    budgetUtilization,
    monthlyTrend,
    currencySymbol,
  }
}