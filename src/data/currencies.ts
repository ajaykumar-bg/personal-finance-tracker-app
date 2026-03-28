import { Currency } from '@/types/settings';

export const CURRENCIES: Record<string, Currency> = {
	INR: {
		code: 'INR',
		symbol: '₹',
		name: 'Indian Rupee',
	},
	USD: {
		code: 'USD',
		symbol: '$',
		name: 'US Dollar',
	},
	EUR: {
		code: 'EUR',
		symbol: '€',
		name: 'Euro',
	},
	GBP: {
		code: 'GBP',
		symbol: '£',
		name: 'British Pound',
	},
	JPY: {
		code: 'JPY',
		symbol: '¥',
		name: 'Japanese Yen',
	},
	AUD: {
		code: 'AUD',
		symbol: 'A$',
		name: 'Australian Dollar',
	},
	CAD: {
		code: 'CAD',
		symbol: 'C$',
		name: 'Canadian Dollar',
	},
	SGD: {
		code: 'SGD',
		symbol: 'S$',
		name: 'Singapore Dollar',
	},
};

export const DEFAULT_CURRENCY = CURRENCIES.INR;
