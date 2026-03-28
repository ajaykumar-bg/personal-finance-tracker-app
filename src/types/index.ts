export type TransactionType = 'expense' | 'income';

export type TransactionCategory =
	| 'Food'
	| 'Entertainment'
	| 'Transport'
	| 'Shopping'
	| 'Bills'
	| 'Health'
	| 'Education'
	| 'Salary'
	| 'Investment'
	| 'Other';

export interface Transaction {
	id: string;
	description: string;
	amount: number;
	category: TransactionCategory;
	type: TransactionType;
	date: string; // ISO date string
	timestamp: number;
}

export interface Budget {
	id: string;
	category: TransactionCategory;
	limit: number;
	month: string; // YYYY-MM format
}

export interface MonthlyStats {
	month: string;
	income: number;
	expense: number;
	balance: number;
	byCategory: Record<TransactionCategory, number>;
}

export interface FilterState {
	selectedCategory: TransactionCategory | null;
	selectedType: TransactionType | null;
	dateRange: {
		start: string | null;
		end: string | null;
	};
}
