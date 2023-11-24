import api from './api';

export async function getPost(slug) {
  try {
    const { data } = await api.get(`/posts/${slug}`);

    return data;
  } catch (error) {
    return "Unknown error. Try again later.";
  }
}

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
  try {
    const { data } = await api.post('/posts', {
      title: title,
      content: content
    });
    
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      return "Unauthorized to create a post.";
    }

    return "Unknown error. Try again later.";
  }
}