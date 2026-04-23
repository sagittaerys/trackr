import { View, Text } from 'react-native'
import { CartesianChart, Bar } from 'victory-native'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
import { TrendingDown } from 'lucide-react-native'

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export default function SpendingVelocityChart() {
  const { monthlyTrend } = useFinancialSummary()

  const data = DAYS.map((day, i) => ({
    day,
    value: monthlyTrend[i]?.expense ?? Math.random() * 500 + 100,
  }))

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
        marginBottom: 4,
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

      <View style={{ height: 180, marginTop: 12 }}>
        <CartesianChart
          data={data}
          xKey="day"
          yKeys={['value']}
          domainPadding={{ left: 10, right: 10 }}
        >
          {({ points, chartBounds }) => (
            <Bar
              points={points.value}
              chartBounds={chartBounds}
              color="#1B3FA0"
              roundedCorners={{ topLeft: 6, topRight: 6 }}
              animate={{ type: 'spring' }}
            />
          )}
        </CartesianChart>
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
      }}>
        {DAYS.map((d) => (
          <Text key={d} style={{
            fontSize: 10,
            color: '#9CA3AF',
            fontWeight: '500',
          }}>
            {d}
          </Text>
        ))}
      </View>
    </View>
  )
}