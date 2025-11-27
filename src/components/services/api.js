const API_URL = 'http://localhost:8080/api';

let authToken = null;

export const setAuthToken = (token) => {
    authToken = token;
};

export const getAuthToken = () => {
    return authToken;
};

export const clearAuthToken = () => {
    authToken = null;
};

const apiCall = async (endpoint, method = 'GET', body = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

export default apiCall;