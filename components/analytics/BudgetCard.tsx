import { View, Text, TouchableOpacity } from 'react-native'
import * as Icons from 'lucide-react-native'
import { Budget } from '../../types'
import { CATEGORIES } from '../../constants/categories'
import { formatCurrency } from '../../lib/currency'
import ProgressBar from '../ui/ProgressBar'
import { AlertTriangle, CheckCircle } from 'lucide-react-native'

interface BudgetCardProps {
  budget: Budget
  spent: number
  remaining: number
  percentage: number
  isOverBudget: boolean
  currencySymbol: string
  onDelete: (id: string) => void
}

export default function BudgetCard({
  budget,
  spent,
  remaining,
  percentage,
  isOverBudget,
  currencySymbol,
  onDelete,
}: BudgetCardProps) {
  const meta = CATEGORIES[budget.category]
  const LucideIcon = (Icons as any)[meta.icon]
  const isSettled = percentage >= 100 && !isOverBudget

  const statusColor = isOverBudget
    ? '#EF4444'
    : percentage >= 90
    ? '#F59E0B'
    : '#1B3FA0'

  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    }}>
      {/* Top row */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <View style={{
          width: 44, height: 44,
          borderRadius: 12,
          backgroundColor: isOverBudget ? '#FEF2F2' : meta.bgColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {LucideIcon && (
            <LucideIcon
              size={20}
              color={isOverBudget ? '#EF4444' : meta.color}
            />
          )}
        </View>

        <View style={{ flex: 1, paddingHorizontal: 12 }}>
          <Text style={{
            fontSize: 11,
            fontWeight: '700',
            color: '#9CA3AF',
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>
            {meta.label}
          </Text>
        </View>

        {isOverBudget ? (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: '#FEF2F2',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 999,
          }}>
            <AlertTriangle size={11} color="#EF4444" />
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#EF4444' }}>
              OVER LIMIT
            </Text>
          </View>
        ) : isSettled ? (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: '#ECFDF5',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 999,
          }}>
            <CheckCircle size={11} color="#10B981" />
            <Text style={{ fontSize: 11, fontWeight: '700', color: '#10B981' }}>
              SETTLED
            </Text>
          </View>
        ) : null}
      </View>

      {/* Amount */}
      <Text style={{
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 4,
      }}>
        {formatCurrency(spent, currencySymbol)}
      </Text>
      <Text style={{
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 16,
      }}>
        of {formatCurrency(budget.amount, currencySymbol)} limit
      </Text>

      {/* Progress */}
      <ProgressBar
        percentage={percentage}
        color={statusColor}
        height={8}
      />

      {/* Bottom row */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
      }}>
        <Text style={{
          fontSize: 12,
          fontWeight: '600',
          color: isOverBudget ? '#EF4444' : '#6B7280',
          textTransform: 'uppercase',
          letterSpacing: 0.3,
        }}>
          {Math.round(percentage)}% spent
        </Text>
        <Text style={{
          fontSize: 12,
          fontWeight: '600',
          color: isOverBudget ? '#EF4444' : '#6B7280',
        }}>
          {isOverBudget
            ? `-${formatCurrency(Math.abs(remaining), currencySymbol)} over`
            : isSettled
            ? 'Settled'
            : `${formatCurrency(remaining, currencySymbol)} left`}
        </Text>
      </View>
    </View>
  )
}