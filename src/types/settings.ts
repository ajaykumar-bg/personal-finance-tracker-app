export type CurrencyCode =
	| 'INR'
	| 'USD'
	| 'EUR'
	| 'GBP'
	| 'JPY'
	| 'AUD'
	| 'CAD'
	| 'SGD';

export interface Currency {
	code: CurrencyCode;
	symbol: string;
	name: string;
}

export interface SettingsState {
	currency: Currency;
}
