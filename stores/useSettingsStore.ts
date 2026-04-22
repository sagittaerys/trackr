import { create } from 'zustand'
import { Settings } from '../types'
import { StorageKeys, saveData, loadData } from '../lib/storage'
import { DEFAULT_CURRENCY } from '../constants/currencies'

interface SettingsStore {
  settings: Settings
  isHydrated: boolean
  hydrate: () => Promise<void>
  updateCurrency: (code: string, symbol: string) => void
  setLivenessPassed: (value: boolean) => void
  toggleTheme: () => void
}

const DEFAULT_SETTINGS: Settings = {
  currency: DEFAULT_CURRENCY.code,
  currencySymbol: DEFAULT_CURRENCY.symbol,
  hasPassedLiveness: false,
  theme: 'light',
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isHydrated: false,

  hydrate: async () => {
    const saved = await loadData<Settings>(StorageKeys.SETTINGS)
    set({
      settings: saved
        ? { ...saved, hasPassedLiveness: false }
        : DEFAULT_SETTINGS,
      isHydrated: true,
    })
  },

  updateCurrency: (code, symbol) => {
    const updated = { ...get().settings, currency: code, currencySymbol: symbol }
    set({ settings: updated })
    saveData(StorageKeys.SETTINGS, updated)
  },

  setLivenessPassed: (value) => {
    const updated = { ...get().settings, hasPassedLiveness: value }
    set({ settings: updated })
    saveData(StorageKeys.SETTINGS, updated)
  },

  toggleTheme: () => {
    const current = get().settings.theme
    const updated = {
      ...get().settings,
      theme: current === 'light' ? 'dark' : 'light' as 'light' | 'dark',
    }
    set({ settings: updated })
    saveData(StorageKeys.SETTINGS, updated)
  },
}))