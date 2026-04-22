import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const variantStyles = {
  primary: {
    container: 'bg-primary',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-surface border border-border',
    text: 'text-slate-700',
  },
  danger: {
    container: 'bg-danger',
    text: 'text-white',
  },
  ghost: {
    container: 'bg-transparent',
    text: 'text-primary',
  },
}

const sizeStyles = {
  sm: {
    container: 'px-3 py-2 rounded-lg',
    text: 'text-sm',
  },
  md: {
    container: 'px-5 py-3 rounded-xl',
    text: 'text-base',
  },
  lg: {
    container: 'px-6 py-4 rounded-xl',
    text: 'text-lg',
  },
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const v = variantStyles[variant]
  const s = sizeStyles[size]
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`
        ${v.container} ${s.container}
        ${fullWidth ? 'w-full' : 'self-start'}
        ${isDisabled ? 'opacity-50' : 'opacity-100'}
        flex-row items-center justify-center gap-2
      `}
      activeOpacity={0.8}
    >
      {loading && <ActivityIndicator size="small" color="#fff" />}
      <Text className={`${v.text} ${s.text} font-semibold`}>{label}</Text>
    </TouchableOpacity>
  )
}