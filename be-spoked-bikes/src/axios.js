import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44320'
});


// instance.interceptors.request...

export default instance;