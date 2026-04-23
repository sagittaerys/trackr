import { View, Text } from 'react-native'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
import { formatCompact } from '../../lib/currency'
import { CATEGORIES } from '../../constants/categories'
import { Category } from '../../types'

const DONUT_COLORS = ['#1B3FA0', '#3B82F6', '#10B981', '#6B7280']

export default function AllocationDonut() {
  const { spendingByCategory, totalExpenses, currencySymbol } = useFinancialSummary()

  const entries = Object.entries(spendingByCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4)

  const total = entries.reduce((s, [, v]) => s + v, 0) || 1

  // Simple pie segments using View rotation trick
  const segments = entries.map(([cat, val], i) => ({
    category: cat as Category,
    value: val,
    percentage: Math.round((val / total) * 100),
    color: DONUT_COLORS[i] ?? '#E5E7EB',
  }))

  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
    }}>
      <Text style={{
        fontSize: 17, fontWeight: '700',
        color: '#111827', marginBottom: 16,
      }}>
        Allocation
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        {/* Donut placeholder — rings */}
        <View style={{
          width: 100, height: 100,
          borderRadius: 50,
          borderWidth: 16,
          borderColor: '#1B3FA0',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <View style={{
            position: 'absolute',
            width: 100, height: 100,
            borderRadius: 50,
            borderWidth: 16,
            borderColor: 'transparent',
            borderTopColor: '#3B82F6',
            transform: [{ rotate: '120deg' }],
          }} />
          <View style={{
            position: 'absolute',
            width: 100, height: 100,
            borderRadius: 50,
            borderWidth: 16,
            borderColor: 'transparent',
            borderTopColor: '#10B981',
            transform: [{ rotate: '210deg' }],
          }} />
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 9, color: '#9CA3AF', fontWeight: '600' }}>
              TOTAL
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '800', color: '#111827' }}>
              {formatCompact(totalExpenses, currencySymbol)}
            </Text>
          </View>
        </View>

        {/* Legend */}
        <View style={{ flex: 1, gap: 8 }}>
          {segments.length === 0 ? (
            <Text style={{ color: '#9CA3AF', fontSize: 13 }}>No data yet</Text>
          ) : (
            segments.map((seg) => (
              <View
                key={seg.category}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
              >
                <View style={{
                  width: 10, height: 10,
                  borderRadius: 5,
                  backgroundColor: seg.color,
                }} />
                <Text style={{ flex: 1, fontSize: 12, color: '#6B7280' }}>
                  {CATEGORIES[seg.category]?.label ?? seg.category}
                </Text>
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#111827' }}>
                  {seg.percentage}%
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  )
}