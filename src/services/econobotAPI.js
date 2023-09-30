import axios from 'axios';

const econoAPI = axios.create({
    baseURL:'http://localhost:3005/api',
});

export default econoAPI;