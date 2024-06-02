// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin(() => {
  const api = axios.create({
    // process.env.API_URL || 
    baseURL: 'https://api.jobspeeds.com'
  });

  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return {
    provide: {
      api
    }
  };
});
