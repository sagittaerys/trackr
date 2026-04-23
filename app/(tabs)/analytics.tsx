import { useState, useMemo } from 'react'
import {
  View, Text, ScrollView,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bell, Plus } from 'lucide-react-native'
import { router } from 'expo-router'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
// import { useSettingsStore } from '../../stores/useSettingsStore'
import { useBudgetStore } from '../../stores/useBudgetStore'
import BudgetCard from '../../components/analytics/BudgetCard'
import BudgetFilter from '../../components/analytics/BudgetFilter'

type FilterType = 'all' | 'below' | 'over'

export default function AnalyticsScreen() {
  const [filter, setFilter] = useState<FilterType>('all')
  const { budgetUtilization, currencySymbol } = useFinancialSummary()
  const deleteBudget = useBudgetStore((s) => s.deleteBudget)

  const filtered = useMemo(() => {
    if (filter === 'all') return budgetUtilization
    if (filter === 'over') return budgetUtilization.filter((b) => b.isOverBudget)
    return budgetUtilization.filter((b) => !b.isOverBudget)
  }, [filter, budgetUtilization])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{
              width: 36, height: 36, borderRadius: 18,
              backgroundColor: '#1B3FA0',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 13 }}>T</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>Trackr</Text>
          </View>
          <TouchableOpacity style={{
            width: 40, height: 40, borderRadius: 20,
            backgroundColor: '#FFFFFF',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Bell size={18} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={{
          fontSize: 11, fontWeight: '700',
          color: '#1B3FA0', letterSpacing: 1.5,
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          Performance Analytics
        </Text>
        <Text style={{
          fontSize: 28, fontWeight: '800',
          color: '#111827', marginBottom: 20,
        }}>
          Budget Overview
        </Text>

        {/* Filter */}
        <BudgetFilter active={filter} onChange={setFilter} />

        {/* Budget Cards */}
        {filtered.length === 0 ? (
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16, padding: 32,
            alignItems: 'center',
          }}>
            <Text style={{ color: '#9CA3AF', fontSize: 14 }}>
              No budgets found
            </Text>
          </View>
        ) : (
          filtered.map(({ budget, spent, remaining, percentage, isOverBudget }) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              spent={spent}
              remaining={remaining}
              percentage={percentage}
              isOverBudget={isOverBudget}
              currencySymbol={currencySymbol}
              onDelete={deleteBudget}
            />
          ))
        )}

        {/* Add new budget */}
        <TouchableOpacity
          onPress={() => router.push('/modals/add-budget')}
          style={{
            borderWidth: 2,
            borderColor: '#E5E7EB',
            borderStyle: 'dashed',
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
            gap: 8,
            marginTop: 4,
          }}
          activeOpacity={0.8}
        >
          <View style={{
            width: 36, height: 36, borderRadius: 18,
            backgroundColor: '#F2F4F7',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Plus size={20} color="#6B7280" />
          </View>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6B7280' }}>
            New Category
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}