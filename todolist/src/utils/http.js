import request from './request'

const http ={
    getProjectsList(url,params){
        const config = {
            method: 'get',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    posrProjectsList(url,params){
        const config = {
            method: 'post',
            url:url
        }
        if(params) config.data = params
        return request(config)
    },
    put(url,params){
        const config = {
            method: 'put',
            url:url
        }
        if(params) config.params = params
        return request(config)
    },
    delete(url,params){
        const config = {
            method: 'delete',
            url:url
        }
        if(params) config.params = params
        return request(config)
    }
}

//导出
export default http