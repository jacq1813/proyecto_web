import axios from 'axios';

const clientesApi = axios.create({
    baseURL: 'http://localhost:3001/api/clientes'
})

export default clientesApi;