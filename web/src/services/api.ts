import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7789',
});

export default api;