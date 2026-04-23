import { useState } from 'react'
import {
  View, Text, ScrollView,
  TouchableOpacity, Alert, Switch,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import {
  Bell, Download, FileText,
  Shield, Trash2, RefreshCw,
  Moon, Info,
} from 'lucide-react-native'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useTransactionStore } from '../../stores/useTransactionStore'
import { useFinancialSummary } from '../../hooks/useFinancialSummary'
import { exportCSV, exportPDF } from '../../lib/export'
import SettingRow from '../../components/settings/SettingRow'
import CurrencyPicker from '../../components/settings/CurrencyPicker'

export default function SettingsScreen() {
  const [exporting, setExporting] = useState(false)
  const settings = useSettingsStore((s) => s.settings)
  const toggleTheme = useSettingsStore((s) => s.toggleTheme)
  const setLivenessPassed = useSettingsStore((s) => s.setLivenessPassed)
  const transactions = useTransactionStore((s) => s.transactions)
  const deleteTransaction = useTransactionStore((s) => s.deleteTransaction)
  const { balance, totalIncome, totalExpenses, currencySymbol } = useFinancialSummary()

  const handleExportCSV = async () => {
    try {
      setExporting(true)
      await exportCSV(transactions, currencySymbol)
    } catch (e) {
      Alert.alert('Export Failed', 'Could not export CSV. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleExportPDF = async () => {
    try {
      setExporting(true)
      await exportPDF(transactions, currencySymbol, balance, totalIncome, totalExpenses)
    } catch (e) {
      Alert.alert('Export Failed', 'Could not export PDF. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your transactions. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            transactions.forEach((t) => deleteTransaction(t.id))
          },
        },
      ]
    )
  }

  const handleResetLiveness = () => {
    setLivenessPassed(false)
    router.replace('/(auth)/liveness')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F4F7' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        {/* Header */}
        <Text style={{
          fontSize: 11, fontWeight: '700',
          color: '#1B3FA0', letterSpacing: 1.5,
          textTransform: 'uppercase', marginBottom: 6,
        }}>
          Preferences
        </Text>
        <Text style={{
          fontSize: 28, fontWeight: '800',
          color: '#111827', marginBottom: 24,
        }}>
          Settings
        </Text>

        {/* General */}
        <Text style={{
          fontSize: 12, fontWeight: '700',
          color: '#9CA3AF', letterSpacing: 1,
          textTransform: 'uppercase',
          marginBottom: 8, marginLeft: 4,
        }}>
          General
        </Text>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          <SettingRow
            icon="Coins"
            label="Currency"
            rightElement={<CurrencyPicker />}
          />
          <View style={{ height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 }} />
          <SettingRow
            icon="Moon"
            label="Dark Mode"
            rightElement={
              <Switch
                value={settings.theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: '#E5E7EB', true: '#1B3FA0' }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <View style={{ height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 }} />
          <SettingRow
            icon="Bell"
            label="Notifications"
            value="Coming soon"
          />
        </View>

        {/* Recurring */}
        <Text style={{
          fontSize: 12, fontWeight: '700',
          color: '#9CA3AF', letterSpacing: 1,
          textTransform: 'uppercase',
          marginBottom: 8, marginLeft: 4,
        }}>
          Recurring
        </Text>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          <SettingRow
            icon="RefreshCw"
            label="Manage Recurring"
            onPress={() => router.push('/modals/add-recurring')}
          />
        </View>

        {/* Export */}
        <Text style={{
          fontSize: 12, fontWeight: '700',
          color: '#9CA3AF', letterSpacing: 1,
          textTransform: 'uppercase',
          marginBottom: 8, marginLeft: 4,
        }}>
          Export Data
        </Text>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          <SettingRow
            icon="Download"
            label={exporting ? 'Exporting...' : 'Export as CSV'}
            onPress={handleExportCSV}
          />
          <View style={{ height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 16 }} />
          <SettingRow
            icon="FileText"
            label={exporting ? 'Exporting...' : 'Export as PDF'}
            onPress={handleExportPDF}
          />
        </View>

        {/* Security */}
        <Text style={{
          fontSize: 12, fontWeight: '700',
          color: '#9CA3AF', letterSpacing: 1,
          textTransform: 'uppercase',
          marginBottom: 8, marginLeft: 4,
        }}>
          Security
        </Text>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          <SettingRow
            icon="Shield"
            label="Re-verify Identity"
            onPress={handleResetLiveness}
          />
        </View>

        {/* Danger */}
        <Text style={{
          fontSize: 12, fontWeight: '700',
          color: '#9CA3AF', letterSpacing: 1,
          textTransform: 'uppercase',
          marginBottom: 8, marginLeft: 4,
        }}>
          Danger Zone
        </Text>
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          marginBottom: 20,
          overflow: 'hidden',
        }}>
          <SettingRow
            icon="Trash2"
            label="Clear All Data"
            onPress={handleClearData}
            destructive
          />
        </View>

        {/* Version */}
        <Text style={{
          textAlign: 'center',
          fontSize: 12,
          color: '#9CA3AF',
        }}>
          Trackr v1.0.0 — Built with care
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}