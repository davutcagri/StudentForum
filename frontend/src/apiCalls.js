import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/'
});

export const register = (body) => {
    return api.post('/user/save', body);
}

export const login = (body) => {
    return api.post('/user/auth', body, {withCredentials: true});
}

export const getCurrentUser = () => {
    return api.get("/user/me", {withCredentials: true});
}