import { CategoryFilter } from '@/components/CategoryFilter';
import { TransactionCard } from '@/components/TransactionCard';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useFilteredTransactions } from '@/hooks/useTransactions';
import { storageService } from '@/services/storage';
import {
	resetFilters,
	setSelectedCategory,
	setSelectedType,
} from '@/store/filtersSlice';
import { setTransactions } from '@/store/transactionsSlice';
import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, Button, FAB, Text } from 'react-native-paper';

export default function TransactionsScreen({ navigation }: any) {
	const dispatch = useAppDispatch();
	const selectedCategory = useAppSelector(
		(state) => state.filters.selectedCategory,
	);
	const selectedType = useAppSelector((state) => state.filters.selectedType);
	const filteredTransactions = useFilteredTransactions();

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

	const handleClearFilters = () => {
		dispatch(resetFilters());
	};

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title='Transactions' />
				<Appbar.Action icon='filter-reset' onPress={handleClearFilters} />
			</Appbar.Header>

			<View style={styles.content}>
				{/* Type Filter */}
				<View style={styles.filterSection}>
					<Text variant='bodySmall' style={styles.filterLabel}>
						Type:
					</Text>
					<View style={styles.typeFilter}>
						<Button
							mode={selectedType === 'expense' ? 'contained' : 'outlined'}
							compact
							onPress={() =>
								dispatch(
									setSelectedType(
										selectedType === 'expense' ? null : 'expense',
									),
								)
							}
							style={styles.filterButton}
						>
							Expense
						</Button>
						<Button
							mode={selectedType === 'income' ? 'contained' : 'outlined'}
							compact
							onPress={() =>
								dispatch(
									setSelectedType(selectedType === 'income' ? null : 'income'),
								)
							}
							style={styles.filterButton}
						>
							Income
						</Button>
					</View>
				</View>

				{/* Category Filter */}
				<View style={styles.filterSection}>
					<Text variant='bodySmall' style={styles.filterLabel}>
						Category:
					</Text>
					<CategoryFilter
						selected={selectedCategory}
						onSelect={(category) => dispatch(setSelectedCategory(category))}
					/>
				</View>

				{/* Transactions List */}
				<FlatList
					data={filteredTransactions}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<TransactionCard
							transaction={item}
							onDelete={handleDeleteTransaction}
						/>
					)}
					ListEmptyComponent={
						<View style={styles.emptyState}>
							<Text variant='bodyMedium' style={styles.emptyText}>
								No transactions found
							</Text>
						</View>
					}
					scrollEnabled={false}
				/>
			</View>

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
		paddingHorizontal: 16,
		paddingTop: 12,
	},
	filterSection: {
		marginBottom: 16,
	},
	filterLabel: {
		opacity: 0.6,
		marginBottom: 8,
	},
	typeFilter: {
		flexDirection: 'row',
		gap: 8,
	},
	filterButton: {
		flex: 1,
	},
	emptyState: {
		paddingVertical: 64,
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
