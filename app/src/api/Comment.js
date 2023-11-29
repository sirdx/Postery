import api, { ApiResponse } from './api';

export async function getComments(postId, page) {
  try {
    const { data } = await api.get(`/comments/${postId}`, {
      params: {
        page: page
      }
    });

    return new ApiResponse(null, data);
  } catch (error) {
    return new ApiResponse(error.response.data, null);
  }
}

export async function createComment(postId, content) {
  try {
    const { data } = await api.post(`/comments/${postId}`, {
      content: content
    });
    
    return new ApiResponse(null, data);
  } catch (error) {
    if (error.response.status === 401) {
      return new ApiResponse({
        error: "Unauthorized",
        message: "Unauthorized to create a comment"
      }, null);
    }

    return new ApiResponse(error.response.data, null);
  }
}

export async function deleteComment(id) {
  try {
    await api.delete(`/comments/${id}`);
    
    return new ApiResponse(null, null);
  } catch (error) {
    if (error.response.status === 401) {
      return new ApiResponse({
        error: "Unauthorized",
        message: "Unauthorized to delete the comment"
      }, null);
    }

    return new ApiResponse(error.response.data, null);
  }
}