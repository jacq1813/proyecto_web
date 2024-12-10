import axios from 'axios';

const ventasApi = axios.create({
    baseURL: 'http://localhost:3001/api/ventas'
})

export default ventasApi;