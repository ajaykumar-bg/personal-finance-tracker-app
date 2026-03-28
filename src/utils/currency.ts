import { Currency } from '@/types/settings';

/**
 * Format a number with the given currency
 * @param amount The amount to format
 * @param currency The currency object with symbol
 * @returns Formatted string like "₹1,234.50"
 */
export const formatCurrency = (amount: number, currency: Currency): string => {
	return `${currency.symbol}${amount.toLocaleString('en-IN', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
};

/**
 * Format a number with the given currency (no decimal places)
 * @param amount The amount to format
 * @param currency The currency object with symbol
 * @returns Formatted string like "₹1,234"
 */
export const formatCurrencyNoDecimal = (
	amount: number,
	currency: Currency,
): string => {
	return `${currency.symbol}${amount.toLocaleString('en-IN', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})}`;
};
