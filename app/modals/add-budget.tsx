import { useState } from 'react'
import {
  View, Text, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft, CheckCircle } from 'lucide-react-native'
import { useBudgetStore } from '../../stores/useBudgetStore'
import { Category, BudgetPeriod } from '../../types'
import CategoryPicker from '../../components/transactions/CategoryPicker'
import Input from '../../components/ui/Input'
import { useSettingsStore } from '../../stores/useSettingsStore'

export default function AddBudgetModal() {
  const addBudget = useBudgetStore((s) => s.addBudget)
  const currencySymbol = useSettingsStore((s) => s.settings.currencySymbol)

  const [category, setCategory] = useState<Category>('food')
  const [amount, setAmount] = useState('')
  const [period, setPeriod] = useState<BudgetPeriod>('monthly')

  const handleSave = () => {
    const numAmount = parseFloat(amount)
    if (!numAmount || numAmount <= 0) return
    addBudget({ category, amount: numAmount, period })
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
            New Budget
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Amount */}
          <View style={{
            backgroundColor: '#FFFFFF', borderRadius: 16,
            padding: 20, marginBottom: 16,
          }}>
            <Input
              label="Budget Limit"
              prefix={currencySymbol}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
            />

            {/* Period */}
            <Text style={{
              fontSize: 11, fontWeight: '700',
              color: '#9CA3AF', letterSpacing: 1,
              textTransform: 'uppercase', marginBottom: 12,
            }}>
              Period
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {(['weekly', 'monthly'] as BudgetPeriod[]).map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPeriod(p)}
                  style={{
                    flex: 1, paddingVertical: 12,
                    borderRadius: 12, alignItems: 'center',
                    backgroundColor: period === p ? '#1B3FA0' : '#F2F4F7',
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{
                    fontSize: 14, fontWeight: '600',
                    color: period === p ? '#FFFFFF' : '#6B7280',
                    textTransform: 'capitalize',
                  }}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category */}
          <CategoryPicker selected={category} onSelect={setCategory} />
        </ScrollView>

        {/* Save Button */}
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
              Save Budget
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}