import CryptoJS from 'crypto-js'; // Import thư viện mã hóa

export const useAuth = () => {
  const appConfig = useAppConfig();
  const authStore = useAuthStore();
  const { $api } = useNuxtApp();
  const login = async (username, password) => {
    try {
      // Mã hóa mật khẩu trước khi gửi đến server
      const response = await $api.post('/auth/login', { username, password: password });
      const token = response.data.token;
      const userId = response.data.userId;
      // Giải mã token trước khi lưu vào store và localStorage
      authStore.login(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signup = async (username, password) => {
    try {
      // Mã hóa mật khẩu trước khi gửi đến server
  
      const response = await $api.post('/auth/signup', { username, password: password });
  
      if (response.status === 201) {
        const token = response.data.token;
  
        // Lưu token vào store và localStorage
        authStore.login(token);
        localStorage.setItem('token', token);
        return {
          result:true,
        };
      } else {
        console.error('Error:', response.data.message);
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  

  const logout = () => {
    authStore.logout();
    window.location.reload();
  };

  return {
    token: authStore.token,
    userId:authStore.userId,
    isAuthenticated:authStore.isAuthenticated,
    login,
    signup,
    logout
  };
};
