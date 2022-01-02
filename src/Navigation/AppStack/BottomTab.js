import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";

import { Colors, ImagePath } from "../../Config";

import Search from "../../Screens/Search";
import Chat from "../../Screens/Chat";
import Profile from "../../Screens/Profile";

const BottomTab = createBottomTabNavigator();

export default () => {
    return (
        <BottomTab.Navigator
            initialRouteName={'Search'}
            screenOptions={{
                style: styles.customBottomtabsStyle,
                activeTintColor: Colors.secondary,
                inactiveTintColor: "gray",
                headerShown: false,
                unmountOnBlur: true
            }}
        >
            <BottomTab.Screen
                name={'Search'}
                component={Search}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Image
                                style={{
                                    tintColor: focused ? Colors.secondary : Colors.blackOpacity30,
                                }}
                                source={ImagePath.search}
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
