import { create } from 'zustand'
import { RecurringRule } from '../types'
import { StorageKeys, saveData, loadData } from '../lib/storage'
import { nanoid } from 'nanoid/non-secure'
import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
} from 'date-fns'

interface RecurringStore {
  rules: RecurringRule[]
  isHydrated: boolean
  hydrate: () => Promise<void>
  addRule: (data: Omit<RecurringRule, 'id' | 'createdAt'>) => void
  editRule: (id: string, data: Partial<RecurringRule>) => void
  deleteRule: (id: string) => void
  toggleRule: (id: string) => void
  advanceNextDueDate: (id: string) => void
  getDueRules: () => RecurringRule[]
}

function getNextDate(frequency: RecurringRule['frequency'], from: Date): Date {
  switch (frequency) {
    case 'daily': return addDays(from, 1)
    case 'weekly': return addWeeks(from, 1)
    case 'monthly': return addMonths(from, 1)
    case 'yearly': return addYears(from, 1)
  }
}

export const useRecurringStore = create<RecurringStore>((set, get) => ({
  rules: [],
  isHydrated: false,

  hydrate: async () => {
    const saved = await loadData<RecurringRule[]>(StorageKeys.RECURRING)
    set({ rules: saved ?? [], isHydrated: true })
  },

  addRule: (data) => {
    const rule: RecurringRule = {
      ...data,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    }
    const updated = [...get().rules, rule]
    set({ rules: updated })
    saveData(StorageKeys.RECURRING, updated)
  },

  editRule: (id, data) => {
    const updated = get().rules.map((r) =>
      r.id === id ? { ...r, ...data } : r
    )
    set({ rules: updated })
    saveData(StorageKeys.RECURRING, updated)
  },

  deleteRule: (id) => {
    const updated = get().rules.filter((r) => r.id !== id)
    set({ rules: updated })
    saveData(StorageKeys.RECURRING, updated)
  },

  toggleRule: (id) => {
    const updated = get().rules.map((r) =>
      r.id === id ? { ...r, isActive: !r.isActive } : r
    )
    set({ rules: updated })
    saveData(StorageKeys.RECURRING, updated)
  },

  advanceNextDueDate: (id) => {
    const rule = get().rules.find((r) => r.id === id)
    if (!rule) return
    const next = getNextDate(rule.frequency, new Date(rule.nextDueDate))
    get().editRule(id, { nextDueDate: next.toISOString() })
  },

  getDueRules: () => {
    const now = new Date()
    return get().rules.filter(
      (r) => r.isActive && new Date(r.nextDueDate) <= now
    )
  },
}))