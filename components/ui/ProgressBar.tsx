import { View, Text } from 'react-native'

interface ProgressBarProps {
  percentage: number
  color?: string
  bgColor?: string
  showLabel?: boolean
  height?: number
}

export default function ProgressBar({
  percentage,
  color = '#6366F1',
  bgColor = '#E2E8F0',
  showLabel = false,
  height = 8,
}: ProgressBarProps) {
  const clamped = Math.min(Math.max(percentage, 0), 100)
  const isOver = percentage > 100

  return (
    <View className="gap-1">
      {showLabel && (
        <Text
          className="text-xs font-medium self-end"
          style={{ color: isOver ? '#EF4444' : color }}
        >
          {Math.round(percentage)}%
        </Text>
      )}
      <View
        className="w-full rounded-full overflow-hidden"
        style={{ backgroundColor: bgColor, height }}
      >
        <View
          className="rounded-full"
          style={{
            width: `${clamped}%`,
            height,
            backgroundColor: isOver ? '#EF4444' : color,
          }}
        />
      </View>
    </View>
  )
}