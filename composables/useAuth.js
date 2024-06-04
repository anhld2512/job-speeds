import CryptoJS from 'crypto-js'; // Import thư viện mã hóa

export const useAuth = () => {
  const appConfig = useAppConfig();
  const authStore = useAuthStore();
  const { $api } = useNuxtApp();
  const login = async (username, password) => {
    try {
      // Mã hóa mật khẩu trước khi gửi đến server
      const encryptedPassword = CryptoJS.AES.encrypt(password, appConfig.key.secret).toString();

      const response = await $api.post('/auth/login', { username, password: encryptedPassword });
      const token = response.data.token;
      const userId = response.data.userId;
      // Giải mã token trước khi lưu vào store và localStorage
      const decryptedToken = CryptoJS.AES.decrypt(token, appConfig.key.secret).toString(CryptoJS.enc.Utf8);
      authStore.login(decryptedToken);
      localStorage.setItem('token', decryptedToken);
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
      const encryptedPassword = CryptoJS.AES.encrypt(password, appConfig.key.secret).toString();
  
      const response = await $api.post('/auth/signup', { username, password: encryptedPassword });
  
      if (response.status === 201) {
        const token = response.data.token;
  
        // Lưu token vào store và localStorage
        authStore.login(token);
        localStorage.setItem('token', token);
  
        return {
          result:true,
          encryptedPassword:encryptedPassword
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
    login,
    signup,
    logout
  };
};
