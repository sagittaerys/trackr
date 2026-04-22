import AsyncStorage from '@react-native-async-storage/async-storage'

export const StorageKeys = {
  TRANSACTIONS: 'trackr:transactions',
  BUDGETS: 'trackr:budgets',
  RECURRING: 'trackr:recurring',
  SETTINGS: 'trackr:settings',
} as const

export async function saveData<T>(key: string, data: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error(`[Storage] Failed to save ${key}:`, e)
  }
}

export async function loadData<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch (e) {
    console.error(`[Storage] Failed to load ${key}:`, e)
    return null
  }
}

export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    console.error(`[Storage] Failed to remove ${key}:`, e)
  }
}