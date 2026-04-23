import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Bell } from 'lucide-react-native'
import SpendingVelocityChart from '../../components/analytics/SpendingVelocityChart'
import AllocationDonut from '../../components/analytics/AllocationDonut'
import MonthlyBurnCard from '../../components/analytics/MonthlyBurnCard'
import SmartSuggestions from '../../components/analytics/SmartSuggestions'
import QuickStats from '../../components/dashboard/QuickStats'

type Period = 'Daily' | 'Weekly' | 'Monthly'

export default function InsightsScreen() {
  const [period, setPeriod] = useState<Period>('Monthly')

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 16,
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

        <View style={{ paddingHorizontal: 16 }}>
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
            Financial Insights
          </Text>

          {/* Period toggle */}
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#F2F4F7',
            borderRadius: 12,
            padding: 4,
            marginBottom: 20,
          }}>
            {(['Daily', 'Weekly', 'Monthly'] as Period[]).map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPeriod(p)}
                style={{
                  flex: 1, paddingVertical: 10,
                  alignItems: 'center', borderRadius: 10,
                  backgroundColor: period === p ? '#FFFFFF' : 'transparent',
                  elevation: period === p ? 2 : 0,
                }}
                activeOpacity={0.8}
              >
                <Text style={{
                  fontSize: 13, fontWeight: '600',
                  color: period === p ? '#1B3FA0' : '#6B7280',
                }}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Charts */}
          <SpendingVelocityChart />
        </View>

        {/* Allocations horizontal scroll */}
        <QuickStats />

        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <MonthlyBurnCard />
          <AllocationDonut />
          <SmartSuggestions />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}