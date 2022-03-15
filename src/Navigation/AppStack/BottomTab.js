import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

import { Colors, ImagePath } from "../../Config";

import Feed from "../../Screens/Feed"
import Dashboard from "../../Screens/Dashboard"
import Collaborations from "../../Screens/Collaborations"
import Chat from "../../Screens/Chat";
import Profile from "../../Screens/Profile";

const BottomTab = createBottomTabNavigator();

export default () => {
    const { userType } = useSelector((state) => state.AuthReducer)

    return (
        <BottomTab.Navigator
            initialRouteName={'Feed'}
            screenOptions={{
                style: styles.customBottomtabsStyle,
                activeTintColor: Colors.secondary,
                inactiveTintColor: "gray",
                headerShown: false,
            }}
        >
            <BottomTab.Screen
                name={"Feed"}
                component={Feed}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? ImagePath.feedFocus : ImagePath.feed}
                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name={"Dashboard"}
                component={Dashboard}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? ImagePath.dashboardFocus : ImagePath.dashboard}
                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name={"Collaborations"}
                component={Collaborations}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={{
                                    tintColor: focused && userType === "Brand" ? Colors.secondary : Colors.blackOpacity30,
                                    height: wp('10%'), width: wp('10%')
                                }}
                                source={userType === "Brand" ? focused ? ImagePath.campaignsFocus : ImagePath.campaigns : focused ? ImagePath.collaborationsFocus : ImagePath.collaborations}
                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name={'Chat'}
                component={Chat}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? ImagePath.chatFocus : ImagePath.chat}
                            />
                        );
                    },
                }}
            />
            <BottomTab.Screen
                name={'Profile'}
                component={Profile}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                source={focused ? ImagePath.profileFocus : ImagePath.profile}
                            />
                        );
                    },
                }}
            />
        </BottomTab.Navigator>
    );
};

const styles = StyleSheet.create({
    customBottomtabsStyle: {
        height: 50,
    },
});
