import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { useState } from 'react'
import { X, Check } from 'lucide-react-native'
import { CURRENCIES } from '../../constants/currencies'
import { useSettingsStore } from '../../stores/useSettingsStore'

export default function CurrencyPicker() {
  const [visible, setVisible] = useState(false)
  const currency = useSettingsStore((s) => s.settings.currency)
  const currencySymbol = useSettingsStore((s) => s.settings.currencySymbol)
  const updateCurrency = useSettingsStore((s) => s.updateCurrency)

  return (
    <>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          backgroundColor: '#EEF2FF',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 8,
        }}
        activeOpacity={0.8}
      >
        <Text style={{ fontSize: 14, fontWeight: '700', color: '#1B3FA0' }}>
          {currencySymbol} {currency}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            maxHeight: '70%',
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>
                Select Currency
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <X size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {CURRENCIES.map((c) => (
                <TouchableOpacity
                  key={c.code}
                  onPress={() => {
                    updateCurrency(c.code, c.symbol)
                    setVisible(false)
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F3F4F6',
                    gap: 12,
                  }}
                  activeOpacity={0.7}
                >
                  <View style={{
                    width: 40, height: 40,
                    borderRadius: 20,
                    backgroundColor: '#F2F4F7',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#1B3FA0' }}>
                      {c.symbol}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#111827' }}>
                      {c.name}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{c.code}</Text>
                  </View>
                  {currency === c.code && (
                    <Check size={18} color="#1B3FA0" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  )
}