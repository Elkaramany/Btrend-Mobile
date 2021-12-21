import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Screens/Home'
import SignIn from '../Screens/Auth/SignIn/SignIn';
import Password from '../Screens/Auth/SignIn/Password';
import EmailSignUp from '../Screens/Auth/SignUp/SignUp'
import EmailPassword from '../Screens/Auth/SignUp/Password'
import PersonalInfo from "../Screens/Auth/SignUp/PersonalInfo";
import Genders from "../Screens/Auth/SignUp/Genders"

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
      <Stack.Screen name="EmailPassword" component={EmailPassword} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="Genders" component={Genders} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
