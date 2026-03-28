import { Budget } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BudgetsState {
	items: Budget[];
	loading: boolean;
	error: string | null;
}

const initialState: BudgetsState = {
	items: [],
	loading: false,
	error: null,
};

export const budgetsSlice = createSlice({
	name: 'budgets',
	initialState,
	reducers: {
		setBudgets: (state, action: PayloadAction<Budget[]>) => {
			state.items = action.payload;
			state.error = null;
		},
		addBudget: (state, action: PayloadAction<Budget>) => {
			state.items.push(action.payload);
			state.error = null;
		},
		updateBudget: (state, action: PayloadAction<Budget>) => {
			const index = state.items.findIndex((b) => b.id === action.payload.id);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
			state.error = null;
		},
		deleteBudget: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((b) => b.id !== action.payload);
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
	setBudgets,
	addBudget,
	updateBudget,
	deleteBudget,
	setLoading,
	setError,
} = budgetsSlice.actions;

export default budgetsSlice.reducer;
