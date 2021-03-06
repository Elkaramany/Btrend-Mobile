import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Reducers from './Reducers'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //Persist the AuthReducer to cache the user's logged in status
    whitelist: ['AuthReducer'],
}

const persistedReducer = persistReducer(persistConfig, Reducers)

const Store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(ReduxThunk)),
)

const Persistor = persistStore(Store)

const Redux = {Persistor, Store}

export default Redux