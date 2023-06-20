import React from 'react';
import { createStackNavigator } from "@react-navigation/stack"
import Welcome from '../screens/OnBoarding/Welcome';
import Permissions from '../screens/OnBoarding/Permissions';

const StackRoutes = createStackNavigator()

const BoardingRoutes: React.FC = () => {
  return <StackRoutes.Navigator screenOptions={{ headerShown: false }} >
    <StackRoutes.Screen name="Welcome" component={Welcome} />
    <StackRoutes.Screen name="Permissions" component={Permissions} />
  </StackRoutes.Navigator>;
}

export default BoardingRoutes;