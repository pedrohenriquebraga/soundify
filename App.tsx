import React from "react";
import Routes from "./src/routes";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  Nunito_400Regular,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import {
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { ThemeControllerProvider } from "./src/contexts/theme";
import { PlayerProvider } from "./src/contexts/player";
import { BoardingProvider } from "./src/contexts/boarding";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
    Nunito_400Regular,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <BoardingProvider>
      <ThemeControllerProvider>
        <PlayerProvider>
          <StatusBar backgroundColor="#16171D" />
          <Routes />
        </PlayerProvider>
      </ThemeControllerProvider>
    </BoardingProvider>
  );
}
