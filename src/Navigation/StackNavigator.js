import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Screens/Home'
import SignIn from '../Screens/Auth/SignIn';
import Password from '../Screens/Auth/Password';
import EmailSignUp from '../Screens/Auth/SignUp/EmailSignUp'

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'Home'}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
