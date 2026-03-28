import { FilterState, TransactionCategory, TransactionType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FilterState = {
	selectedCategory: null,
	selectedType: null,
	dateRange: {
		start: null,
		end: null,
	},
};

export const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setSelectedCategory: (
			state,
			action: PayloadAction<TransactionCategory | null>,
		) => {
			state.selectedCategory = action.payload;
		},
		setSelectedType: (state, action: PayloadAction<TransactionType | null>) => {
			state.selectedType = action.payload;
		},
		setDateRange: (
			state,
			action: PayloadAction<{ start: string | null; end: string | null }>,
		) => {
			state.dateRange = action.payload;
		},
		resetFilters: (state) => {
			state.selectedCategory = null;
			state.selectedType = null;
			state.dateRange = {
				start: null,
				end: null,
			};
		},
	},
});

export const {
	setSelectedCategory,
	setSelectedType,
	setDateRange,
	resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
