// import http from '../utils/http'
import request from '@/utils/request'



//post请求 获取todo列表
export function getProjectsList(data){
    return request.post(`/list`,data)
}

// 新增一个todo
export function addProjects(data){
    return request.post(`/add`,data)
}



//get请求
export function getProjectsList2(params){
    return request.get(`/list`,{params})
}



//put请求
export function getProjectsList3(data){
    return request.put(`/list`,data)
}


//delete请求
export function getProjectsList4(data){
    return request.delete(`/list`,data)
}




// let request = "/testIp/request"
//get请求
// export function getProjectsList(params){
//     return http.get(`/getProjectsList.json`,params)
// }



// //post请求
// export function postProjectsList(params){
//     return http.get(`/postProjectsList.json`,params)
// }
// //put请求
// export function putProjectsList(params){
//     return http.get(`/putProjectsList.json`,params)
// }
// //delete请求
// export function deleteProjectsList(params){
//     return http.delete(`/deleteProjectsList.json`,params)
// }


