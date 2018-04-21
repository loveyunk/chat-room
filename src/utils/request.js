import axios from 'axios';
import config from './config';

const {BASE_URL} = config;

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
};

// 1. 检查http状态码
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    // 抛出错误，handleError接收
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

// 2. 处理后端错误码
export function handleErrorCode(res) {
    return res;
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 将对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
    if (obj == null) return;
    const esc = encodeURIComponent;
    return Object
        .keys(obj)
        .map(k => esc(k) + '=' + esc(obj[k]))
        .join('&');
}

export default function request({method, url, data}) {
    if (/get/i.test(method)) {
        return axios.get(data ? url + `?${obj2params(data)}` : url)
            .then(checkStatus)
            .then(handleErrorCode);
    } else if (/post/i.test(method)) {
        return axios({
            method: 'POST',
            url,
            data
        })
            .then(checkStatus)
            .then(handleErrorCode);
    }
}
