import api from './api';

export async function getNewestPosts(page) {
  const { data } = await api.get('/posts/newest', {
    params: { page: page }
  });

  return data;
}

export async function searchPosts(query, page) {
  const { data } = await api.get('/posts/search', {
    params: {
      query: query,
      page: page
    }
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