import axios from 'axios';
import { useAuthStore } from '@/stores/auth'; // Điều chỉnh đường dẫn tùy theo cấu trúc dự án của bạn


export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig();
  const api = axios.create({
    baseURL: `${appConfig.apiURL.API}/api/`,
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
  // Đăng ký Service Worker và xử lý đăng ký thông báo đẩy
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/sw.js')
      .then(swReg => {
        console.log('Service Worker is registered', swReg);
  
        // Yêu cầu quyền hiển thị thông báo
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
            subscribeUser(swReg);
          }
        });
      })
      .catch(error => {
        console.error('Service Worker Error', error);
      });
  }

  function subscribeUser(swReg) {
    const applicationServerPublicKey = 'BN3yNCATt4zRMU-e5nFIjwMfJ5Gfp3fub6_DcDzphhFu3jbUh2J0QveqBeEVShj5D7afzAHehWx1RQsF9pDjaMU';
    const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey);
  
    swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    }).then(subscription => {
      console.log('User is subscribed:', subscription);
  
      // Gửi đăng ký đến máy chủ backend
      saveSubscription(subscription);
    }).catch(err => {
      console.log('Failed to subscribe the user: ', err);
    });
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i); // Sửa lỗi ở đây, đổi I thành i
    }
    return outputArray;
  }

  function saveSubscription(subscription) {
    api.post('/notifications/save-subscription', subscription)
      .then(() => console.log('Subscription saved successfully'))
      .catch(error => console.error('Failed to save subscription', error));
  }

  nuxtApp.provide('api', api); // Cung cấp api cho toàn bộ ứng dụng
});