import CryptoJS from 'crypto-js'; // Import thư viện mã hóa

export const useAuth = () => {
  const authStore = useAuthStore();
  const { $api } = useNuxtApp();

  const login = async (username, password) => {
    try {
      // Mã hóa mật khẩu trước khi gửi đến server
      const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();

      const response = await $api.post('/auth/login', { username, password: encryptedPassword });
      const token = response.data.token;
      authStore.login(token);
      localStorage.setItem('token', token);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signup = async (username, password) => {
    try {
      // Mã hóa mật khẩu trước khi gửi đến server
      const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();

      const response = await $api.post('/auth/signup', { username, password: encryptedPassword });

      if (response.status === 201) {
        const token = response.data.token;
        authStore.login(token);
        localStorage.setItem('token', token);

        return true;
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
  };

  return {
    token: authStore.token,
    login,
    signup,
    logout
  };
};
