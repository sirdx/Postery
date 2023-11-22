import api from './api';

export async function getRecentActiveUsers() {
  const { data } = await api.get('/users/recent-active');
  return data;
}

export async function getUser(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}