import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useSettingsStore } from '../../stores/useSettingsStore'

interface AmountInputProps {
  value: string
  onChange: (val: string) => void
  type: 'expense' | 'income'
  onToggleType: (type: 'expense' | 'income') => void
}

export default function AmountInput({ value, onChange, type, onToggleType }: AmountInputProps) {
  const currencySymbol = useSettingsStore((s) => s.settings.currencySymbol)
  const currency = useSettingsStore((s) => s.settings.currency)

  return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16 }}>
      {/* Type toggle */}
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#F2F4F7',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
      }}>
        {(['expense', 'income'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => onToggleType(t)}
            style={{
              flex: 1,
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: type === t ? '#FFFFFF' : 'transparent',
              shadowColor: type === t ? '#000' : 'transparent',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: type === t ? 0.08 : 0,
              shadowRadius: 2,
              elevation: type === t ? 2 : 0,
            }}
            activeOpacity={0.8}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: type === t ? '#1B3FA0' : '#6B7280',
            }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Currency badge */}
      <View style={{ alignItems: 'flex-end', marginBottom: 8 }}>
        <View style={{
          backgroundColor: '#1B3FA0',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        }}>
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>{currency}</Text>
        </View>
      </View>

      {/* Amount label */}
      <Text style={{
        fontSize: 11,
        fontWeight: '700',
        color: '#9CA3AF',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
      }}>
        Amount
      </Text>

      {/* Amount input */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 32, fontWeight: '700', color: '#9CA3AF', marginRight: 4 }}>
          {currencySymbol}
        </Text>
        <TextInput
          value={value}
          onChangeText={onChange}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor="#D1D5DB"
          style={{
            fontSize: 48,
            fontWeight: '800',
            color: '#1B3FA0',
            flex: 1,
          }}
        />
      </View>
    </View>
  )
}