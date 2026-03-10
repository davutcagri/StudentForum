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

export const getAllUsers = () => {
    return api.get("/user/all", {withCredentials: true});
}

export const logout = () => {
    return api.post("/user/logout", {withCredentials: true});
}

export const sendPost = (body) => {
    return api.post("/post/save", body, {withCredentials: true});
}

export const getPosts = () => {
    return api.get("/post/getAll", {withCredentials: true});
}