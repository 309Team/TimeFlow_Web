import http from '../utils/request.js'

// 获取一天内的事项列表
export const GetDayTEvent = (date) => {
    const path = "/event/te/getday/" + date
    return http.get(path, { headers: { 'Authorization': localStorage.getItem('token') } },)
}
