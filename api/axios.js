// 对axios类 进行二次封装
import axios from 'axios'
import config from '../config'

// 对当前环境变量进行一个判断生产或是开发
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev :  config.baseUrl.pro

// ES6语法class，得到接口请求
class HttpRequest {
    // 初始化
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    // 定义axios的相关配置
    getInsideConfig() {
        const config ={
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    
    interceptors (instance){
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            console.log(response,'response')
            // 2xx 范围内的状态码都会触发该函数。
            // 对响应数据做点什么
            return response;
        }, function (error) {
            console.log(error,'error')
            // 超出 2xx 范围的状态码都会触发该函数。
            // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    //请求的函数
    request(options) {
        const instance = axios.create()
        // ... 解构
        options = { ...this.getInsideConfig(), ...options}
        this.interceptors(instance)
        return instance(options)
    }
}

//  暴露类的实例
export default new HttpRequest(baseUrl)