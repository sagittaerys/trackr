import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import * as Icons from 'lucide-react-native'
import { Category } from '../../types'
import { CATEGORY_LIST } from '../../constants/categories'

interface CategoryPickerProps {
  selected: Category
  onSelect: (category: Category) => void
}

export default function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 16 }}>
      <Text style={{
        fontSize: 11,
        fontWeight: '700',
        color: '#9CA3AF',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 16,
      }}>
        Category
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {CATEGORY_LIST.map((cat) => {
          const LucideIcon = (Icons as any)[cat.icon]
          const isSelected = selected === cat.key
          return (
            <TouchableOpacity
              key={cat.key}
              onPress={() => onSelect(cat.key)}
              style={{
                width: '30%',
                aspectRatio: 1,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isSelected ? '#EEF2FF' : '#F9FAFB',
                borderWidth: isSelected ? 2 : 1,
                borderColor: isSelected ? '#1B3FA0' : '#F3F4F6',
                gap: 6,
              }}
              activeOpacity={0.8}
            >
              {LucideIcon && <LucideIcon size={22} color={isSelected ? '#1B3FA0' : '#6B7280'} />}
              <Text style={{
                fontSize: 11,
                fontWeight: '600',
                color: isSelected ? '#1B3FA0' : '#6B7280',
                textAlign: 'center',
              }}>
                {cat.label.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}