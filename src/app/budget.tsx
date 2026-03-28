import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { storageService } from '@/services/storage';
import { setBudgets } from '@/store/budgetsSlice';
import { Budget, TransactionCategory } from '@/types';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
	Alert,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import {
	Appbar,
	Button,
	Card,
	Dialog,
	FAB,
	Portal,
	ProgressBar,
	Text,
} from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

const CATEGORIES: TransactionCategory[] = [
	'Food',
	'Entertainment',
	'Transport',
	'Shopping',
	'Bills',
	'Health',
	'Education',
];

export default function BudgetScreen({ navigation }: any) {
	const dispatch = useAppDispatch();
	const budgets = useAppSelector((state) => state.budgets.items);

	const [dialogVisible, setDialogVisible] = useState(false);
	const [selectedCategory, setSelectedCategory] =
		useState<TransactionCategory>('Food');
	const [budgetLimit, setBudgetLimit] = useState('');

	const currentMonth = format(new Date(), 'yyyy-MM');

	useEffect(() => {
		const loadBudgets = async () => {
			const data = await storageService.getBudgets();
			dispatch(setBudgets(data));
		};
		loadBudgets();
	}, [dispatch]);

	const getBudgetForCategory = (category: TransactionCategory) => {
		return budgets.find(
			(b) => b.category === category && b.month === currentMonth,
		);
	};

	const getSpentForCategory = (category: TransactionCategory) => {
		return byCategory[category] || 0;
	};

	const handleAddBudget = async () => {
		try {
			if (!budgetLimit || parseFloat(budgetLimit) <= 0) {
				Alert.alert('Error', 'Please enter a valid budget limit');
				return;
			}

			const existingBudget = getBudgetForCategory(selectedCategory);
			const newBudget: Budget = {
				id: existingBudget?.id || uuidv4(),
				category: selectedCategory,
				limit: parseFloat(budgetLimit),
				month: currentMonth,
			};

			if (existingBudget) {
				await storageService.updateBudget(existingBudget.id, newBudget);
			} else {
				await storageService.addBudget(newBudget);
			}

			const data = await storageService.getBudgets();
			dispatch(setBudgets(data));

			setDialogVisible(false);
			setBudgetLimit('');
			Alert.alert('Success', 'Budget set successfully!');
		} catch (error) {
			Alert.alert('Error', 'Failed to set budget');
		}
	};

	const handleDeleteBudget = async (id: string) => {
		try {
			await storageService.deleteBudget(id);
			const data = await storageService.getBudgets();
			dispatch(setBudgets(data));
		} catch (error) {
			Alert.alert('Error', 'Failed to delete budget');
		}
	};

	const budgetCards = CATEGORIES.map((category) => {
		const budget = getBudgetForCategory(category);
		const spent = getSpentForCategory(category);
		const percentage = budget ? Math.min(spent / budget.limit, 1) : 0;
		const isOverBudget = budget && spent > budget.limit;

		return (
			<Card key={category} style={styles.budgetCard}>
				<Card.Content>
					<View style={styles.budgetHeader}>
						<Text variant='titleMedium'>{category}</Text>
						{budget && (
							<Button
								icon='delete'
								compact
								textColor='#F44336'
								onPress={() => handleDeleteBudget(budget.id)}
							/>
						)}
					</View>

					{budget ? (
						<>
							<View style={styles.budgetInfo}>
								<Text variant='bodySmall'>
									₹{spent.toFixed(2)} / ₹{budget.limit.toFixed(2)}
								</Text>
								<Text
									variant='bodySmall'
									style={[isOverBudget && styles.overBudget]}
								>
									{isOverBudget
										? `₹${(spent - budget.limit).toFixed(2)} over`
										: `₹${(budget.limit - spent).toFixed(2)} left`}
								</Text>
							</View>
							<ProgressBar
								progress={percentage}
								style={styles.progressBar}
								color={isOverBudget ? '#F44336' : '#4CAF50'}
							/>
						</>
					) : (
						<Text variant='bodySmall' style={styles.noBudget}>
							No budget set
						</Text>
					)}
				</Card.Content>
			</Card>
		);
	});

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title='Budgets' subtitle={`Month of ${currentMonth}`} />
			</Appbar.Header>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{budgetCards}
			</ScrollView>

			<Portal>
				<Dialog
					visible={dialogVisible}
					onDismiss={() => setDialogVisible(false)}
				>
					<Dialog.Title>Set Budget for {selectedCategory}</Dialog.Title>
					<Dialog.Content>
						<Text variant='bodySmall' style={styles.dialogLabel}>
							Budget Limit (₹)
						</Text>
						{/* TextInput would go here in a full implementation */}
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setDialogVisible(false)}>Cancel</Button>
						<Button onPress={handleAddBudget}>Save</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>

			<FAB
				icon='plus'
				style={styles.fab}
				onPress={() => setDialogVisible(true)}
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
	budgetCard: {
		marginBottom: 12,
	},
	budgetHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	budgetInfo: {
		marginBottom: 8,
	},
	progressBar: {
		height: 8,
		borderRadius: 4,
	},
	noBudget: {
		opacity: 0.6,
		fontStyle: 'italic',
	},
	overBudget: {
		color: '#F44336',
		fontWeight: 'bold',
	},
	dialogLabel: {
		marginBottom: 8,
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0,
	},
});
