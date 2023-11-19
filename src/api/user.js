import http from '../utils/request.js'

// 获取用户信息
export const GetUserInfo = () => {
    return http.get('/user', { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 修改用户名
export const UpdateUserInfo = (data) => {
    return http.patch('/user', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 修改用户密码
export const UpdateUserPassWord = (data) => {
    return http.patch('/user/pw', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 注销用户相关
// 1. 验证密码
export const VerifyPassWord = (data) => {
    return http.post('/user/pw', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 2. 删除用户
export const DeleteUser = (data) => {
    return http.post('/user', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}   