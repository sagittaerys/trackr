import { View, Text } from 'react-native'

interface BadgeProps {
  label: string
  color?: string
  bgColor?: string
}

export default function Badge({
  label,
  color = '#6366F1',
  bgColor = '#EEF2FF',
}: BadgeProps) {
  return (
    <View
      className="px-2 py-1 rounded-full self-start"
      style={{ backgroundColor: bgColor }}
    >
      <Text className="text-xs font-semibold" style={{ color }}>
        {label}
      </Text>
    </View>
  )
}