import { combineReducers } from 'redux';
import itemsReducer from './modules/items';
import profileReducer from './modules/profile';
import authReducer from './modules/auth';

export default combineReducers({
    auth: authReducer,
    itemsData: itemsReducer,
    profileData: profileReducer
});
