import { View, Text } from 'react-native'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
import { TrendingDown } from 'lucide-react-native'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const CHART_HEIGHT = 140

export default function SpendingVelocityChart() {
  const { monthlyTrend } = useFinancialSummary()

  const data = DAYS.map((day, i) => ({
    day,
    value: monthlyTrend[i]?.expense ?? (Math.sin(i) + 1.5) * 200,
  }))

  const maxVal = Math.max(...data.map((d) => d.value), 1)

  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
      }}>
        <View>
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#111827' }}>
            Spending Velocity
          </Text>
          <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>
            Trend relative to baseline
          </Text>
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          backgroundColor: '#FEF2F2',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 999,
        }}>
          <TrendingDown size={11} color="#EF4444" />
          <Text style={{ fontSize: 11, fontWeight: '700', color: '#EF4444' }}>
            12.4%
          </Text>
        </View>
      </View>

      {/* Bar chart */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: CHART_HEIGHT,
        gap: 6,
      }}>
        {data.map((d, i) => {
          const barHeight = Math.max((d.value / maxVal) * CHART_HEIGHT, 8)
          const isLast = i === data.length - 1
          return (
            <View
              key={d.day}
              style={{
                flex: 1,
                height: barHeight,
                backgroundColor: isLast ? '#1B3FA0' : '#D1D9F0',
                borderRadius: 6,
              }}
            />
          )
        })}
      </View>

      {/* X axis labels */}
      <View style={{
        flexDirection: 'row',
        gap: 6,
        marginTop: 8,
      }}>
        {DAYS.map((d) => (
          <Text key={d} style={{
            flex: 1,
            fontSize: 9,
            color: '#9CA3AF',
            fontWeight: '500',
            textAlign: 'center',
          }}>
            {d}
          </Text>
        ))}
      </View>
    </View>
  )
}