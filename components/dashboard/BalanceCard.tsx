import { View, Text, TouchableOpacity } from 'react-native'
import { TrendingUp } from 'lucide-react-native'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
import { formatCurrency } from '../../lib/currency'

export default function BalanceCard() {
  const { balance, totalIncome, totalExpenses, currencySymbol } = useFinancialSummary()

  const percentageChange = totalIncome > 0
    ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
    : '0.0'

  const isPositive = balance >= 0

  return (
    <View
      style={{
        backgroundColor: '#1B3FA0',
        borderRadius: 20,
        padding: 24,
        marginHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 11,
            fontWeight: '600',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          Liquid Wealth Portfolio
        </Text>
        <View
          style={{
            backgroundColor: isPositive ? '#10B981' : '#EF4444',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <TrendingUp size={11} color="#fff" />
          <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>
            {isPositive ? '+' : ''}{percentageChange}%
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 36,
          fontWeight: '800',
          marginBottom: 4,
        }}
      >
        {formatCurrency(Math.abs(balance), currencySymbol)}
      </Text>

      <Text
        style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 13,
          marginBottom: 24,
          fontStyle: 'italic',
        }}
      >
        Market valuation as of today
      </Text>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1.5,
            borderColor: 'rgba(255,255,255,0.5)',
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: '700',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Deposit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1.5,
            borderColor: 'rgba(255,255,255,0.5)',
            borderRadius: 10,
            paddingVertical: 12,
            alignItems: 'center',
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 13,
              fontWeight: '700',
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}