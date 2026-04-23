import { View, Text, TouchableOpacity } from 'react-native'
import { Sparkles, BookOpen } from 'lucide-react-native'

const SUGGESTIONS = [
  {
    id: '1',
    icon: 'Sparkles',
    title: 'Optimize Subscriptions',
    tag: 'HIGH IMPACT',
    tagColor: '#10B981',
    tagBg: '#ECFDF5',
    desc: 'You have overlapping expense categories. Consolidating could save you more per month.',
  },
  {
    id: '2',
    icon: 'BookOpen',
    title: 'Investment Rebalance',
    tag: 'STRATEGY',
    tagColor: '#1B3FA0',
    tagBg: '#EEF2FF',
    desc: "Your spending allocation is exceeding targets. Consider shifting funds to savings.",
  },
]

export default function SmartSuggestions() {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
      }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
          Smart Suggestions
        </Text>
        <Text style={{ fontSize: 13, fontWeight: '600', color: '#1B3FA0' }}>
          View All
        </Text>
      </View>

      {SUGGESTIONS.map((s) => (
        <View key={s.id} style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 16,
          marginBottom: 10,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <View style={{
              width: 40, height: 40, borderRadius: 12,
              backgroundColor: '#F2F4F7',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} color="#1B3FA0" />
            </View>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#111827', flex: 1 }}>
              {s.title}
            </Text>
            <View style={{
              backgroundColor: s.tagBg,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 999,
            }}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: s.tagColor }}>
                {s.tag}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 8 }}>
            {s.desc}
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#1B3FA0' }}>
              Take Action →
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}