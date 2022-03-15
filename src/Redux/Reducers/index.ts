import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer'
import CampaignReducer from './CampaignReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
    AuthReducer,
    SearchReducer,
    CampaignReducer,
    ChatReducer,
})