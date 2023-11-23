import http from '../utils/request.js'



export const getClass = () => {
    return http.get('/cls', { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const addClass = (data) => {
    return http.post('/cls', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const deleteClass = (id) => {
    return http.delete('/cls/' + id, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const updataClass = (data) => {
    return http.patch('/cls', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}


export const listClass = (data) => {
    return http.post('/event/te/getclass', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 给事项添加分类
export const addClassToEvent = (data) => {
    return http.post('/grouping/event', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

// 给事项获取事项的分类
export const getClassOfEvent = (data) => {
    return http.get('/grouping/event/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}


