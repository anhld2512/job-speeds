// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const api = axios.create({
    // process.env.API_URL || 
    baseURL: appConfig.apiURL.API
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
