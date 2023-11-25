import axios from 'axios';
import { USER_ID_KEY } from 'src/components/atoms/AuthProvider';

export class ApiResponse {
  constructor(errorDetails, data) {
    this.errorDetails = errorDetails;
    this.data = data;
  }
} 

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
        localStorage.removeItem(USER_ID_KEY);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;