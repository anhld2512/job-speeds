import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '', // Thêm refreshToken vào state
    userId: localStorage.getItem('userId') || '',
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  actions: {
    login(token, refreshToken) { // Cập nhật để nhận cả token và refreshToken
      this.token = token;
      this.refreshToken = refreshToken; // Lưu refreshToken
      this.isAuthenticated = true;
    },
    logout() {
      this.token = '';
      this.refreshToken = ''; // Xóa refreshToken
      this.userId = '';
      this.isAuthenticated = false;
    },
    async refreshToken() {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        this.logout();
        return null;
      }

      const nuxtApp = useNuxtApp(); // Lấy instance của Nuxt
      try {
        const response = await nuxtApp.$api.post('/auth/refresh-token', { refreshToken });
        const newToken = response.data.accessToken;
        this.login(newToken, refreshToken); // Gọi login với token mới và refreshToken cũ
        localStorage.setItem('token', newToken);
        return newToken;
      } catch (error) {
        console.error('Error refreshing token:', error);
        this.logout();
        return null;
      }
    }
  }
});