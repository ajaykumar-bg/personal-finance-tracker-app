import { useMemo } from 'react';
import { useAppSelector } from './useRedux';

export const useFilteredTransactions = () => {
	const transactions = useAppSelector((state) => state.transactions.items);
	const filters = useAppSelector((state) => state.filters);

	return useMemo(() => {
		let filtered = [...transactions];

		if (filters.selectedCategory) {
			filtered = filtered.filter(
				(t) => t.category === filters.selectedCategory,
			);
		}

		if (filters.selectedType) {
			filtered = filtered.filter((t) => t.type === filters.selectedType);
		}

		if (filters.dateRange.start) {
			filtered = filtered.filter((t) => t.date >= filters.dateRange.start!);
		}

		if (filters.dateRange.end) {
			filtered = filtered.filter((t) => t.date <= filters.dateRange.end!);
		}

		return filtered.sort((a, b) => b.timestamp - a.timestamp);
	}, [transactions, filters]);
};

export const useTransactionStats = (isCustom?: boolean) => {
	const baseTransactions = useAppSelector((state) => state.transactions.items);
	const transactions = isCustom ? baseTransactions : baseTransactions;

	return useMemo(() => {
		const income = transactions
			.filter((t) => t.type === 'income')
			.reduce((sum, t) => sum + t.amount, 0);

		const expense = transactions
			.filter((t) => t.type === 'expense')
			.reduce((sum, t) => sum + t.amount, 0);

		const balance = income - expense;

		const byCategory: Record<string, number> = {};
		transactions.forEach((t) => {
			if (t.type === 'expense') {
				byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
			}
		});

		return { income, expense, balance, byCategory };
	}, [transactions]);
};

export const useMonthlyStats = () => {
	const transactions = useAppSelector((state) => state.transactions.items);

	return useMemo(() => {
		const statsByMonth: Record<
			string,
			{ income: number; expense: number; byCategory: Record<string, number> }
		> = {};

		transactions.forEach((t) => {
			const month = t.date.substring(0, 7); // YYYY-MM

			if (!statsByMonth[month]) {
				statsByMonth[month] = {
					income: 0,
					expense: 0,
					byCategory: {},
				};
			}

			if (t.type === 'income') {
				statsByMonth[month].income += t.amount;
			} else {
				statsByMonth[month].expense += t.amount;
				statsByMonth[month].byCategory[t.category] =
					(statsByMonth[month].byCategory[t.category] || 0) + t.amount;
			}
		});

		return statsByMonth;
	}, [transactions]);
};
