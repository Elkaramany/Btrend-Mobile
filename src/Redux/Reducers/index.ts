import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer'
import ChatReducer from './ChatReducer';

export default combineReducers({
    AuthReducer,
    SearchReducer,
    ChatReducer,
})