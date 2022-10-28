import axios from "axios";

const api = axios.create({
    baseURL: 'http://lojababybaby.com.br:21080'
})

export { api }