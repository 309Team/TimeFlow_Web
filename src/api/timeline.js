import http from '../utils/request.js'

// 获取用户信息
export const GetDayEvent = (date) => {
    const path = "/event/te/" + date
    return http.get(path, {headers: {'Authorization': localStorage.getItem('token')}}, )
}
