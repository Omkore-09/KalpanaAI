import axios from "axios"

const BASE_URL = 'https://kalpana-chitra-backend.vercel.app/api'

export const api = axios.create({
    baseURL : BASE_URL,
})