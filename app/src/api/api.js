import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        localStorage.removeItem('userId');
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
);

export default api;