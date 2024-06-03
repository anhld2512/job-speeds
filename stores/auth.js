import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('token'), // Kiểm tra token trong localStorage
    isAuthenticated: !!localStorage.getItem('token'), // Kiểm tra trạng thái đăng nhập từ token trong localStorage
    userId: localStorage.getItem('userId')
  }),
  actions: {
    login(token) {
      this.token = token;
      this.isAuthenticated = true;
    },
    logout() {
      localStorage.removeItem('token'); // Xóa token từ localStorage khi đăng xuất
      this.token = null;
      this.isAuthenticated = false;
    },
    signUp(token) {
      this.token = token;
      this.isAuthenticated = true;
    },
  }
});
