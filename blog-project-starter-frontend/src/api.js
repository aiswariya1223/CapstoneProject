// blog-project-starter-frontend/src/api.js
import axios from 'axios';

// Create an axios instance with the Bastion Host's Public IP and backend port
const API = axios.create({
    baseURL: 'http://43.204.141.76:5000/api' 
});

// Automatically attach JWT tokens if you implement authentication later
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;