import * as actionTypes from 'constants/user';

export const setUserInfo = userInfo => ({type: actionTypes.SET_USERINFO, userInfo});
export const setUserId = uid => ({type: actionTypes.SET_USERID, uid});
export const updateUserList = userList => ({type: actionTypes.UPDATE_USERLIST, userList});
export const updateMessages = messages => ({type: actionTypes.UPDATE_MESSAGE, messages});
export const clearMessages = () => ({type: actionTypes.CLEAR_MESSAGE});
