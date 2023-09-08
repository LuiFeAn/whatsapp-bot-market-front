import axios from 'axios';

const econoAPI = axios.create({
    baseURL:'http://localhost:3001',
    timeout:4000
});

export default econoAPI;