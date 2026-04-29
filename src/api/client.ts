import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
