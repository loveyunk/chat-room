import {request, config} from 'utils';

const {api} = config;
const {loginApi, registerApi} = api;

// 登录
export function login(params) {
    return request({
        method: 'post',
        url: loginApi,
        data: params
    });
}

// 注册
export function register(params) {
    return request({
        method: 'post',
        url: registerApi,
        data: params
    });
}
