import { useEffect } from 'react'
import { Stack, router } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { useSettingsStore } from '../stores/useSettingsStore'
import { useTransactionStore } from '../stores/useTransactionStore'
import { useBudgetStore } from '../stores/useBudgetStore'
import { useRecurringStore } from '../stores/useRecurringStore'
import { useRecurringScheduler } from '../hooks/useRecurringScheduler'



function RootLayoutInner() {
  useRecurringScheduler()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/liveness" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="modals/add-transaction"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="modals/add-budget"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="modals/add-recurring"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
  )
}

export default function RootLayout() {
  const hydrateSettings = useSettingsStore((s) => s.hydrate)
  const hydrateTransactions = useTransactionStore((s) => s.hydrate)
  const hydrateBudgets = useBudgetStore((s) => s.hydrate)
  const hydrateRecurring = useRecurringStore((s) => s.hydrate)
  const isHydrated = useSettingsStore((s) => s.isHydrated)
  const hasPassedLiveness = useSettingsStore(
    (s) => s.settings.hasPassedLiveness
  )

  useEffect(() => {
    Promise.all([
      hydrateSettings(),
      hydrateTransactions(),
      hydrateBudgets(),
      hydrateRecurring(),
    ])
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    if (!hasPassedLiveness) {
      router.replace('/(auth)/liveness')
    } else {
      router.replace('/(tabs)')
    }
  }, [isHydrated, hasPassedLiveness])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <RootLayoutInner />
    </GestureHandlerRootView>
  )
}