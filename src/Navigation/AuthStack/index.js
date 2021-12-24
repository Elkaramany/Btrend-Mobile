import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../../Screens/Home'
import SignIn from '../../Screens/Auth/SignIn/SignIn';
import Password from '../../Screens/Auth/SignIn/Password';
import EmailSignUp from '../../Screens/Auth/SignUp/SignUp'
import EmailPassword from '../../Screens/Auth/SignUp/Password'
import PersonalInfo from "../../Screens/Auth/SignUp/PersonalInfo";
import Genders from "../../Screens/Auth/SignUp/Genders"
import Categories from "../../Screens/Auth/SignUp/Categories";
import PhotosVideos from '../../Screens/Auth/SignUp/PhotosVideos'
import Location from '../../Screens/Auth/SignUp/Location'
import Ready from "../../Screens/Auth/SignUp/Ready";
import Phone from '../../Screens/Auth/SignUp/Phone'

import User from '../AppStack/BottomTab'

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
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Genders" component={Genders} />
      <Stack.Screen name="PhotosVideos" component={PhotosVideos} />
      <Stack.Screen name="Location" component={Location} />
      <Stack.Screen name="Ready" component={Ready} />
      <Stack.Screen name="Phone" component={Phone} />

      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
