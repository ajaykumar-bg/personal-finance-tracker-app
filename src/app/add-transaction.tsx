import { useAppDispatch } from '@/hooks/useRedux';
import { storageService } from '@/services/storage';
import { setTransactions } from '@/store/transactionsSlice';
import { Transaction, TransactionCategory, TransactionType } from '@/types';
import { NewTransactionSchema } from '@/types/schemas';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import {
	Alert,
	Text as RCText,
	SafeAreaView,
	ScrollView,
	StyleSheet,
} from 'react-native';
import {
	Appbar,
	Button,
	SegmentedButtons,
	TextInput,
} from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';

const CATEGORIES: TransactionCategory[] = [
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
];

export default function AddTransactionScreen({ navigation, route }: any) {
	const dispatch = useAppDispatch();
	const transactionId = route?.params?.id;

	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [category, setCategory] = useState<TransactionCategory>('Food');
	const [type, setType] = useState<TransactionType>('expense');
	const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const loadTransaction = useCallback(async () => {
		try {
			const transactions = await storageService.getTransactions();
			const transaction = transactions.find((t) => t.id === transactionId);
			if (transaction) {
				setDescription(transaction.description);
				setAmount(transaction.amount.toString());
				setCategory(transaction.category);
				setType(transaction.type);
				setDate(transaction.date);
			}
		} catch (error) {
			console.error('Error loading transaction:', error);
			Alert.alert('Error', 'Failed to load transaction');
		}
	}, [transactionId]);

	useEffect(() => {
		if (transactionId) {
			// Load existing transaction for editing
			loadTransaction();
		}
	}, [transactionId, loadTransaction]);

	const handleSubmit = async () => {
		try {
			setErrors({});
			setLoading(true);

			const data = {
				description: description.trim(),
				amount: parseFloat(amount),
				category,
				type,
				date,
			};

			NewTransactionSchema.parse(data);

			let transaction: Transaction;

			if (transactionId) {
				// Update existing
				transaction = {
					...data,
					id: transactionId,
					timestamp: Date.now(),
				};
				await storageService.updateTransaction(transactionId, transaction);
			} else {
				// Create new
				transaction = {
					...data,
					id: uuidv4(),
					timestamp: Date.now(),
				};
				await storageService.addTransaction(transaction);
			}

			const transactions = await storageService.getTransactions();
			dispatch(setTransactions(transactions));

			Alert.alert(
				'Success',
				transactionId ? 'Transaction updated!' : 'Transaction added!',
			);
			navigation.goBack();
		} catch (error: any) {
			if (error.issues) {
				const newErrors: Record<string, string> = {};
				error.issues.forEach((issue: any) => {
					newErrors[issue.path[0]] = issue.message;
				});
				setErrors(newErrors);
			} else {
				Alert.alert('Error', 'Failed to save transaction');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content
					title={transactionId ? 'Edit Transaction' : 'Add Transaction'}
				/>
			</Appbar.Header>

			<ScrollView style={styles.content}>
				<TextInput
					label='Description'
					value={description}
					onChangeText={setDescription}
					placeholder='e.g., Grocery shopping'
					error={!!errors.description}
					style={styles.input}
				/>
				{errors.description && (
					<DummyText style={styles.errorText}>{errors.description}</DummyText>
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
					<DummyText style={styles.errorText}>{errors.amount}</DummyText>
				)}

				<DummyText style={styles.label}>Type</DummyText>
				<SegmentedButtons
					value={type}
					onValueChange={(value) => setType(value as TransactionType)}
					buttons={[
						{ value: 'expense', label: 'Expense' },
						{ value: 'income', label: 'Income' },
					]}
					style={styles.segmented}
				/>

				<DummyText style={styles.label}>Category</DummyText>
				<SegmentedButtons
					value={category}
					onValueChange={(value) => setCategory(value as TransactionCategory)}
					buttons={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
					style={styles.segmented}
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
					<DummyText style={styles.errorText}>{errors.date}</DummyText>
				)}

				<Button
					mode='contained'
					onPress={handleSubmit}
					loading={loading}
					disabled={loading}
					style={styles.submitButton}
				>
					{transactionId ? 'Update' : 'Add'} Transaction
				</Button>
			</ScrollView>
		</SafeAreaView>
	);
}

const DummyText = ({ children, style }: any) => (
	<RCText style={style}>{children}</RCText>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	input: {
		marginBottom: 4,
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		marginTop: 12,
		marginBottom: 8,
		opacity: 0.6,
	},
	errorText: {
		fontSize: 12,
		color: '#F44336',
		marginBottom: 8,
		marginTop: -2,
	},
	segmented: {
		marginBottom: 12,
	},
	submitButton: {
		marginTop: 16,
		paddingVertical: 6,
	},
});
