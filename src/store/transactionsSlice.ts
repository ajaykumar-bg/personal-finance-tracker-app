import { mockTransactions } from '@/data/mockTransactions';
import { Transaction } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TransactionsState {
	items: Transaction[];
	loading: boolean;
	error: string | null;
}

const initialState: TransactionsState = {
	items: mockTransactions,
	loading: false,
	error: null,
};

export const transactionsSlice = createSlice({
	name: 'transactions',
	initialState,
	reducers: {
		setTransactions: (state, action: PayloadAction<Transaction[]>) => {
			state.items = action.payload;
			state.error = null;
		},
		addTransaction: (state, action: PayloadAction<Transaction>) => {
			state.items.push(action.payload);
			state.error = null;
		},
		updateTransaction: (state, action: PayloadAction<Transaction>) => {
			const index = state.items.findIndex((t) => t.id === action.payload.id);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
			state.error = null;
		},
		deleteTransaction: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((t) => t.id !== action.payload);
			state.error = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload;
		},
	},
});

export const {
	setTransactions,
	addTransaction,
	updateTransaction,
	deleteTransaction,
	setLoading,
	setError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;
