import React, { useCallback } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { store, persistor } from "./src/store";
import { theme } from "./src/styles/theme";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";
import Toast from 'react-native-toast-message';
import toastConfig from "./src/components/ToastConfig";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-BoldItalic": require("./assets/fonts/Ubuntu-BoldItalic.ttf"),
    "Ubuntu-Italic": require("./assets/fonts/Ubuntu-Italic.ttf"),
    "Ubuntu-Light": require("./assets/fonts/Ubuntu-Light.ttf"),
    "Ubuntu-LightItalic": require("./assets/fonts/Ubuntu-LightItalic.ttf"),
    "Ubuntu-Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
    "Ubuntu-MediumItalic": require("./assets/fonts/Ubuntu-MediumItalic.ttf"),
    "Ubuntu-Regular": require("./assets/fonts/Ubuntu-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <Toast config={toastConfig}  />
          </PaperProvider>
        </PersistGate>
      </ReduxProvider>
    </View>
  );
}
