import axios from 'axios';
import {
    message
} from 'ant-design-vue'
axios.defaults.headers.post['Content-Type'] = ['application/x-www-form-urlencoded', 'application/form-data'];
axios.defaults.timeout = 1000 * 10;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://api.cirev.cn"


//请求拦截
axios.interceptors.request.use(config => {
    const token = sessionStorage.getItem('eleToken');
    if (token)
        config.headers.Authorization = token;
    return config;

}, error => {
    return Promise.reject(error);
})


//响应拦截
axios.interceptors.response.use(response => {
    return response;
}, error => {
    endLoading();
    message.error(error.response.data);
    const status = error.response.status;
    if (status === 401) {
        message.error("登录超时，请重新登录"); //token过期登录超时

        sessionStorage.removeItem('eleToken');
        this.$routes.push('/login');
    }
    return Promise.reject(error);
})


export default axios