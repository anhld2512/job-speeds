import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    refreshToken: '',
    userId: '',
    isAuthenticated: false,
  }),
  actions: {
    login(token, refreshToken, userId) {
      this.token = token;
      this.refreshToken = refreshToken;
      this.userId = userId;
      this.isAuthenticated = true;

      if (process.client) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
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
        this.login(newToken, refreshToken, this.userId);
        localStorage.setItem('token', newToken);
        return newToken;
      } catch (error) {
        console.error('Error refreshing token:', error);
        this.logout();
        return null;
      }
    },
    initializeStore() {
      if (process.client) {
        this.token = localStorage.getItem('token') || '';
        this.refreshToken = localStorage.getItem('refreshToken') || '';
        this.userId = localStorage.getItem('userId') || '';
        this.isAuthenticated = !!this.token;
      }
    }
  }
});
