import http from '../utils/request.js'

// 获取用户信息
export const GetUserInfo = () => {
    return http.get('/user', {headers: {'Authorization': localStorage.getItem('token')}})
}

// 修改用户名
export const UpdateUserInfo = (data) => {
    return http.patch('/user', data, { headers: {'Authorization': localStorage.getItem('token')}})
}