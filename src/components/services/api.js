
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

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

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const text = await response.text();

        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch (parseError) {
            console.error('Failed to parse response:', text);
            throw new Error('Server returned invalid response');
        }

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

export default apiCall;