export type TransactionType = 'income' | 'expense'

export type Category =
  | 'food'
  | 'transport'
  | 'housing'
  | 'entertainment'
  | 'health'
  | 'shopping'
  | 'salary'
  | 'freelance'
  | 'utilities'
  | 'other'

export type RecurringFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly'

export type BudgetPeriod = 'weekly' | 'monthly'

export type Currency = {
  code: string
  symbol: string
  name: string
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: Category
  note: string
  date: string
  recurringId?: string
  createdAt: string
}

export interface RecurringRule {
  id: string
  type: TransactionType
  amount: number
  category: Category
  note: string
  frequency: RecurringFrequency
  nextDueDate: string
  isActive: boolean
  createdAt: string
}

export interface Budget {
  id: string
  category: Category
  amount: number
  period: BudgetPeriod
  createdAt: string
}

export interface Settings {
  currency: string
  currencySymbol: string
  hasPassedLiveness: boolean
  theme: 'light' | 'dark'
}

export interface FinancialSummary {
  totalIncome: number
  totalExpenses: number
  balance: number
}