import { useState, useMemo } from 'react'
import {
  View, Text, ScrollView,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bell, Plus } from 'lucide-react-native'
import { router } from 'expo-router'
import { useTransactionStore } from '../../stores/useTransactionStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
import { formatCurrency } from '../../lib/currency'
import TransactionItem from '../../components/transactions/TransactionItem'
import TransactionFilter from '../../components/transactions/TransactionFilter'
import { TransactionType } from '../../types'

type FilterType = 'all' | TransactionType

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<FilterType>('all')
  const transactions = useTransactionStore((s) => s.transactions)
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction)
  const currencySymbol = useSettingsStore((s) => s.settings.currencySymbol)
  const { totalIncome, totalExpenses } = useFinancialSummary()

  const filtered = useMemo(() => {
    if (filter === 'all') return transactions
    return transactions.filter((t) => t.type === filter)
  }, [filter, transactions])

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
          Transaction History
        </Text>
        <Text style={{
          fontSize: 28, fontWeight: '800',
          color: '#111827', marginBottom: 20,
        }}>
          Activity
        </Text>

        {/* Summary cards */}
        <View style={{
          flexDirection: 'row',
          gap: 12,
          marginBottom: 20,
        }}>
          <View style={{
            flex: 1, backgroundColor: '#ECFDF5',
            borderRadius: 16, padding: 16,
          }}>
            <Text style={{
              fontSize: 11, fontWeight: '700',
              color: '#10B981', letterSpacing: 0.5,
              textTransform: 'uppercase', marginBottom: 4,
            }}>
              Total Income
            </Text>
            <Text style={{
              fontSize: 18, fontWeight: '800', color: '#10B981',
            }}>
              +{formatCurrency(totalIncome, currencySymbol)}
            </Text>
          </View>
          <View style={{
            flex: 1, backgroundColor: '#FEF2F2',
            borderRadius: 16, padding: 16,
          }}>
            <Text style={{
              fontSize: 11, fontWeight: '700',
              color: '#EF4444', letterSpacing: 0.5,
              textTransform: 'uppercase', marginBottom: 4,
            }}>
              Total Expenses
            </Text>
            <Text style={{
              fontSize: 18, fontWeight: '800', color: '#EF4444',
            }}>
              -{formatCurrency(totalExpenses, currencySymbol)}
            </Text>
          </View>
        </View>

        {/* Filter */}
        <TransactionFilter active={filter} onChange={setFilter} />

        {/* Transactions */}
        {filtered.length === 0 ? (
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16, padding: 40,
            alignItems: 'center',
          }}>
            <Text style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 4 }}>
              No transactions yet
            </Text>
            <Text style={{ color: '#D1D5DB', fontSize: 13 }}>
              Tap + to add your first transaction
            </Text>
          </View>
        ) : (
          filtered.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              currencySymbol={currencySymbol}
              onDelete={deleteTransaction}
            />
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push('/modals/add-transaction')}
        style={{
          position: 'absolute',
          bottom: 80, right: 24,
          width: 56, height: 56,
          borderRadius: 28,
          backgroundColor: '#1B3FA0',
          alignItems: 'center', justifyContent: 'center',
          shadowColor: '#1B3FA0',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}