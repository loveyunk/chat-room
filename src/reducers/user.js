import * as actionTypes from 'constants/user';
import io from 'socket.io-client';

const initialState = {
    uid: '',
    username: '', // 用户名
    sex: '', // 性别
    userList: {},
    messages: [],
    onlineNums: 0,
    identity: 0, // 0 注册用户 1 游客
    socket: io()
};

export const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERINFO:
            return Object.assign({}, state, action.userInfo);
        case actionTypes.SET_USERID:
            return Object.assign({}, state, {uid: action.uid});
        case actionTypes.UPDATE_USERLIST:
            return Object.assign({}, state, {userList: action.userList});
        case actionTypes.UPDATE_MESSAGE:
            return Object.assign({}, state, {messages: [...state.messages, action.messages]});
        case actionTypes.CLEAR_MESSAGE:
            return Object.assign({}, state, {messages: []});
        case actionTypes.SET_ONLINENUMS:
            return Object.assign({}, state, {onlineNums: action.onlineNums});
        case actionTypes.SET_SEX:
            return Object.assign({}, state, {sex: action.sex});
        case actionTypes.SET_IDENTITY:
            return Object.assign({}, state, {identity: action.identity});
        default:
            return state
    }
};
