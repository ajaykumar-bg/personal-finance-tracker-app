# 💰 Personal Finance Tracker App

A fully-featured Personal Finance Tracker built with **Expo**, **React Native**, **React Native Paper**, and **Redux Toolkit**. Track expenses, manage budgets, visualize spending trends, and sync data locally with AsyncStorage.

## 🚀 Features

### Core Features

- ✅ **Add/Edit/Delete Transactions** - Manage income and expenses seamlessly
- ✅ **Category-Based Filtering** - Filter by 10+ predefined categories
- ✅ **Monthly Spending Charts** - Visualize trends with Victory charts
- ✅ **Pie Charts** - See spending distribution by category
- ✅ **Budget Management** - Set monthly budgets and track against actuals
- ✅ **Offline-First Storage** - All data persisted locally with AsyncStorage
- ✅ **Multi-Tab Navigation** - Dashboard, Analytics, and Budgets tabs

### Transaction Categories

Food, Entertainment, Transport, Shopping, Bills, Health, Education, Salary, Investment, Other

## 📦 Tech Stack

### Core

- **React Native** - Mobile UI framework
- **Expo** - Development platform
- **TypeScript** - Type safety

### State Management

- **Redux Toolkit** - State management
- **React Redux** - React bindings

### UI & Visualization

- **React Native Paper** - Material Design components
- **Victory Native** - Charts and graphs

### Data & Validation

- **AsyncStorage** - Offline persistence
- **Zod** - Schema validation
- **date-fns** - Date utilities
- **UUID** - Unique ID generation

## 🏗️ Project Structure

```
src/
├── app/                           # Screen components
│   ├── _layout.tsx               # Root layout with Redux & Paper providers
│   ├── dashboard.tsx             # Main dashboard with recent transactions
│   ├── transactions.tsx          # Transaction list with filters
│   ├── add-transaction.tsx       # Add/edit transaction form
│   ├── analytics.tsx             # Charts and analytics
│   └── budget.tsx                # Budget management
├── components/
│   ├── app-tabs.tsx              # Bottom tab navigation
│   ├── TransactionCard.tsx       # Transaction display component
│   ├── TransactionForm.tsx       # Transaction form component
│   ├── CategoryFilter.tsx        # Category filter chips
│   ├── StatsCard.tsx             # Statistics display card
│   └── ...                        # Other UI components
├── store/                         # Redux store
│   ├── index.ts                  # Store configuration
│   ├── transactionsSlice.ts      # Transactions reducer
│   ├── budgetsSlice.ts           # Budgets reducer
│   └── filtersSlice.ts           # Filters reducer
├── services/
│   └── storage.ts                # AsyncStorage operations
├── hooks/
│   ├── useRedux.ts               # Redux typed hooks
│   ├── useTransactions.ts        # Custom transaction hooks
│   │   ├── useFilteredTransactions
│   │   ├── useTransactionStats
│   │   └── useMonthlyStats
│   └── use-color-scheme.ts       # Color scheme detection
├── types/
│   ├── index.ts                  # Core types
│   └── schemas.ts                # Zod validation schemas
└── constants/
    └── theme.ts                  # Theme constants
```

## 🎯 Key Concepts Learned

### 1. **Form Handling & Validation**

- Zod schemas for runtime validation
- User-friendly error messages
- Real-time form state management

### 2. **Local Persistence**

- AsyncStorage for offline-first architecture
- Seamless sync with Redux state
- Data structure preservation

### 3. **Data Visualization**

- Victory Native charts (Bar, Pie)
- Monthly spending trends
- Category distribution analysis

### 4. **State Management**

- Redux Toolkit for centralized state
- Slices for organized reducers
- Memoized selectors for performance

### 5. **Navigation**

- React Navigation bottom tabs
- Nested stack navigation
- Modal-like screen flows

## 🎨 UI Components (React Native Paper)

- **FAB** - Floating action buttons for quick add
- **Card** - Content containers
- **Button** - Actions and navigation
- **TextInput** - Form inputs with validation
- **SegmentedButtons** - Type and category selection
- **Chip** - Filter selections
- **Appbar** - Header navigation
- **ProgressBar** - Budget utilization visual
- **Dialog** - Modal confirmations

## 📱 Screen Navigation

```
Dashboard
├── Dashboard Home (Recent transactions overview)
├── Transactions (Full list + filtering)
└── Add Transaction

Analytics
└── Analytics Home (Charts and insights)

Budgets
└── Budgets Home (Budget management)
```

## 🔄 Data Flow

1. **User Action** → Component dispatch
2. **Redux Action** → Reducer updates state
3. **Storage Service** → Persists to AsyncStorage
4. **Reloaded State** → UI reflects changes
5. **Hooks** → Compute derived data (stats, filtered lists)

## 💾 Data Structure

### Transaction

```typescript
{
  id: "uuid",
  description: "Grocery shopping",
  amount: 1250.50,
  category: "Food",
  type: "expense",
  date: "2024-01-15",
  timestamp: 1705276800000
}
```

### Budget

```typescript
{
  id: "uuid",
  category: "Food",
  limit: 5000,
  month: "2024-01"
}
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Dependencies Installed

```bash
@react-native-async-storage/async-storage  # Local storage
react-native-paper                          # UI components
victory-native                              # Charts
zod                                         # Validation
date-fns                                    # Date utilities
@reduxjs/toolkit                            # State management
react-redux                                 # React bindings
uuid                                        # ID generation
```

### Running the App

```bash
# Start development
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## ✨ Future Enhancements

- 🔐 Firebase cloud sync
- 📊 Advanced analytics (trends, predictions)
- 🏷️ Custom category creation
- 📱 App notifications for budget alerts
- 💱 Multi-currency support
- 📊 Data export (CSV/PDF)
- 🔄 Recurring transactions
- 🏦 Bank account integration

## 📚 Learning Outcomes

By building this app, you'll learn:

- ✅ Form validation with Zod
- ✅ Redux state management patterns
- ✅ Data persistence strategies
- ✅ Chart integration with Victory
- ✅ React Native Paper Material Design
- ✅ Navigation patterns in React Native
- ✅ Custom React hooks
- ✅ TypeScript with React Native

## 🎓 Code Examples

### Adding a Transaction

```typescript
const handleAddTransaction = async (data) => {
	const transaction: Transaction = {
		id: uuidv4(),
		...data,
		timestamp: Date.now(),
	};

	await storageService.addTransaction(transaction);
	const transactions = await storageService.getTransactions();
	dispatch(setTransactions(transactions));
};
```

### Filtering Transactions

```typescript
const filtered = useFilteredTransactions();
// Automatically filters by category and type
```

### Getting Stats

```typescript
const { income, expense, balance } = useTransactionStats();
```

## 📝 License

This is a learning project built for Expo and React Native education.

---

**Happy Tracking! 💸**
