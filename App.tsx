import React from 'react'
import { View, LogBox } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SplashScreen from "react-native-splash-screen";

import { Colors, IOS } from './src/Config/Constants';

//Redux
import Redux from './src/Redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

//Navigation
import Navigator from './src/Navigation/index'

export default () => {

  React.useEffect(() => {
    //Hide the splash screen after 1.5 seconds
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500)
  }, []);

  //Redux and navigation basic setup
  return (
    <Provider store={Redux['Store']}>
      <View style={{ flex: 1, backgroundColor: Colors.primary, paddingTop: IOS ? getStatusBarHeight() : 0 }}>
        <PersistGate persistor={Redux['Persistor']}>
          <Navigator />
        </PersistGate>
      </View>
    </Provider>
  )
}