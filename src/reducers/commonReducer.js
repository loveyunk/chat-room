// import io from 'socket.io-client';

import * as actionTypes from 'constants/commonConstants';

const initialState = {
    username: '',
    sex: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERINFO:
            return Object.assign({}, state, action.userInfo);
        default:
            return state
    }
}
