// composables/useAuth.js
import { useAuthStore } from '~/stores/auth';

export const useAuth = () => {
  //#region Authentication Functions
  // Phân vùng cho các hàm xử lý xác thực
  //#endregion
  const authStore = useAuthStore();
  const {$api} = useNuxtApp()

  //#region Login Function
  // Hàm đăng nhập
  //#endregion
  const login = async (username, password) => {
    try {
      console.log(username, password)
      const response = await $api.post('/auth/login', { username, password });
      const token = response.data.token; // Lấy token từ phản hồi của API đăng nhập
      authStore.login(token);
      localStorage.setItem('token', token); // Lưu token vào localStorage

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  //#region Signup Function
  // Hàm đăng ký
  //#endregion
  const signup = async (username, password) => {
    try {
      const response = await $api.post('/auth/signup', { username, password });
      
      if (response.status === 201) {
        // Nếu đăng ký thành công, lưu token vào store (nếu cần thiết) và trả về true
        const token = response.data.token;
        authStore.login(token);
        localStorage.setItem('token', token); // Lưu token vào localStorage

        return true;
      } else {
        // Nếu có lỗi khi đăng ký, in ra lỗi và trả về false
        console.error('Error:', response.data.message);
        return false;
      }
    } catch (error) {
      // Nếu có lỗi trong quá trình gửi yêu cầu đến API, in ra lỗi và trả về false
      console.error(error);
      return false;
    }
  };

  //#region Logout Function
  // Hàm đăng xuất
  //#endregion
  const logout = () => {
    authStore.logout(); // Xóa token khỏi store khi người dùng logout
  };

  return {
    token: authStore.token, // Trả về token từ store
    login,
    signup,
    logout
  };
};
