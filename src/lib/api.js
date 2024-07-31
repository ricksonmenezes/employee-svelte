import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8081', // Your Spring Boot server URL
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiService = {
    createEmployee(payload) {
        return api.post('/graphql', { query: payload });
    },
    // Add other API methods here
};

export default apiService;