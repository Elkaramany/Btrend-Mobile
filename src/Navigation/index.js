import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import Toast from 'react-native-toast-message'

import AuthStack from './AuthStack'
import AppStack from './AppStack/Stack'
import { useSelector } from 'react-redux';

export default () => {
    const { token } = useSelector((state) => state.AuthReducer)

    return (
        <NavigationContainer>
            {token ? <AppStack /> : <AuthStack />}
            <Toast />
        </NavigationContainer>
    );
};