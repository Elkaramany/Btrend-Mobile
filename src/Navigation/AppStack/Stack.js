import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import User from './BottomTab'
import UserProfile from '../../Screens/Search/UserProfile'

const Stack = createStackNavigator();

const AppStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'User'}
        >
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
        </Stack.Navigator>
    );
};

export default AppStackNavigator;