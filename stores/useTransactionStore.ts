import { create } from 'zustand'
import { Transaction, TransactionType, Category } from '../types'
import { StorageKeys, saveData, loadData } from '../lib/storage'
import { nanoid } from 'nanoid/non-secure'

interface TransactionStore {
  transactions: Transaction[]
  isHydrated: boolean
  hydrate: () => Promise<void>
  addTransaction: (
    data: Omit<Transaction, 'id' | 'createdAt'>
  ) => void
  editTransaction: (id: string, data: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  getByCategory: (category: Category) => Transaction[]
  getByType: (type: TransactionType) => Transaction[]
  getByDateRange: (start: string, end: string) => Transaction[]
}

export const useTransactionStore = create<TransactionStore>((set, get) => ({
  transactions: [],
  isHydrated: false,

  hydrate: async () => {
    const saved = await loadData<Transaction[]>(StorageKeys.TRANSACTIONS)
    set({ transactions: saved ?? [], isHydrated: true })
  },

  addTransaction: (data) => {
    const transaction: Transaction = {
      ...data,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    }
    const updated = [transaction, ...get().transactions]
    set({ transactions: updated })
    saveData(StorageKeys.TRANSACTIONS, updated)
  },

  editTransaction: (id, data) => {
    const updated = get().transactions.map((t) =>
      t.id === id ? { ...t, ...data } : t
    )
    set({ transactions: updated })
    saveData(StorageKeys.TRANSACTIONS, updated)
  },

  deleteTransaction: (id) => {
    const updated = get().transactions.filter((t) => t.id !== id)
    set({ transactions: updated })
    saveData(StorageKeys.TRANSACTIONS, updated)
  },

  getByCategory: (category) =>
    get().transactions.filter((t) => t.category === category),

  getByType: (type) =>
    get().transactions.filter((t) => t.type === type),

  getByDateRange: (start, end) =>
    get().transactions.filter((t) => t.date >= start && t.date <= end),
}))