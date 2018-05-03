import {combineReducers} from 'redux';
import {userInfo} from './user';
import {sidebarVisible} from './common';

const rootReducer = combineReducers({
    userInfo,
    sidebarVisible
});

export default rootReducer;
