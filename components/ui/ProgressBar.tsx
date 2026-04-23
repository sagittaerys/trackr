import { View, Text } from 'react-native'

interface ProgressBarProps {
  percentage: number
  color?: string
  trackColor?: string
  height?: number
  showLabel?: boolean
}

export default function ProgressBar({
  percentage,
  color = '#1B3FA0',
  trackColor = '#E5E7EB',
  height = 6,
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(percentage, 0), 100)
  const isOver = percentage > 100
  const barColor = isOver ? '#EF4444' : percentage >= 90 ? '#F59E0B' : color

  return (
    <View style={{ gap: 4 }}>
      {showLabel && (
        <Text
          style={{
            fontSize: 11,
            fontWeight: '600',
            color: barColor,
            alignSelf: 'flex-end',
          }}
        >
          {Math.round(percentage)}%
        </Text>
      )}
      <View
        style={{
          backgroundColor: trackColor,
          borderRadius: 999,
          height,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${clamped}%`,
            height,
            backgroundColor: barColor,
            borderRadius: 999,
          }}
        />
      </View>
    </View>
  )
}