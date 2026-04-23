import { View, Text, TouchableOpacity } from 'react-native'
import * as Icons from 'lucide-react-native'
import { Transaction, Category } from '../../types'
import { CATEGORIES } from '../../constants/categories'
import { formatCurrency } from '../../lib/currency'
import { format } from 'date-fns'

interface TransactionItemProps {
  transaction: Transaction
  currencySymbol: string
  onDelete: (id: string) => void
}

export default function TransactionItem({
  transaction,
  currencySymbol,
  onDelete,
}: TransactionItemProps) {
  const meta = CATEGORIES[transaction.category as Category]
  const LucideIcon = (Icons as any)[meta.icon]
  const isIncome = transaction.type === 'income'
  const date = new Date(transaction.date)

  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
      elevation: 1,
    }}>
      {/* Icon */}
      <View style={{
        width: 44, height: 44,
        borderRadius: 12,
        backgroundColor: meta.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {LucideIcon && <LucideIcon size={20} color={meta.color} />}
      </View>

      {/* Info */}
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 15,
          fontWeight: '600',
          color: '#111827',
          marginBottom: 3,
        }}>
          {transaction.note || meta.label}
        </Text>
        <Text style={{
          fontSize: 11,
          color: '#9CA3AF',
          textTransform: 'uppercase',
          letterSpacing: 0.3,
        }}>
          {meta.label} • {format(date, 'h:mm a')}
        </Text>
      </View>

      {/* Amount + Date */}
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{
          fontSize: 15,
          fontWeight: '700',
          color: isIncome ? '#10B981' : '#EF4444',
          marginBottom: 3,
        }}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount, currencySymbol)}
        </Text>
        <Text style={{ fontSize: 11, color: '#9CA3AF' }}>
          {format(date, 'MMM d')}
        </Text>
      </View>
    </View>
  )
}