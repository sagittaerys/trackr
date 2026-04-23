import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { useTransactionStore } from '../../stores/useTransactionStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { CATEGORIES } from '../../constants/categories'
import { formatCurrency } from '../../lib/currency'
import { format } from 'date-fns'
import CategoryIcon from '../ui/CategoryIcon'
import { Category } from '../../types'

export default function RecentTransactions() {
  const transactions = useTransactionStore((s) => s.transactions)
  const currencySymbol = useSettingsStore((s) => s.settings.currencySymbol)

  const recent = transactions.slice(0, 5)

  return (
    <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
          Recent Ledger
        </Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/transactions')}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '700',
              color: '#1B3FA0',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      {recent.length === 0 ? (
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 32,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
            No transactions yet
          </Text>
        </View>
      ) : (
        <View style={{ gap: 8 }}>
          {recent.map((transaction) => {
            const meta = CATEGORIES[transaction.category as Category]
            const isIncome = transaction.type === 'income'
            const date = new Date(transaction.date)

            return (
              <View
                key={transaction.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.04,
                  shadowRadius: 3,
                  elevation: 1,
                }}
              >
                <CategoryIcon
                  name={meta.icon}
                  color={meta.color}
                  bgColor={meta.bgColor}
                  size={18}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: 2,
                    }}
                  >
                    {transaction.note || meta.label}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.3 }}>
                    {meta.label} • {format(date, 'h:mm a')}
                  </Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: isIncome ? '#10B981' : '#EF4444',
                      marginBottom: 2,
                    }}
                  >
                    {isIncome ? '+' : '-'}
                    {formatCurrency(transaction.amount, currencySymbol)}
                  </Text>
                  <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
                    {format(date, 'MMM d')}
                  </Text>
                </View>
              </View>
            )
          })}
        </View>
      )}
    </View>
  )
}