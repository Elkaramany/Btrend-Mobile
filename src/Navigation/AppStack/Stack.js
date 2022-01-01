import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import User from './BottomTab'
import UserProfile from '../../Screens/Search/UserProfile'
import UserChat from "../../Screens/Chat/UserChat";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'User'}
        >
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="UserChat" component={UserChat} />
        </Stack.Navigator>
    );
};