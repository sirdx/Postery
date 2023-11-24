import api, { ApiResponse } from './api';

export async function getRecentActiveUsers() {
  const { data } = await api.get('/users/recent-active');
  return data;
}

export async function getUser(id) {
  try {
    const { data } = await api.get(`/users/${id}`);

    return new ApiResponse(null, data);
  } catch (error) {
    return new ApiResponse(error.response.data, null);
  }
}