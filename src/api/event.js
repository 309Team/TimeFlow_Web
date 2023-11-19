import http from '../utils/request.js'

//get
export const GetTe = (data) => {
    return http.get('/event/te/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const GetMe = (data) => {
    return http.get('/event/me/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const GetLe = (data) => {
    return http.get('/event/le/' + data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

//post
export const PostTe = (data) => {
    return http.post('/event/te', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const PostMe = (data) => {
    return http.post('/event/me', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const PostLe = (data) => {
    return http.post('/event/le', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

//patch
export const PatchTe = (data) => {
    return http.patch('/event/te', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const PatchMe = (data) => {
    return http.patch('/event/me', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const PatchLe = (data) => {
    return http.patch('/event/le', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

//delete
export const DeleteTe = (data) => {
    return http.delete('/event/te', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const DeleteMe = (data) => {
    return http.delete('/event/me', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export const DeleteLe = (data) => {
    return http.delete('/event/le', data, { headers: { 'Authorization': localStorage.getItem('token') } })
}