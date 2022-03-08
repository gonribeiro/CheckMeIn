import axios from 'axios';

const { SERVER_IP } = process.env;

const api = axios.create({
    baseURL: SERVER_IP,
});

export { api };