import { create } from 'zustand'
import { Budget, Category, BudgetPeriod } from '../types'
import { StorageKeys, saveData, loadData } from '../lib/storage'
import { nanoid } from 'nanoid/non-secure'
import { startOfWeek, startOfMonth, endOfWeek, endOfMonth } from 'date-fns'

interface BudgetStore {
  budgets: Budget[]
  isHydrated: boolean
  hydrate: () => Promise<void>
  addBudget: (data: Omit<Budget, 'id' | 'createdAt'>) => void
  editBudget: (id: string, data: Partial<Budget>) => void
  deleteBudget: (id: string) => void
  getBudgetByCategory: (category: Category) => Budget | undefined
  getPeriodRange: (period: BudgetPeriod) => { start: string; end: string }
}

export const useBudgetStore = create<BudgetStore>((set, get) => ({
  budgets: [],
  isHydrated: false,

  hydrate: async () => {
    const saved = await loadData<Budget[]>(StorageKeys.BUDGETS)
    set({ budgets: saved ?? [], isHydrated: true })
  },

  addBudget: (data) => {
    const existing = get().budgets.find((b) => b.category === data.category)
    if (existing) {
      get().editBudget(existing.id, { amount: data.amount, period: data.period })
      return
    }
    const budget: Budget = {
      ...data,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...get().budgets, budget]
    set({ budgets: updated })
    saveData(StorageKeys.BUDGETS, updated)
  },

  editBudget: (id, data) => {
    const updated = get().budgets.map((b) =>
      b.id === id ? { ...b, ...data } : b
    )
    set({ budgets: updated })
    saveData(StorageKeys.BUDGETS, updated)
  },

  deleteBudget: (id) => {
    const updated = get().budgets.filter((b) => b.id !== id)
    set({ budgets: updated })
    saveData(StorageKeys.BUDGETS, updated)
  },

  getBudgetByCategory: (category) =>
    get().budgets.find((b) => b.category === category),

  getPeriodRange: (period) => {
    const now = new Date()
    if (period === 'weekly') {
      return {
        start: startOfWeek(now).toISOString(),
        end: endOfWeek(now).toISOString(),
      }
    }
    return {
      start: startOfMonth(now).toISOString(),
      end: endOfMonth(now).toISOString(),
    }
  },
}))