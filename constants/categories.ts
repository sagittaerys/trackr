import { Category } from '../types'

export interface CategoryMeta {
  label: string
  icon: string
  color: string
  bgColor: string
}

export const CATEGORIES: Record<Category, CategoryMeta> = {
  food: {
    label: 'Food & Drinks',
    icon: 'UtensilsCrossed',
    color: '#F97316',
    bgColor: '#FFF7ED',
  },
  transport: {
    label: 'Transport',
    icon: 'Car',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
  },
  housing: {
    label: 'Housing',
    icon: 'Home',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
  },
  entertainment: {
    label: 'Entertainment',
    icon: 'Gamepad2',
    color: '#EC4899',
    bgColor: '#FDF2F8',
  },
  health: {
    label: 'Health',
    icon: 'Heart',
    color: '#EF4444',
    bgColor: '#FEF2F2',
  },
  shopping: {
    label: 'Shopping',
    icon: 'ShoppingBag',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
  },
  salary: {
    label: 'Salary',
    icon: 'Briefcase',
    color: '#10B981',
    bgColor: '#ECFDF5',
  },
  freelance: {
    label: 'Freelance',
    icon: 'Laptop',
    color: '#06B6D4',
    bgColor: '#ECFEFF',
  },
  utilities: {
    label: 'Utilities',
    icon: 'Zap',
    color: '#6366F1',
    bgColor: '#EEF2FF',
  },
  other: {
    label: 'Other',
    icon: 'Package',
    color: '#6B7280',
    bgColor: '#F9FAFB',
  },
}

export const CATEGORY_LIST = Object.entries(CATEGORIES).map(
  ([key, value]) => ({
    key: key as Category,
    ...value,
  })
)