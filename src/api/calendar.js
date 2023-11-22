import http from '../utils/request.js'

// 获取当月每一天的标签事项数
export const GetMonthLabelEvent = (data) => {
  return http.get('/event/le/month/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 获取当月每一天的时刻事项数
export const GetMonthMomentEvent = (data) => {
  return http.get('/event/me/month/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 获取当月每一天的时段事项数
export const GetMonthTimeEvent = (data) => {
  return http.get('/event/te/month/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 获取当年每一月的标签事项数
export const GetYearLabelEvent = (data) => {
  return http.get('/event/le/year/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 获取当年每一月的时刻事项数
export const GetYearMomentEvent = (data) => {
  return http.get('/event/me/year/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 获取当年每一月的时段事项数
export const GetYearTimeEvent = (data) => {
  return http.get('/event/me/year/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}
