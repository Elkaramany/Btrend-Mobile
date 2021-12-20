import React from 'react'
import { View } from 'react-native'
import { Colors, IOS } from './src/Config/Constants';
import { getStatusBarHeight } from 'react-native-status-bar-height';

//Redux
import Redux from './src/Redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

//Navigation
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/Navigation/StackNavigator'

export default () => {
  const { Persistor, Store } = Redux

  return (
    <Provider store={Store}>
      <View style={{ flex: 1, backgroundColor: Colors.primary, paddingTop: IOS ? getStatusBarHeight() : 0 }}>
        <PersistGate persistor={Persistor}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </PersistGate>
      </View>
    </Provider>
  )
}