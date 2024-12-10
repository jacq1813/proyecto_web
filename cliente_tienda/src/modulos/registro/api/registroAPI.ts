import axios from 'axios';

const registroApi = axios.create({
    baseURL: 'http://localhost:3001/api/registro'
})

export default registroApi;