import { useAppSelector } from '@/hooks/useRedux';
import { formatCurrency } from '@/utils/currency';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface StatItem {
	label: string;
	value: number;
	color?: string;
}

interface StatsCardProps {
	stats: StatItem[];
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
	const currency = useAppSelector((state) => state.settings.currency);

	return (
		<Card style={styles.card}>
			<Card.Content>
				<View style={styles.container}>
					{stats.map((stat, index) => (
						<View key={index} style={styles.stat}>
							<Text variant='bodySmall' style={styles.label}>
								{stat.label}
							</Text>
							<Text
								variant='headlineMedium'
								style={[styles.value, stat.color && { color: stat.color }]}
							>
								{formatCurrency(stat.value, currency)}
							</Text>
						</View>
					))}
				</View>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		marginBottom: 16,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		gap: 12,
	},
	stat: {
		flex: 1,
		alignItems: 'center',
	},
	label: {
		opacity: 0.7,
		marginBottom: 4,
	},
	value: {
		fontWeight: 'bold',
	},
});
