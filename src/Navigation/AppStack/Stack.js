import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import User from './BottomTab'
import UserProfile from '../../Screens/Feed/UserProfile'
import UserChat from "../../Screens/Chat/UserChat";
import Report from "../../Screens/Chat/Report"
import Search from "../../Screens/Search";
import SinglePayment from "../../Screens/Dashboard/SinglePayment";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'User'}
        >
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SinglePayment" component={SinglePayment} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="UserChat" component={UserChat} />
            <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
    );
};