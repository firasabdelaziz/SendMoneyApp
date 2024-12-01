import React, { useCallback } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./src/styles/theme";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, Text } from "react-native";
import Toast from 'react-native-toast-message';
import toastConfig from "./src/components/ToastConfig";

// Prevent the splash screen from auto hiding until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function App() {

    // Hook to load custom fonts from the assets
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

  // Callback to hide splash screen once the fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // If fonts are still loading, show a loading screen
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

  // Main app layout after fonts have loaded
  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <Toast config={toastConfig}  />
          </PaperProvider>
    </View>
  );
}
