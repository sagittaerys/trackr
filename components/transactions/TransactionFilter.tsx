import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { TransactionType } from '../../types'

type FilterType = 'all' | TransactionType

interface TransactionFilterProps {
  active: FilterType
  onChange: (f: FilterType) => void
}

const FILTERS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'income', label: 'Income' },
  { key: 'expense', label: 'Expense' },
]

export default function TransactionFilter({ active, onChange }: TransactionFilterProps) {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#F2F4F7',
      borderRadius: 12,
      padding: 4,
      marginBottom: 20,
    }}>
      {FILTERS.map((f) => (
        <TouchableOpacity
          key={f.key}
          onPress={() => onChange(f.key)}
          style={{
            flex: 1,
            paddingVertical: 10,
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: active === f.key ? '#FFFFFF' : 'transparent',
            shadowColor: active === f.key ? '#000' : 'transparent',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: active === f.key ? 0.08 : 0,
            shadowRadius: 2,
            elevation: active === f.key ? 2 : 0,
          }}
          activeOpacity={0.8}
        >
          <Text style={{
            fontSize: 13,
            fontWeight: '600',
            color: active === f.key ? '#1B3FA0' : '#6B7280',
          }}>
            {f.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}