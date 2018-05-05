import {request, config} from 'utils';

const {api} = config;
const {loginApi, registerApi, userInfo, token, avatar} = api;

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

// 获取用户信息
export function getUserInfo(params) {
    return request({
        method: 'get',
        url: userInfo,
        data: params
    });
}

// 从七牛云获取上传token
export function getUploadToken(params) {
    return request({
        method: 'get',
        url: token,
        data: params
    });
}

// 更新头像
export function updateAvatar(params) {
    return request({
        method: 'post',
        url: avatar,
        data: params
    });
}
