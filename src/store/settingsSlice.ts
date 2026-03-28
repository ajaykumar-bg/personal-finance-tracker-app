import { DEFAULT_CURRENCY } from '@/data/currencies';
import { Currency, SettingsState } from '@/types/settings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SettingsState = {
	currency: DEFAULT_CURRENCY,
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setCurrency: (state, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
		},
		initializeSettings: (state, action: PayloadAction<SettingsState>) => {
			state.currency = action.payload.currency;
		},
	},
});

export const { setCurrency, initializeSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
