import { StatsCard } from '@/components/StatsCard';
import { TransactionCard } from '@/components/TransactionCard';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useTransactionStats } from '@/hooks/useTransactions';
import { storageService } from '@/services/storage';
import { setTransactions } from '@/store/transactionsSlice';
import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button, FAB, Text } from 'react-native-paper';

export default function DashboardScreen({ navigation }: any) {
	const dispatch = useAppDispatch();
	const transactions = useAppSelector((state) => state.transactions.items);
	const { income, expense, balance } = useTransactionStats();

	const recentTransactions = [...transactions]
		.sort((a, b) => b.timestamp - a.timestamp)
		.slice(0, 5);

	useEffect(() => {
		const loadTransactions = async () => {
			const data = await storageService.getTransactions();
			dispatch(setTransactions(data));
		};
		loadTransactions();
	}, [dispatch]);

	const handleDeleteTransaction = async (id: string) => {
		try {
			await storageService.deleteTransaction(id);
			const data = await storageService.getTransactions();
			dispatch(setTransactions(data));
		} catch (error) {
			console.error('Error deleting transaction:', error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text variant='headlineLarge' style={styles.title}>
						Finance Tracker
					</Text>
				</View>

				<StatsCard
					stats={[
					{ label: 'Income', value: income, color: '#4CAF50' },
					{ label: 'Expense', value: expense, color: '#F44336' },
					{
						label: 'Balance',
						value: balance,
					]}
				/>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text variant='titleLarge'>Recent Transactions</Text>
						<Button
							mode='text'
							compact
							onPress={() => navigation.navigate('transactions')}
						>
							View All
						</Button>
					</View>

					{recentTransactions.length === 0 ? (
						<View style={styles.emptyState}>
							<Text variant='bodyMedium' style={styles.emptyText}>
								No transactions yet. Add one to get started!
							</Text>
						</View>
					) : (
						recentTransactions.map((transaction) => (
							<TransactionCard
								key={transaction.id}
								transaction={transaction}
								onDelete={handleDeleteTransaction}
							/>
						))
					)}
				</View>
			</ScrollView>

			<FAB
				icon='plus'
				style={styles.fab}
				onPress={() => navigation.navigate('add-transaction')}
			/>
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
	header: {
		marginBottom: 24,
	},
	title: {
		fontWeight: 'bold',
	},
	section: {
		marginBottom: 24,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	emptyState: {
		paddingVertical: 32,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyText: {
		opacity: 0.6,
		textAlign: 'center',
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
