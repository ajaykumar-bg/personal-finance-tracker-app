import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import AppTabs from '@/components/app-tabs';
import { store } from '@/store';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	return (
		<ReduxProvider store={store}>
			<PaperProvider>
				<NavigationContainer
					theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
				>
					<AppTabs />
				</NavigationContainer>
			</PaperProvider>
		</ReduxProvider>
	);
}
