import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import MusicPlayer from "../screens/MusicPlayer";

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <StackRoutes.Navigator screenOptions={{ headerShown: false }}>
      <StackRoutes.Screen name="Home" component={Home} />
      <StackRoutes.Screen name="MusicPlayer" component={MusicPlayer} />
    </StackRoutes.Navigator>
  );
};

export default AppRoutes;
