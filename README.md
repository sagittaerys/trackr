# Trackr 

A finance tracking app built with React Native and Expo. Trackr helps users manage their finances by logging transactions, setting budgets, visualising spending patterns, and securing access with facial liveness verification — all stored locally on the device with no backend required.

---

##  Features

### Core
- **Transaction Management** — Log income and expenses, categorise by type (food, transport, housing, health, shopping, salary, freelance, and more)
- **Real-time Balance** — Dashboard balance updates instantly as transactions are added or removed
- **Budget System** — Set spending limits per category on a weekly or monthly basis with visual utilization tracking
- **Recurring Transactions** — Schedule recurring income or expenses (e.g. monthly rent, weekly salary) with an automatic scheduling engine that runs on app open
- **Facial Liveness Verification** — Camera-based liveness gate that restricts access to the dashboard, with animated face frame, real-time instructions, and success/failure handling

### Analytics
- Spending by category (donut chart)
- Income vs expense over time (bar/line chart)
- Budget utilization per category (color-coded progress bars)
- Spending velocity trends

### Bonus
- **Data Export** — Export transactions as CSV or PDF via native share sheet
- **Currency Formatting** — Support for multiple currency symbols (₦ NGN, $ USD, € EUR, £ GBP, and more)

### Data Persistence
- All data is stored locally on the device using AsyncStorage and expo-secure-store
- Data persists across app closes and restarts — no backend, no account required

---

##  Tech Stack

| Concern | Library |
|---|---|
| Framework | Expo (Managed Workflow) |
| Navigation | Expo Router (file-based) |
| State Management | Zustand |
| Local Storage | AsyncStorage + expo-secure-store |
| Charts | victory-native (Skia renderer) |
| Animations | react-native-reanimated |
| Liveness | expo-camera (custom UI) |
| Export | expo-print + expo-sharing |
| Date Handling | date-fns |
| IDs | nanoid |
| Styling | NativeWind + custom components |

---

## Project Structure

```
trackr/
├── app/
│   ├── (auth)/
│   │   └── liveness.tsx          # Liveness verification screen
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab bar layout
│   │   ├── index.tsx             # Dashboard / Home
│   │   ├── transactions.tsx      # All transactions list
│   │   ├── insights.tsx          # Charts & analytics dashboard
│   │   └── settings.tsx          # Budget, currency, export
│   ├── modals/
│   │   ├── add-transaction.tsx   # Add/edit transaction
│   │   ├── add-budget.tsx        # Set budget
│   │   └── add-recurring.tsx     # Set recurring transaction
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry → redirects to liveness
│
├── components/
│   ├── ui/                       # Base reusable components
│   ├── dashboard/                # Balance card, quick stats, recent transactions
│   ├── analytics/                # Chart components
│   ├── transactions/             # Transaction list + filters
│   └── liveness/                 # Face frame + instructions
│
├── stores/
│   ├── useTransactionStore.ts
│   ├── useBudgetStore.ts
│   ├── useRecurringStore.ts
│   └── useSettingsStore.ts
│
├── lib/
│   ├── storage.ts                # AsyncStorage helpers
│   ├── recurring.ts              # Recurring transaction engine
│   ├── export.ts                 # CSV + PDF export
│   └── currency.ts               # Currency formatting
│
├── types/
│   └── index.ts                  # All TypeScript interfaces
│
├── constants/
│   ├── categories.ts
│   └── currencies.ts
│
└── hooks/
    ├── useRecurringScheduler.ts
    └── useFinancialSummary.ts
```

---

##  Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or Yarn
- Expo Go app on your device, or an Android/iOS emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/sagittaerys/trackr.git
cd trackr

# Install dependencies
bun install

# Start the development server
bunx expo start --clear
```

Then scan the QR code with Expo Go (Android) or the Camera app (iOS).

### Running on Android Emulator

```bash
bunx expo start --android
```

### Running on iOS Simulator

```bash
bunx expo start --ios
```

---

## Data Models

```typescript
interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: Category
  note: string
  date: string           
  recurringId?: string   
  createdAt: string
}

interface RecurringRule {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: Category
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  nextDueDate: string
  isActive: boolean
  createdAt: string
}

interface Budget {
  id: string
  category: Category
  amount: number
  period: 'weekly' | 'monthly'
  createdAt: string
}
```

---

##  Security

Access to the dashboard is gated behind a facial liveness verification screen. The camera-based flow includes:

- Animated oval face frame with guidance overlays
- Real-time user instructions (position face, hold still)
- Distinct success and failure states with appropriate feedback
- Liveness state persisted in secure storage for the session

---

##  Building for Production

```bash
# Build APK (Android)
bunx eas build --platform android --profile preview

# Build IPA (iOS)
bunx eas build --platform ios --profile preview
```

---



**sagittaerys**
GitHub: [@sagittaerys](https://github.com/sagittaerys)

Built as part of the HNG Internship Stage 2 Mobile Track.

---

