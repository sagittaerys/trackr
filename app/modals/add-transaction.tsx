import { useState } from 'react'
import {
  View, Text, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, TextInput,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft, Calendar, AlignLeft, CheckCircle } from 'lucide-react-native'
import { useTransactionStore } from '../../stores/useTransactionStore'
import { useRecurringStore } from '../../stores/useRecurringStore'
import { Category, RecurringFrequency } from '../../types'
import { format } from 'date-fns'
import AmountInput from '../../components/transactions/AmountInput'
import CategoryPicker from '../../components/transactions/CategoryPicker'
import RecurringPicker from '../../components/transactions/RecurringPicker'

export default function AddTransactionModal() {
  const addTransaction = useTransactionStore((s) => s.addTransaction)
  const addRule = useRecurringStore((s) => s.addRule)

  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>('food')
  const [note, setNote] = useState('')
  const [date] = useState(new Date())
  const [isRecurring, setIsRecurring] = useState(false)
  const [frequency, setFrequency] = useState<RecurringFrequency>('monthly')

  const handleSave = () => {
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0) return

    addTransaction({
      type,
      amount: numAmount,
      category,
      note,
      date: date.toISOString(),
    })

    if (isRecurring) {
      addRule({
        type,
        amount: numAmount,
        category,
        note,
        frequency,
        nextDueDate: date.toISOString(),
        isActive: true,
      })
    }

    router.back()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 16,
          gap: 12,
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40, height: 40, borderRadius: 20,
              backgroundColor: '#FFFFFF',
              alignItems: 'center', justifyContent: 'center',
            }}
            activeOpacity={0.8}
          >
            <ArrowLeft size={20} color="#111827" />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#111827' }}>
            New Transaction
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Amount + Type */}
          <AmountInput
            value={amount}
            onChange={setAmount}
            type={type}
            onToggleType={setType}
          />

          {/* Category */}
          <CategoryPicker selected={category} onSelect={setCategory} />

          {/* Date */}
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}>
            <Calendar size={18} color="#6B7280" />
            <View>
              <Text style={{
                fontSize: 11, fontWeight: '700',
                color: '#9CA3AF', letterSpacing: 1,
                textTransform: 'uppercase', marginBottom: 2,
              }}>
                Date
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
                {format(date, 'MM/dd/yyyy')}
              </Text>
            </View>
          </View>

          {/* Notes */}
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
          }}>
            <AlignLeft size={18} color="#6B7280" style={{ marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: 11, fontWeight: '700',
                color: '#9CA3AF', letterSpacing: 1,
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                Notes
              </Text>
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="What was this for?"
                placeholderTextColor="#9CA3AF"
                multiline
                style={{
                  fontSize: 15,
                  color: '#111827',
                  minHeight: 40,
                }}
              />
            </View>
          </View>

          {/* Recurring */}
          <RecurringPicker
            enabled={isRecurring}
            frequency={frequency}
            onToggle={setIsRecurring}
            onFrequencyChange={setFrequency}
          />
        </ScrollView>

        {/* Save Button */}
        <View style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: 20,
          backgroundColor: '#F2F4F7',
        }}>
          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: '#1B3FA0',
              borderRadius: 16,
              paddingVertical: 18,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              opacity: !amount || parseFloat(amount) <= 0 ? 0.5 : 1,
            }}
            activeOpacity={0.8}
            disabled={!amount || parseFloat(amount) <= 0}
          >
            <CheckCircle size={20} color="#FFFFFF" />
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>
              Save Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}