import { configureStore } from '@reduxjs/toolkit';
import budgetsReducer from './budgetsSlice';
import filtersReducer from './filtersSlice';
import transactionsReducer from './transactionsSlice';

export const store = configureStore({
	reducer: {
		transactions: transactionsReducer,
		budgets: budgetsReducer,
		filters: filtersReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
