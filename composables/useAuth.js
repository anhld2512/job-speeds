export const useAuth = () => {
  const authStore = useAuthStore();
  const { $api } = useNuxtApp();

  const login = async (username, password) => {
    try {
      const response = await $api.post('/auth/login', { username, password });
      const { token, refreshToken, userId } = response.data;
      authStore.login(token, refreshToken);

      if (process.client) {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await $api.post('/auth/signup', { username, password });
      if (response.status === 201) {
        const { token, refreshToken } = response.data;
        authStore.login(token, refreshToken);

        if (process.client) {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
        }

        return { result: true };
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

    if (process.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      window.location.reload();
    }
  };

  return {
    token: authStore.token,
    userId: authStore.userId,
    isAuthenticated: authStore.isAuthenticated,
    login,
    signup,
    logout
  };
};
