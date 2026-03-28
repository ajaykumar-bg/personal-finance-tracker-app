import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';

import AddTransactionScreen from '@/app/add-transaction';
import AnalyticsScreen from '@/app/analytics';
import BudgetScreen from '@/app/budget';
import DashboardScreen from '@/app/dashboard';
import TransactionsScreen from '@/app/transactions';
import { Colors } from '@/constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='dashboard-home'
				component={DashboardScreen}
				options={{ title: 'Dashboard' }}
			/>
			<Stack.Screen
				name='transactions'
				component={TransactionsScreen}
				options={{
					title: 'Transactions',
					animationEnabled: true,
				}}
			/>
			<Stack.Screen
				name='add-transaction'
				component={AddTransactionScreen}
				options={{
					title: 'Add Transaction',
					animationEnabled: true,
				}}
			/>
		</Stack.Navigator>
	);
};

const AnalyticsStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='analytics-home'
				component={AnalyticsScreen}
				options={{ title: 'Analytics' }}
			/>
		</Stack.Navigator>
	);
};

const BudgetStack = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='budget-home'
				component={BudgetScreen}
				options={{ title: 'Budgets' }}
			/>
		</Stack.Navigator>
	);
};

export default function AppTabs() {
	const scheme = useColorScheme();
	const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ color, size }) => {
					let iconName = 'home';

					if (route.name === 'Dashboard') {
						iconName = 'home-outline';
					} else if (route.name === 'Analytics') {
						iconName = 'chart-line';
					} else if (route.name === 'Budgets') {
						iconName = 'credit-card';
					}

					return (
						<MaterialCommunityIcons name={iconName} size={size} color={color} />
					);
				},
				tabBarActiveTintColor: colors.tint,
				tabBarInactiveTintColor: colors.tabIconDefault,
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopColor: colors.backgroundElement,
				},
			})}
		>
			<Tab.Screen
				name='Dashboard'
				component={DashboardStack}
				options={{
					tabBarLabel: 'Dashboard',
				}}
			/>
			<Tab.Screen
				name='Analytics'
				component={AnalyticsStack}
				options={{
					tabBarLabel: 'Analytics',
				}}
			/>
			<Tab.Screen
				name='Budgets'
				component={BudgetStack}
				options={{
					tabBarLabel: 'Budgets',
				}}
			/>
		</Tab.Navigator>
	);
}
