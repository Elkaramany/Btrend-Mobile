import React from 'react'
import { View, NativeModules } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Toast from 'react-native-toast-message'
import SplashScreen from "react-native-splash-screen";

import { Colors, IOS } from './src/Config/Constants';

//Redux
import Redux from './src/Redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/Navigation/AuthStack'

export default () => {

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000)
  }, []);

  return (
    <Provider store={Redux['Store']}>
      <View style={{ flex: 1, backgroundColor: Colors.primary, paddingTop: IOS ? getStatusBarHeight() : 0 }}>
        <PersistGate persistor={Redux['Persistor']}>
          <NavigationContainer>
            <StackNavigator />
            <Toast />
          </NavigationContainer>
        </PersistGate>
      </View>
    </Provider>
  )
}