import axios from 'axios';

const econoAPI = axios.create({
    baseURL:'http://localhost:3001',
});

export default econoAPI;