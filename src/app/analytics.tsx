import { useAppDispatch } from '@/hooks/useRedux';
import { useMonthlyStats, useTransactionStats } from '@/hooks/useTransactions';
import { storageService } from '@/services/storage';
import { setTransactions } from '@/store/transactionsSlice';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryPie,
	VictoryTheme,
} from 'victory-native';

const CHART_COLORS = {
	expense: '#F44336',
	income: '#4CAF50',
	primary: '#2196F3',
};

export default function AnalyticsScreen({ navigation }: any) {
	const dispatch = useAppDispatch();
	const monthlyStats = useMonthlyStats();
	const { byCategory } = useTransactionStats();

	useEffect(() => {
		const loadTransactions = async () => {
			const data = await storageService.getTransactions();
			dispatch(setTransactions(data));
		};
		loadTransactions();
	}, [dispatch]);

	// Prepare data for monthly chart
	const monthlyData = Object.entries(monthlyStats)
		.sort()
		.slice(-6) // Last 6 months
		.map(([month, stats]) => ({
			x: month.substring(5), // MM format
			y: stats.expense,
			y1: stats.income,
		}));

	// Prepare data for category pie chart
	const categoryData = Object.entries(byCategory).map(([category, amount]) => ({
		x: category,
		y: amount,
	}));

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title='Analytics' />
			</Appbar.Header>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* Monthly Spending Chart */}
				<Card style={styles.card}>
					<Card.Content>
						<Text variant='titleMedium' style={styles.chartTitle}>
							Monthly Spending Trends (Last 6 Months)
						</Text>
						{monthlyData.length > 0 ? (
							<View style={styles.chartContainer}>
								<VictoryChart theme={VictoryTheme.material} height={300}>
									<VictoryAxis />
									<VictoryAxis dependentAxis />
									<VictoryBar
										data={monthlyData}
										x='x'
										y='y'
										style={{
											data: { fill: CHART_COLORS.expense, width: 15 },
										}}
									/>
								</VictoryChart>
							</View>
						) : (
							<Text variant='bodyMedium' style={styles.noData}>
								No data available
							</Text>
						)}
					</Card.Content>
				</Card>

				{/* Category Distribution Pie Chart */}
				<Card style={styles.card}>
					<Card.Content>
						<Text variant='titleMedium' style={styles.chartTitle}>
							Spending by Category
						</Text>
						{categoryData.length > 0 ? (
							<View style={styles.chartContainer}>
								<VictoryPie
									data={categoryData}
									theme={VictoryTheme.material}
									height={300}
									innerRadius={80}
									colorScale={[
										'#FF6B6B',
										'#FFA500',
										'#FFD700',
										'#69B34C',
										'#4CAF50',
										'#2196F3',
										'#1E88E5',
										'#1565C0',
										'#6A1B9A',
										'#E91E63',
									]}
								/>
							</View>
						) : (
							<Text variant='bodyMedium' style={styles.noData}>
								No expense data available
							</Text>
						)}
					</Card.Content>
				</Card>

				{/* Category Details */}
				<Card style={styles.card}>
					<Card.Content>
						<Text variant='titleMedium' style={styles.chartTitle}>
							Category Breakdown
						</Text>
						{Object.entries(byCategory).length > 0 ? (
							Object.entries(byCategory)
								.sort(([, a], [, b]) => b - a)
								.map(([category, amount]) => (
									<View key={category} style={styles.categoryRow}>
										<Text variant='bodyMedium'>{category}</Text>
										<Text variant='bodyMedium' style={styles.categoryAmount}>
											₹{amount.toFixed(2)}
										</Text>
									</View>
								))
						) : (
							<Text variant='bodyMedium' style={styles.noData}>
								No data available
							</Text>
						)}
					</Card.Content>
				</Card>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	card: {
		marginBottom: 16,
	},
	chartTitle: {
		marginBottom: 12,
		fontWeight: 'bold',
	},
	chartContainer: {
		alignItems: 'center',
	},
	noData: {
		textAlign: 'center',
		opacity: 0.6,
		paddingVertical: 24,
	},
	categoryRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE',
	},
	categoryAmount: {
		fontWeight: 'bold',
		color: '#F44336',
	},
});
