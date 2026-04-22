import { View, Text, TextInput, TextInputProps } from 'react-native'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  prefix?: string
}

export default function Input({
  label,
  error,
  prefix,
  className = '',
  ...props
}: InputProps) {
  return (
    <View className="gap-1 mb-4">
      {label && (
        <Text className="text-slate-600 text-sm font-medium mb-1">{label}</Text>
      )}
      <View
        className={`
          flex-row items-center border rounded-xl px-4 py-3 bg-surface
          ${error ? 'border-danger' : 'border-border'}
        `}
      >
        {prefix && (
          <Text className="text-slate-500 mr-2 text-base">{prefix}</Text>
        )}
        <TextInput
          className={`flex-1 text-slate-800 text-base ${className}`}
          placeholderTextColor="#94A3B8"
          {...props}
        />
      </View>
      {error && <Text className="text-danger text-xs mt-1">{error}</Text>}
    </View>
  )
}