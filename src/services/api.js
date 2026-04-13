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
    console.log('🌐 Full URL:', config.baseURL + config.url);
    console.log('📤 Method:', config.method);
    console.log('📤 Data:', config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;