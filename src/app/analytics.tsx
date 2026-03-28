import { useAppDispatch } from '@/hooks/useRedux';
import { useMonthlyStats, useTransactionStats } from '@/hooks/useTransactions';
import { storageService } from '@/services/storage';
import { setTransactions } from '@/store/transactionsSlice';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';

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

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.Content title='Analytics' />
			</Appbar.Header>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* Monthly Statistics */}
				<Card style={styles.card}>
					<Card.Content>
						<Text variant='titleMedium' style={styles.chartTitle}>
							Monthly Spending Summary (Last 6 Months)
						</Text>
						{Object.entries(monthlyStats).length > 0 ? (
							Object.entries(monthlyStats)
								.sort()
								.slice(-6)
								.map(([month, stats]) => (
									<View key={month} style={styles.monthRow}>
										<Text variant='bodyMedium' style={styles.monthLabel}>
											{new Date(month + '-01').toLocaleDateString('en-US', {
												month: 'short',
												year: 'numeric',
											})}
										</Text>
										<View style={styles.monthStats}>
											<Text
												style={{
													...styles.statValue,
													color: CHART_COLORS.income,
												}}
											>
												In: ₹{stats.income.toFixed(0)}
											</Text>
											<Text
												style={{
													...styles.statValue,
													color: CHART_COLORS.expense,
												}}
											>
												Out: ₹{stats.expense.toFixed(0)}
											</Text>
										</View>
									</View>
								))
						) : (
							<Text variant='bodyMedium' style={styles.noData}>
								No data available
							</Text>
						)}
					</Card.Content>
				</Card>

				{/* Category Details */}
				<Card style={styles.card}>
					<Card.Content>
						<Text variant='titleMedium' style={styles.chartTitle}>
							Spending by Category
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
	noData: {
		textAlign: 'center',
		opacity: 0.6,
		paddingVertical: 24,
	},
	monthRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE',
	},
	monthLabel: {
		fontWeight: '500',
	},
	monthStats: {
		flexDirection: 'row',
		gap: 16,
	},
	statValue: {
		fontWeight: 'bold',
		fontSize: 14,
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
