import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useBoarding } from "../contexts/boarding";
import AppRoutes from "./app.routes";
import BoardingRoutes from "./boarding.routes";

const Routes: React.FC = () => {

  const { onBoarded } = useBoarding()

  return (
    <NavigationContainer>
      {onBoarded ? <AppRoutes /> : <BoardingRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
