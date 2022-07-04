import axios from 'axios'
import qs from 'qs'
//创建AXIOS
const service = axios.create({
    //公共接口
    baseURL: process.env.VUE_APP_BASEAPI,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [function (data, config) {
        if (config['Content-Type'] == "application/json") return JSON.stringify(data)
        return qs.stringify(data, { arrayFormat: 'brackets' })
    }],
    timeout: 3* 1000
})
//请求拦截器
service.interceptors.request.use(config => {
    // config.data = JSON.stringify(config.data);  //数据转换
    return config

}, error => {
    Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(response => {
    return response
}, error => {
    // resfuls api 在这里处理状态
    // 接受到异常相应的处理开始
    if (error && error.response){
        switch (error.response.status){
            case 400:
                //错误请求
                
                break;
            case 401:
                //未授权

                break;
            case 403:
                //拒绝访问

                break;
            case 404:
                //NotFound

            break;
            case 405:
                //请求方法未允许

            break;
            case 408:
                //请求超时

            break;
            case 500:
                //服务器端出错

            break;
            case 501:
                //网络未实现

            break;
            case 502:
                //网络错误

            break;
            case 503:
                //服务不可用

            break;
            case 504:
                //网络超时

            break;
            case 505:
                //http版本不支持该请求

            break;
            default:
                //连接错误

        }
    }else{
        //超时处理
        if (JSON.stringify(error).includes('timeout')){
            // 服务器响应超时，刷新当前页
        }
        // 连接服务器失败
    }

    //处理结束
    return Promise.resolve(error.response)
})

//导入文件
export default service