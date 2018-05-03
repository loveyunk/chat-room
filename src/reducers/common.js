import * as actionTypes from 'constants/common';

export function sidebarVisible(state = true, action) {
    switch (action.type) {
        case actionTypes.SHOW_SIDEBAR:
            return true;
        case actionTypes.HIDE_SIDEBAR:
            return false;
        default:
            return state;
    }
}
