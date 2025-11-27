import apiCall, { setAuthToken } from './api';

export const signup = async (name, email, password) => {
    const data = await apiCall('/signup', 'POST', { name, email, password });
    setAuthToken(data.token);
    return data;
};

export const login = async (email, password) => {
    const data = await apiCall('/login', 'POST', { email, password });
    setAuthToken(data.token);
    return data;
};