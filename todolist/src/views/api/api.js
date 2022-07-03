import http from '../utils/http'
let request = "/testIp/request"
//get请求
export function getProjectsList(params){
    return http.get(`${request}/getProjectsList.json`,params)
}
//post请求
export function postProjectsList(params){
    return http.get(`${request}/postProjectsList.json`,params)
}
//put请求
export function putProjectsList(params){
    return http.get(`${request}/putProjectsList.json`,params)
}
//delete请求
export function deleteProjectsList(params){
    return http.delete(`${request}/deleteProjectsList.json`,params)
}


