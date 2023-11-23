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
    return http.patch('/cls',data, { headers: { 'Authorization': localStorage.getItem('token') } })
}





export const listClass = (data) => {
    return http.post('/event/te/getclass', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

