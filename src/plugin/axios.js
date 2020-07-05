import axios from 'axios';
import {
    message
} from 'ant-design-vue'


// 请求拦截
axios.interceptors.request.use(config => {
    message.loading("加载中",500)
    const token = sessionStorage.getItem('token');
    if (token)
        config.headers.Authorization = token;
    return config;

}, error => {
    return Promise.reject(error);
})


// //响应拦截
axios.interceptors.response.use(response => {
    return response;
}, error => {
    message.error(error.response.data);
    const status = error.response.status;
    if (status === 401) {
        message.error("登录超时，请重新登录"); //token过期登录超时

        sessionStorage.removeItem('token');
        this.$routes.push('/login');
    }
    return Promise.reject(error);
})

// axios.defaults.headers.post['Content-Type'] = ['application/x-www-form-urlencoded', 'application/form-data'];
// axios.defaults.timeout = 1000 * 10;
// axios.defaults.withCredentials = true;
// // axios.defaults.baseURL = "http://api.cirev.cn"
// axios.defaults.baseURL = "http://localhost:9000"



export default axios.create({
    baseURL: "http://api.cirev.cn"
    // baseURL:'http://localhost:9000'
})