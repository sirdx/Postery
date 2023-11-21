import api from './api';

export async function getPosts() {
  const { data } = await api.get('/posts');
  return data;
}

export async function getNewestPosts(page) {
  const { data } = await api.get('/posts/newest', {
    params: { page: page }
  });

  return data;
}

export async function createPost(title, content) {
  const { data } = await api.post('/posts', {
    title: title,
    content: content
  });

  return data;
}