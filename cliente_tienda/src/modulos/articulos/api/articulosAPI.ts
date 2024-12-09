import axios from 'axios';

const articulosApi = axios.create({
    baseURL: 'http://localhost:3001/api/articulos'
})

export default articulosApi;