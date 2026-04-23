import { View } from 'react-native'
import * as Icons from 'lucide-react-native'

interface CategoryIconProps {
  name: string
  color: string
  bgColor: string
  size?: number
}

export default function CategoryIcon({
  name,
  color,
  bgColor,
  size = 20,
}: CategoryIconProps) {
  const LucideIcon = (Icons as any)[name]
  if (!LucideIcon) return null

  return (
    <View
      style={{
        backgroundColor: bgColor,
        width: size + 20,
        height: size + 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LucideIcon color={color} size={size} />
    </View>
  )
}