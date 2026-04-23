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
  ...props
}: InputProps) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text
          style={{
            fontSize: 11,
            fontWeight: '600',
            color: '#6B7280',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: 14,
          borderWidth: 1,
          borderColor: error ? '#EF4444' : '#E5E7EB',
        }}
      >
        {prefix && (
          <Text
            style={{
              color: '#6B7280',
              marginRight: 8,
              fontSize: 16,
            }}
          >
            {prefix}
          </Text>
        )}
        <TextInput
          style={{
            flex: 1,
            color: '#111827',
            fontSize: 16,
          }}
          placeholderTextColor="#9CA3AF"
          {...props}
        />
      </View>
      {error && (
        <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  )
}