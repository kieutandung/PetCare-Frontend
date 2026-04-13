import api from './api';

const authService = {
  register: async (userData) => {
    try {
      console.log('📝 Registering user:', userData.email);
      console.log('📝 API URL:', api.defaults.baseURL + '/auth/register');
      
      const response = await api.post('/auth/register', userData);
      console.log('✅ Register response:', response.data);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role,
        }));
      }
      return response.data;
    } catch (error) {
      console.error('❌ Register error:', error);
      console.error('❌ Error response:', error.response);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Không thể kết nối đến server' 
      };
    }
  },

  login: async (loginData) => {
    try {
      console.log('🔐 Logging in:', loginData.loginValue);
      console.log('🔐 API URL:', api.defaults.baseURL + '/auth/login');
      
      const response = await api.post('/auth/login', loginData);
      console.log('✅ Login response:', response.data);
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role,
        }));
      }
      return response.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      console.error('❌ Error response:', error.response);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Không thể kết nối đến server' 
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  }
};

export default authService;