import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; // Điều chỉnh đường dẫn tùy theo cấu trúc dự án của bạn

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: 'http://localhost:2024/api/',
    withCredentials: true
  });

  api.interceptors.request.use(config => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && error.response.data.error === 'jwt expired' && !originalRequest._retry) {
        originalRequest._retry = true;
        const authStore = useAuthStore(nuxtApp.$pinia); // Tham chiếu đến store với Nuxt context
        const newToken = await authStore.refreshToken();
        if (newToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );

  nuxtApp.provide('api', api); // Cung cấp api cho toàn bộ ứng dụng
});