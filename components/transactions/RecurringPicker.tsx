import { View, Text, TouchableOpacity, Switch } from 'react-native'
import { RefreshCw } from 'lucide-react-native'
import { RecurringFrequency } from '../../types'

interface RecurringPickerProps {
  enabled: boolean
  frequency: RecurringFrequency
  onToggle: (val: boolean) => void
  onFrequencyChange: (freq: RecurringFrequency) => void
}

const FREQUENCIES: RecurringFrequency[] = ['daily', 'weekly', 'monthly', 'yearly']

export default function RecurringPicker({
  enabled,
  frequency,
  onToggle,
  onFrequencyChange,
}: RecurringPickerProps) {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: enabled ? 16 : 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={{
            width: 36, height: 36, borderRadius: 10,
            backgroundColor: '#EEF2FF',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <RefreshCw size={18} color="#1B3FA0" />
          </View>
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
            Recurring Transaction
          </Text>
        </View>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: '#E5E7EB', true: '#1B3FA0' }}
          thumbColor="#FFFFFF"
        />
      </View>

      {enabled && (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {FREQUENCIES.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => onFrequencyChange(f)}
              style={{
                flex: 1,
                paddingVertical: 8,
                borderRadius: 10,
                alignItems: 'center',
                backgroundColor: frequency === f ? '#1B3FA0' : '#F2F4F7',
              }}
              activeOpacity={0.8}
            >
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: frequency === f ? '#FFFFFF' : '#6B7280',
                textTransform: 'capitalize',
              }}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}