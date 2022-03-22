import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import User from './BottomTab'
import UserProfile from '../../Screens/Feed/UserProfile'
import UserChat from "../../Screens/Chat/Chats/UserChat";
import Notifications from "../../Screens/Chat/Notifications";
import Report from "../../Screens/Chat/Chats/Report"
import Search from "../../Screens/Search";
import SinglePayment from "../../Screens/Dashboard/SinglePayment";
import CampaignDeal from "../../Screens/Collaborations/CampaignDeal"
import Price from "../../Screens/Feed/Price"
import Proposal from "../../Screens/Feed/Proposal";
import Submitted from "../../Screens/Feed/Proposal/Submitted";

import AddCampaign from './AddCampaignStack'

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'User'}
        >
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="SinglePayment" component={SinglePayment} />
            <Stack.Screen name="CampaignDeal" component={CampaignDeal} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Price" component={Price} />
            <Stack.Screen name="Proposal" component={Proposal} />
            <Stack.Screen name="Submitted" component={Submitted} />
            <Stack.Screen name="UserChat" component={UserChat} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Report" component={Report} />
            <Stack.Screen name="AddCampaign" component={AddCampaign} />
        </Stack.Navigator>
    );
};