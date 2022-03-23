import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../../Screens/Home'
import SignIn from '../../Screens/Auth/SignIn/SignIn';
import Password from '../../Screens/Auth/SignIn/Password';
import EmailSignUp from '../../Screens/Auth/SignUp/SignUp'
import PersonalInfo from "../../Screens/Auth/SignUp/PersonalInfo";
import Genders from "../../Screens/Auth/SignUp/Genders"
import Categories from "../../Screens/Auth/SignUp/Categories";
import ConnectSocial from '../../Screens/Auth/SignUp/ConnectSocial'
import Location from '../../Screens/Auth/SignUp/Location'
import Ready from "../../Screens/Auth/SignUp/Ready";
import Phone from '../../Screens/Auth/SignUp/Phone'
import Trouble from "../../Screens/Auth/SignIn/Trouble";

const Stack = createStackNavigator();

export default() => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'Home'}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Trouble" component={Trouble} />

      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Genders" component={Genders} />
      <Stack.Screen name="ConnectSocial" component={ConnectSocial} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Ready" component={Ready} />
      <Stack.Screen name="Phone" component={Phone} />
    </Stack.Navigator>
  );
};