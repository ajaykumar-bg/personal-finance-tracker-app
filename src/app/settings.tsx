import { CURRENCIES } from '@/data/currencies';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { storageService } from '@/services/storage';
import { setCurrency } from '@/store/settingsSlice';
import { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Appbar, Card, RadioButton, Text } from 'react-native-paper';

export default function SettingsScreen({ navigation }: any) {
	const dispatch = useAppDispatch();
	const selectedCurrency = useAppSelector((state) => state.settings.currency);

	useEffect(() => {
		const loadCurrency = async () => {
			const currency = await storageService.getCurrency();
			dispatch(setCurrency(currency));
		};
		loadCurrency();
	}, [dispatch]);

	const handleCurrencyChange = async (currencyCode: string) => {
		const currency = CURRENCIES[currencyCode];
		if (currency) {
			dispatch(setCurrency(currency));
			try {
				await storageService.setCurrency(currency);
			} catch (error) {
				console.error('Error saving currency:', error);
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title='Settings' />
			</Appbar.Header>

			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				{/* Currency Selection */}
				<Card style={styles.card}>
					<Card.Content>
						<Text variant='titleMedium' style={styles.sectionTitle}>
							Preferred Currency
						</Text>
						<Text variant='bodySmall' style={styles.description}>
							Select your preferred currency for displaying transaction amounts
						</Text>

						{Object.values(CURRENCIES).map((currency) => (
							<View key={currency.code} style={styles.optionRow}>
								<View style={styles.currencyInfo}>
									<Text variant='bodyMedium'>
										{currency.symbol} {currency.name}
									</Text>
									<Text variant='bodySmall' style={styles.currencyCode}>
										{currency.code}
									</Text>
								</View>
								<RadioButton
									value={currency.code}
									status={
										selectedCurrency.code === currency.code
											? 'checked'
											: 'unchecked'
									}
									onPress={() => handleCurrencyChange(currency.code)}
								/>
							</View>
						))}
					</Card.Content>
				</Card>

				{/* Current Selection Info */}
				<Card style={styles.card}>
					<Card.Content>
						<Text variant='titleMedium' style={styles.sectionTitle}>
							Current Selection
						</Text>
						<View style={styles.infoBox}>
							<Text variant='headlineSmall'>{selectedCurrency.symbol}</Text>
							<Text variant='bodyMedium'>{selectedCurrency.name}</Text>
							<Text variant='bodySmall' style={styles.currencyCode}>
								Code: {selectedCurrency.code}
							</Text>
						</View>
					</Card.Content>
				</Card>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		padding: 16,
	},
	card: {
		marginBottom: 16,
	},
	sectionTitle: {
		marginBottom: 8,
		fontWeight: 'bold',
	},
	description: {
		marginBottom: 12,
		opacity: 0.7,
	},
	optionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#EEEEEE',
	},
	currencyInfo: {
		flex: 1,
	},
	currencyCode: {
		opacity: 0.6,
		marginTop: 4,
	},
	infoBox: {
		backgroundColor: '#F5F5F5',
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
	},
});
