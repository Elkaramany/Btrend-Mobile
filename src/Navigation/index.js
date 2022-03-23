import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import Toast from 'react-native-toast-message'

import AuthStack from './AuthStack'
import AppStack from './AppStack/Stack'
import { useSelector } from 'react-redux';

export default () => {
    const { token } = useSelector((state) => state.AuthReducer)

    //Navigate users basedo n their auth status using the token received by the BE
    return (
        <NavigationContainer>
            {token ? <AppStack /> : <AuthStack />}
            <Toast />
        </NavigationContainer>
    );
};