import axios from 'axios';

const comprasApi = axios.create({
    baseURL: 'http://localhost:3001/api/compras'
})

export default comprasApi;