import http from '../utils/request.js'


export const getClsStatistic = (startTime, overTime) => {
    return http.get('/sta/cls/' + startTime + "/" + overTime, { headers: { 'Authorization': localStorage.getItem('token') } })
}


export const getEvtStatistic = (startTime, overTime) => {
    return http.get('/sta/evt/'+ startTime + "/" + overTime, { headers: { 'Authorization': localStorage.getItem('token') } })
}