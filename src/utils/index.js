import request from './request';
import config from './config';
import cookie from './cookie';


// 判断参数是否是其中之一
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

export function getRandomNum() {
    let t = '';
    for (let i = 0; i < 8; i++) {
        t += Math.floor(Math.random() * 10);
    }
    return t;
}


export {request, config, cookie};
