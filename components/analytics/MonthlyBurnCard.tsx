import { View, Text } from 'react-native'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
import { formatCurrency } from '../../lib/currency'
import ProgressBar from '../ui/ProgressBar'

const MONTHLY_THRESHOLD = 12500

export default function MonthlyBurnCard() {
  const { totalExpenses, currencySymbol } = useFinancialSummary()
  const percentage = Math.min((totalExpenses / MONTHLY_THRESHOLD) * 100, 100)
  const isOnTrack = percentage < 80

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
        marginBottom: 12,
      }}>
        <View>
          <View style={{
            backgroundColor: isOnTrack ? '#ECFDF5' : '#FEF2F2',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            alignSelf: 'flex-start',
            marginBottom: 8,
          }}>
            <Text style={{
              fontSize: 11, fontWeight: '700',
              color: isOnTrack ? '#10B981' : '#EF4444',
            }}>
              {isOnTrack ? 'ON TRACK' : 'OVER BUDGET'}
            </Text>
          </View>
          <Text style={{
            fontSize: 20, fontWeight: '800',
            color: '#111827', marginBottom: 4,
          }}>
            Total Monthly Burn
          </Text>
          <Text style={{
            fontSize: 11, fontWeight: '700',
            color: '#9CA3AF', letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            Monthly Threshold: {formatCurrency(MONTHLY_THRESHOLD, currencySymbol)}
          </Text>
        </View>
      </View>

      <Text style={{
        fontSize: 13, color: '#6B7280', marginBottom: 4,
      }}>
        {percentage.toFixed(1)}% utilized
      </Text>
      <Text style={{
        fontSize: 36, fontWeight: '900',
        color: '#111827', marginBottom: 16,
      }}>
        {formatCurrency(totalExpenses, currencySymbol)}
      </Text>

      <ProgressBar
        percentage={percentage}
        color={isOnTrack ? '#10B981' : '#EF4444'}
        height={10}
      />
    </View>
  )
}