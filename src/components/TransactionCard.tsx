import { useAppSelector } from '@/hooks/useRedux';
import { Transaction } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { format } from 'date-fns';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

interface TransactionCardProps {
	transaction: Transaction;
	onEdit?: (transaction: Transaction) => void;
	onDelete?: (id: string) => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
	transaction,
	onEdit,
	onDelete,
}) => {
	const currency = useAppSelector((state) => state.settings.currency);
	const isIncome = transaction.type === 'income';
	const amountColor = isIncome ? '#4CAF50' : '#F44336';
	const amountPrefix = isIncome ? '+' : '-';
	const formattedAmount = `${amountPrefix}${formatCurrency(transaction.amount, currency)}`;

	return (
		<Card style={styles.card}>
			<Card.Content>
				<View style={styles.header}>
					<View style={styles.info}>
						<Text variant='bodyMedium' style={styles.description}>
							{transaction.description}
						</Text>
						<Text variant='bodySmall' style={styles.category}>
							{transaction.category}
						</Text>
						<Text variant='bodySmall' style={styles.date}>
							{format(new Date(transaction.date), 'MMM dd, yyyy')}
						</Text>
					</View>
					<Text
						variant='titleMedium'
						style={[styles.amount, { color: amountColor }]}
					>
						{formattedAmount}
					</Text>
				</View>
			</Card.Content>

			{(onEdit || onDelete) && (
				<Card.Actions style={styles.actions}>
					{onEdit && (
						<IconButton
							icon='pencil'
							size={18}
							onPress={() => onEdit(transaction)}
						/>
					)}
					{onDelete && (
						<IconButton
							icon='delete'
							size={18}
							iconColor='#F44336'
							onPress={() => onDelete(transaction.id)}
						/>
					)}
				</Card.Actions>
			)}
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 8,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	info: {
		flex: 1,
		marginRight: 12,
	},
	description: {
		fontWeight: '600',
		marginBottom: 4,
	},
	category: {
		fontSize: 12,
		opacity: 0.6,
		marginBottom: 2,
	},
	date: {
		fontSize: 12,
		opacity: 0.5,
	},
	amount: {
		fontWeight: 'bold',
	},
	actions: {
		justifyContent: 'flex-end',
	},
});
