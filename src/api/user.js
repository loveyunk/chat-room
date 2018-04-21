import {request, config} from 'utils';

const {api} = config;
const {loginApi} = api;

// 获取文章详情
export function login(params) {
    return request({
        method: 'post',
        url: loginApi,
        data: params
    });
}
