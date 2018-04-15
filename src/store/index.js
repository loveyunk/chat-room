import {createStore, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from 'reducers';

const store = createStore(rootReducer, {}, composeWithDevTools());

// 使用chrome开发工具
export default store;
