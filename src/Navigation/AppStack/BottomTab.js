import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { Colors, ImagePath } from "../../Config";

import Feed from "../../Screens/Feed"
import Chat from "../../Screens/Chat";
import Profile from "../../Screens/Profile";

const BottomTab = createBottomTabNavigator();

export default () => {
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
                                style={{
                                    tintColor: focused ? Colors.secondary : Colors.blackOpacity30,
                                }}
                                source={ImagePath.feed}
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
                                style={{
                                    tintColor: focused ? Colors.secondary : Colors.blackOpacity30,
                                }}
                                source={ImagePath.chat}
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
                                style={{
                                    tintColor: focused ? Colors.secondary : Colors.blackOpacity30,
                                }}
                                source={ImagePath.profile}
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
