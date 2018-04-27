import * as actionTypes from 'constants/user';

export const setUserInfo = userInfo => ({type: actionTypes.SET_USERINFO, userInfo});
export const setUserId = uid => ({type: actionTypes.SET_USERID, uid});
export const updateUserList = userList => ({type: actionTypes.UPDATE_USERLIST, userList});
export const updateMessages = messages => ({type: actionTypes.UPDATE_MESSAGE, messages});
export const clearMessages = () => ({type: actionTypes.CLEAR_MESSAGE});
export const setOnlineNums = onlineNums => ({type: actionTypes.SET_ONLINENUMS, onlineNums});
export const setSex = sex => ({type: actionTypes.SET_SEX, sex});
export const setIdentity = identity => ({type: actionTypes.SET_IDENTITY, identity});
export const leaveChatRoom = () => ({type: actionTypes.LEAVE_CHATROOM});
