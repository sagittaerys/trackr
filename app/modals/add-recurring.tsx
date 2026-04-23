import { useState } from 'react'
import {
  View, Text, ScrollView,
  TouchableOpacity, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft, CheckCircle } from 'lucide-react-native'
import { useRecurringStore } from '../../stores/useRecurringStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { Category, RecurringFrequency } from '../../types'
import AmountInput from '../../components/transactions/AmountInput'
import CategoryPicker from '../../components/transactions/CategoryPicker'
import RecurringPicker from '../../components/transactions/RecurringPicker'

export default function AddRecurringModal() {
  const addRule = useRecurringStore((s) => s.addRule)
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>('food')
  const [frequency, setFrequency] = useState<RecurringFrequency>('monthly')
  const [note, setNote] = useState('')

  const handleSave = () => {
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0) return
    addRule({
      type,
      amount: numAmount,
      category,
      note,
      frequency,
      nextDueDate: new Date().toISOString(),
      isActive: true,
    })
    router.back()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          paddingHorizontal: 16, paddingVertical: 16, gap: 12,
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40, height: 40, borderRadius: 20,
              backgroundColor: '#FFFFFF',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>
            New Recurring
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <AmountInput
            value={amount}
            onChange={setAmount}
            type={type}
            onToggleType={setType}
          />
          <CategoryPicker selected={category} onSelect={setCategory} />
          <RecurringPicker
            enabled={true}
            frequency={frequency}
            onToggle={() => {}}
            onFrequencyChange={setFrequency}
          />
        </ScrollView>

        <View style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 20, backgroundColor: '#F2F4F7',
        }}>
          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: '#1B3FA0', borderRadius: 16,
              paddingVertical: 18,
              flexDirection: 'row', alignItems: 'center',
              justifyContent: 'center', gap: 8,
              opacity: !amount || parseFloat(amount) <= 0 ? 0.5 : 1,
            }}
            activeOpacity={0.8}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <CheckCircle size={20} color="#FFFFFF" />
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
              Save Recurring
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}