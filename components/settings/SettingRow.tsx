import { View, Text, TouchableOpacity } from 'react-native'
import { ChevronRight } from 'lucide-react-native'
import * as Icons from 'lucide-react-native'

interface SettingRowProps {
  icon: string
  iconColor?: string
  iconBg?: string
  label: string
  value?: string
  onPress?: () => void
  rightElement?: React.ReactNode
  destructive?: boolean
}

export default function SettingRow({
  icon,
  iconColor = '#1B3FA0',
  iconBg = '#EEF2FF',
  label,
  value,
  onPress,
  rightElement,
  destructive = false,
}: SettingRowProps) {
  const LucideIcon = (Icons as any)[icon]

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 12,
      }}
    >
      <View style={{
        width: 36, height: 36,
        borderRadius: 10,
        backgroundColor: destructive ? '#FEF2F2' : iconBg,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {LucideIcon && (
          <LucideIcon
            size={18}
            color={destructive ? '#EF4444' : iconColor}
          />
        )}
      </View>

      <Text style={{
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: destructive ? '#EF4444' : '#111827',
      }}>
        {label}
      </Text>

      {rightElement ? rightElement : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          {value && (
            <Text style={{ fontSize: 14, color: '#9CA3AF' }}>{value}</Text>
          )}
          {onPress && <ChevronRight size={16} color="#D1D5DB" />}
        </View>
      )}
    </TouchableOpacity>
  )
}