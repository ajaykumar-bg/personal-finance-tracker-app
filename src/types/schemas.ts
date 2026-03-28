import { z } from 'zod';
import { Budget, Transaction } from './index';

export const TransactionCategorySchema = z.enum([
	'Food',
	'Entertainment',
	'Transport',
	'Shopping',
	'Bills',
	'Health',
	'Education',
	'Salary',
	'Investment',
	'Other',
]);

export const TransactionSchema = z.object({
	id: z.string(),
	description: z.string().min(1, 'Description is required').max(100),
	amount: z.number().positive('Amount must be positive'),
	category: TransactionCategorySchema,
	type: z.enum(['expense', 'income']),
	date: z.string(),
	timestamp: z.number(),
}) satisfies z.ZodType<Transaction>;

export const NewTransactionSchema = TransactionSchema.omit({
	id: true,
	timestamp: true,
});

export const BudgetSchema = z.object({
	id: z.string(),
	category: TransactionCategorySchema,
	limit: z.number().positive('Limit must be positive'),
	month: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid month format'),
}) satisfies z.ZodType<Budget>;

export const NewBudgetSchema = BudgetSchema.omit({ id: true });

export type NewTransactionInput = z.infer<typeof NewTransactionSchema>;
export type NewBudgetInput = z.infer<typeof NewBudgetSchema>;
