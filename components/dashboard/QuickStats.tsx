import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
// import { useBudgetStore } from '../../stores/useBudgetStore'
// import { CATEGORIES } from '../../constants/categories'
import { formatCurrency } from '../../lib/currency'
import CategoryIcon from '../ui/CategoryIcon'
import ProgressBar from '../ui/ProgressBar'
// import { Category } from '../../types'

export default function QuickStats() {
  const { budgetUtilization, currencySymbol } = useFinancialSummary()

  if (budgetUtilization.length === 0) return null

  return (
    <View style={{ marginTop: 24 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
          Allocations
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1B3FA0' }}>
          View All
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {budgetUtilization.map(({ budget, spent, remaining, percentage, isOverBudget, meta }) => (
          <View
            key={budget.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: 16,
              width: 150,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <CategoryIcon
              name={meta.icon}
              color={meta.color}
              bgColor={meta.bgColor}
              size={18}
            />

            <Text
              style={{
                fontSize: 13,
                color: '#6B7280',
                marginTop: 10,
                marginBottom: 2,
              }}
            >
              {meta.label}
            </Text>

            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 10,
              }}
            >
              {formatCurrency(spent, currencySymbol)}
            </Text>

            <ProgressBar
              percentage={percentage}
              color={meta.color}
            />

            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: isOverBudget ? '#EF4444' : '#6B7280',
                marginTop: 6,
                textTransform: 'uppercase',
                letterSpacing: 0.3,
              }}
            >
              {isOverBudget
                ? `-${formatCurrency(Math.abs(remaining), currencySymbol)} over`
                : `${formatCurrency(remaining, currencySymbol)} left`}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}