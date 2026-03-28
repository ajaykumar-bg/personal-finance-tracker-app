import { useAppDispatch } from "@/hooks/useRedux";
import { storageService } from "@/services/storage";
import { initializeSettings } from "@/store/settingsSlice";
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";

import AppTabs from "@/components/app-tabs";
import { store } from "@/store";

function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadSettings = async () => {
      const currency = await storageService.getCurrency();
      dispatch(initializeSettings({ currency }));
    };
    loadSettings();
  }, [dispatch]);

  return <>{children}</>;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <NavigationContainer
          theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppInitializer>
            <AppTabs />
          </AppInitializer>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
