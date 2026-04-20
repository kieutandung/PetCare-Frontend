import axios from 'axios';

// Dùng URL tuyệt đối, không dùng relative
const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log để kiểm tra URL
api.interceptors.request.use(
  (config) => {
    // Tự động thêm token vào header nếu có
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('🌐 Full URL:', config.baseURL + config.url);
    console.log('📤 Method:', config.method);
    console.log('📤 Data:', config.data);
    console.log('🔑 Token:', token ? 'Có token' : 'Không có token');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý response
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', error.response?.status, error.response?.data);
    
    // Nếu lỗi 401 (Unauthorized) thì chuyển về login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;