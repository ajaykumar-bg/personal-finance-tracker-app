import { Budget, Transaction } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TRANSACTIONS_KEY = '@fin_tracker_transactions';
const BUDGETS_KEY = '@fin_tracker_budgets';

export const storageService = {
	// Transactions
	async getTransactions(): Promise<Transaction[]> {
		try {
			const data = await AsyncStorage.getItem(TRANSACTIONS_KEY);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error('Error reading transactions:', error);
			return [];
		}
	},

	async addTransaction(transaction: Transaction): Promise<void> {
		try {
			const transactions = await this.getTransactions();
			transactions.push(transaction);
			await AsyncStorage.setItem(
				TRANSACTIONS_KEY,
				JSON.stringify(transactions),
			);
		} catch (error) {
			console.error('Error adding transaction:', error);
			throw error;
		}
	},

	async updateTransaction(
		id: string,
		updates: Partial<Transaction>,
	): Promise<void> {
		try {
			const transactions = await this.getTransactions();
			const index = transactions.findIndex((t) => t.id === id);
			if (index !== -1) {
				transactions[index] = { ...transactions[index], ...updates };
				await AsyncStorage.setItem(
					TRANSACTIONS_KEY,
					JSON.stringify(transactions),
				);
			}
		} catch (error) {
			console.error('Error updating transaction:', error);
			throw error;
		}
	},

	async deleteTransaction(id: string): Promise<void> {
		try {
			const transactions = await this.getTransactions();
			const filtered = transactions.filter((t) => t.id !== id);
			await AsyncStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(filtered));
		} catch (error) {
			console.error('Error deleting transaction:', error);
			throw error;
		}
	},

	// Budgets
	async getBudgets(): Promise<Budget[]> {
		try {
			const data = await AsyncStorage.getItem(BUDGETS_KEY);
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error('Error reading budgets:', error);
			return [];
		}
	},

	async addBudget(budget: Budget): Promise<void> {
		try {
			const budgets = await this.getBudgets();
			budgets.push(budget);
			await AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
		} catch (error) {
			console.error('Error adding budget:', error);
			throw error;
		}
	},

	async updateBudget(id: string, updates: Partial<Budget>): Promise<void> {
		try {
			const budgets = await this.getBudgets();
			const index = budgets.findIndex((b) => b.id === id);
			if (index !== -1) {
				budgets[index] = { ...budgets[index], ...updates };
				await AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
			}
		} catch (error) {
			console.error('Error updating budget:', error);
			throw error;
		}
	},

	async deleteBudget(id: string): Promise<void> {
		try {
			const budgets = await this.getBudgets();
			const filtered = budgets.filter((b) => b.id !== id);
			await AsyncStorage.setItem(BUDGETS_KEY, JSON.stringify(filtered));
		} catch (error) {
			console.error('Error deleting budget:', error);
			throw error;
		}
	},

	// Clear all data
	async clearAll(): Promise<void> {
		try {
			await AsyncStorage.multiRemove([TRANSACTIONS_KEY, BUDGETS_KEY]);
		} catch (error) {
			console.error('Error clearing data:', error);
			throw error;
		}
	},
};
