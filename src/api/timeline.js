import http from '../utils/request.js'

export const LoginRequest = (data) => {
    return http.post('/login',data)
}
