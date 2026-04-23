import { View, Text } from 'react-native'

interface BadgeProps {
  label: string
  color?: string
  bgColor?: string
  size?: 'sm' | 'md'
}

export default function Badge({
  label,
  color = '#1B3FA0',
  bgColor = '#EEF2FF',
  size = 'sm',
}: BadgeProps) {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        paddingHorizontal: size === 'sm' ? 8 : 12,
        paddingVertical: size === 'sm' ? 4 : 6,
        borderRadius: 999,
        alignSelf: 'flex-start',
      }}
    >
      <Text
        style={{
          color,
          fontSize: size === 'sm' ? 11 : 13,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </View>
  )
}