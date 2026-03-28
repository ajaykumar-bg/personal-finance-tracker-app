import { TransactionCategory } from '@/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';

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

interface CategoryFilterProps {
	selected: TransactionCategory | null;
	onSelect: (category: TransactionCategory | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
	selected,
	onSelect,
}) => {
	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.content}
			>
				<Chip
					selected={selected === null}
					onPress={() => onSelect(null)}
					style={styles.chip}
				>
					All
				</Chip>
				{CATEGORIES.map((category) => (
					<Chip
						key={category}
						selected={selected === category}
						onPress={() => onSelect(selected === category ? null : category)}
						style={styles.chip}
					>
						{category}
					</Chip>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
	content: {
		paddingHorizontal: 12,
		gap: 8,
	},
	chip: {
		marginRight: 4,
	},
});
