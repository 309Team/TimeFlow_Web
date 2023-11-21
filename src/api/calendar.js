import http from '../utils/request.js'

// 获取当月每一天的标签事项数
export const GetMonthLabelEvent = (data) => {
  return http.get('/event/le/month/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 获取当月每一天的时刻事项数
export const GetMonthMomentEvent = (data) => {
  return http.get('/event/me/month/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}