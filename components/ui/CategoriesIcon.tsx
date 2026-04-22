import * as Icons from 'lucide-react-native'
import { View } from 'react-native'

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
      className="rounded-full items-center justify-center"
      style={{ backgroundColor: bgColor, width: size + 16, height: size + 16 }}
    >
      <LucideIcon color={color} size={size} />
    </View>
  )
}