// 创建实例，并对外暴露，即可在外部使用
import axios from "axios";
import ElementUI from 'element-ui';
import router from "@/router";
// 封装一个axios实例
const http = axios.create({
    // 通用请求的地址前缀
    baseURL: 'http://localhost:8080',
    // 超时时间，单位为毫秒
    timeout: 10000,

})


// 拦截器绑定在实例上
// 请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做什么
    return config;
}, function (error) {
    // 对请求错误做什么
    return Promise.reject(error);
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做什么

    if (response.data.code === 4) {
        localStorage.removeItem('token')
        router.push('/login')
        ElementUI.Message({
            showClose: true,
            message: '登录过期，请重新登录',
            type: 'error'
        });
    }
    return response; 
}, function (error) {
    // 对响应错误做什么

    if (error.message.includes('timeout')) {
        ElementUI.Message({
            showClose: true,
            message: '请求超时',
            type: 'error'
        });
    }
    return Promise.reject(error);
})

// 对外暴露
export default http