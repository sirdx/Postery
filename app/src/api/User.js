import api from './api';

export async function getRecentActiveUsers() {
  const { data } = await api.get('/users/recent-active');
  return data;
}