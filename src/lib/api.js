// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9898', // Adjust to your Spring Boot server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;