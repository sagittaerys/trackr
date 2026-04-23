import { useEffect } from 'react'
import { useRecurringStore } from '../stores/useRecurringStore'
import { useTransactionStore } from '../stores/useTransactionStore'

export function useRecurringScheduler() {
  const getDueRules = useRecurringStore((s) => s.getDueRules)
  const advanceNextDueDate = useRecurringStore((s) => s.advanceNextDueDate)
  const addTransaction = useTransactionStore((s) => s.addTransaction)
  const isHydrated = useRecurringStore((s) => s.isHydrated)

  useEffect(() => {
    if (!isHydrated) return

    const dueRules = getDueRules()

    dueRules.forEach((rule) => {
      addTransaction({
        type: rule.type,
        amount: rule.amount,
        category: rule.category,
        note: `${rule.note} (recurring)`,
        date: new Date().toISOString(),
        recurringId: rule.id,
      })
      advanceNextDueDate(rule.id)
    })
  }, [isHydrated])
}