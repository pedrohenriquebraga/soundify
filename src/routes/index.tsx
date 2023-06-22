import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useBoarding } from "../contexts/boarding";
import AppRoutes from "./app.routes";
import BoardingRoutes from "./boarding.routes";
import { useTheme } from "styled-components";

const Routes: React.FC = () => {

  const { onBoarded } = useBoarding()
  const { colors } = useTheme()

  return (
    <NavigationContainer theme={{
      ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background }
    }}>
      {onBoarded ? <AppRoutes /> : <BoardingRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
