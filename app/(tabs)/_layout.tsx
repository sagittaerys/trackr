import { Tabs } from 'expo-router'
import { LayoutGrid, Activity, PieChart, TrendingUp, Settings } from 'lucide-react-native'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#1B3FA0',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color, size }) => (
            <LayoutGrid color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color, size }) => (
            <Activity color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Budget',
          tabBarIcon: ({ color, size }) => (
            <PieChart color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <TrendingUp color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}