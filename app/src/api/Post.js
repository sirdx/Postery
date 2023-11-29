import api, { ApiResponse } from './api';

export async function getPost(slug) {
  try {
    const { data } = await api.get(`/posts/${slug}`);

    return new ApiResponse(null, data);
  } catch (error) {
    return new ApiResponse(error.response.data, null);
  }
}

export async function getNewestPosts(page) {
  try {
    const { data } = await api.get('/posts/newest', {
      params: { page: page }
    });

    return new ApiResponse(null, data);
  } catch (error) {
    return new ApiResponse(error.response.data, null);
  }
}

export async function getUserPosts(userId, page) {
  try {
    const { data } = await api.get(`/posts/user/${userId}`, {
      params: { page: page }
    });

    return new ApiResponse(null, data);
  } catch (error) {
    return new ApiResponse(error.response.data, null);
  }
}

export async function searchPosts(query, page) {
  try {
    const { data } = await api.get('/posts/search', {
      params: {
        query: query,
        page: page
      }
    });

    return new ApiResponse(null, data);
  } catch (error) {
    return new ApiResponse(error.response.data, null);
  }
}

export async function createPost(title, content) {
  try {
    const { data } = await api.post('/posts', {
      title: title,
      content: content
    });
    
    return new ApiResponse(null, data);
  } catch (error) {
    if (error.response.status === 401) {
      return new ApiResponse({
        error: "Unauthorized",
        message: "Unauthorized to create a post"
      }, null);
    }

    return new ApiResponse(error.response.data, null);
  }
}

export async function updatePost(id, title, content) {
  try {
    const { data } = await api.put(`/posts/${id}`, {
      title: title,
      content: content
    });
    
    return new ApiResponse(null, data);
  } catch (error) {
    if (error.response.status === 401) {
      return new ApiResponse({
        error: "Unauthorized",
        message: "Unauthorized to update the post"
      }, null);
    }

    return new ApiResponse(error.response.data, null);
  }
}

export async function deletePost(id) {
  try {
    await api.delete(`/posts/${id}`);
    
    return new ApiResponse(null, null);
  } catch (error) {
    if (error.response.status === 401) {
      return new ApiResponse({
        error: "Unauthorized",
        message: "Unauthorized to delete the post"
      }, null);
    }

    return new ApiResponse(error.response.data, null);
  }
}