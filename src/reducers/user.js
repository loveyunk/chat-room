import io from 'socket.io-client';

import * as actionTypes from 'constants/user';

const initialState = {
    uid: '',
    username: '', // 用户名
    sex: '', // 性别
    userList: {},
    messages: [],
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
        default:
            return state
    }
};
