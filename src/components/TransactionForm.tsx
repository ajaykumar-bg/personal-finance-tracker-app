import { TransactionCategory, TransactionType } from '@/types';
import { NewTransactionSchema } from '@/types/schemas';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, TextInput } from 'react-native-paper';

interface TransactionFormProps {
	onSubmit: (data: {
		description: string;
		amount: number;
		category: TransactionCategory;
		type: TransactionType;
		date: string;
	}) => Promise<void>;
	isLoading?: boolean;
	initialData?: {
		description: string;
		amount: string;
		category: TransactionCategory;
		type: TransactionType;
		date: string;
	};
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
	onSubmit,
	isLoading = false,
	initialData,
}) => {
	const [description, setDescription] = useState(
		initialData?.description || '',
	);
	const [amount, setAmount] = useState(initialData?.amount || '');
	const [category, setCategory] = useState<TransactionCategory>(
		initialData?.category || 'Food',
	);
	const [date, setDate] = useState(
		initialData?.date || new Date().toISOString().split('T')[0],
	);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const handleSubmit = async () => {
		try {
			setErrors({});

			const data = {
				description,
				amount: parseFloat(amount),
				category,
				type,
				date,
			};

			NewTransactionSchema.parse(data);
			await onSubmit(data);
		} catch (error: any) {
			if (error.issues) {
				const newErrors: Record<string, string> = {};
				error.issues.forEach((issue: any) => {
					newErrors[issue.path[0]] = issue.message;
				});
				setErrors(newErrors);
			} else {
				setErrors({ submit: 'Failed to create transaction' });
			}
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				label='Description'
				value={description}
				onChangeText={setDescription}
				placeholder='Enter description'
				error={!!errors.description}
				style={styles.input}
			/>
			{errors.description && (
				<Text type='error' style={styles.errorText}>
					{errors.description}
				</Text>
			)}

			<TextInput
				label='Amount'
				value={amount}
				onChangeText={setAmount}
				placeholder='0.00'
				keyboardType='decimal-pad'
				error={!!errors.amount}
				style={styles.input}
			/>
			{errors.amount && (
				<Text type='error' style={styles.errorText}>
					{errors.amount}
				</Text>
			)}

			<SegmentedButtons
				value={type}
				onValueChange={(value) => setType(value as TransactionType)}
				buttons={[
					{ value: 'expense', label: 'Expense' },
					{ value: 'income', label: 'Income' },
				]}
				style={styles.segmented}
			/>

			<TextInput
				label='Category'
				value={category}
				disabled
				onMessagePress={() => {}}
				style={styles.input}
			/>

			<TextInput
				label='Date (YYYY-MM-DD)'
				value={date}
				onChangeText={setDate}
				placeholder='2024-01-01'
				error={!!errors.date}
				style={styles.input}
			/>
			{errors.date && (
				<Text type='error' style={styles.errorText}>
					{errors.date}
				</Text>
			)}

			{errors.submit && (
				<Text type='error' style={styles.errorText}>
					{errors.submit}
				</Text>
			)}

			<Button
				mode='contained'
				onPress={handleSubmit}
				loading={isLoading}
				disabled={isLoading}
				style={styles.button}
			>
				{initialData ? 'Update' : 'Add'} Transaction
			</Button>
		</View>
	);
};

// Placeholder Text component - we'll use Paper's Text in actual implementation
const Text: React.FC<{ children: string; type?: string; style?: any }> = ({
	children,
	style,
}) => (
	<TextInput
		value={children}
		editable={false}
		style={[{ color: 'red' }, style]}
	/>
);

const styles = StyleSheet.create({
	container: {
		gap: 12,
		padding: 16,
	},
	input: {
		marginBottom: 4,
	},
	segmented: {
		marginVertical: 8,
	},
	button: {
		marginTop: 8,
	},
	errorText: {
		fontSize: 12,
		color: 'red',
		marginBottom: 4,
	},
});
