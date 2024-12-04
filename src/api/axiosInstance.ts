import axios from 'axios';

const API_URL = import.meta.env.VITE_API_KEY;

export const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
