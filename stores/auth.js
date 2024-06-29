import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: process.client ? localStorage.getItem('token') || '' : '',
    refreshToken: process.client ? localStorage.getItem('refreshToken') || '' : '',
    userId: process.client ? localStorage.getItem('userId') || '' : '',
    isAuthenticated: process.client ? !!localStorage.getItem('token') : false,
  }),
  actions: {
    login(token, refreshToken) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.isAuthenticated = true;

      if (process.client) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
      }
    },
    logout() {
      this.token = '';
      this.refreshToken = '';
      this.userId = '';
      this.isAuthenticated = false;

      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
      }
    },
    async refreshToken() {
      if (!process.client) return null;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        this.logout();
        return null;
      }

      const nuxtApp = useNuxtApp();
      try {
        const response = await nuxtApp.$api.post('/auth/refresh-token', { refreshToken });
        const newToken = response.data.accessToken;
        this.login(newToken, refreshToken);
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
