import api, { ApiResponse } from './api';

export async function login(nameOrEmail, password) {
  try {
    const { data } = await api.post('/auth/login', {
      nameOrEmail: nameOrEmail,
      password: password
    });
    
    return new ApiResponse(null, data);
  } catch (error) {
    if (error.response.status === 401) {
      return new ApiResponse({
        error: "Unauthorized",
        message: "Invalid credentials."
      }, null);
    }

    return new ApiResponse(error.response.data, null);
  }
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error(error);
  }
}

export async function register(
  name, 
  displayName, 
  email, 
  password, 
  profileColor
) {
  try {
    const { data } = await api.post('/auth/register', {
      name: name,
      displayName: displayName,
      email: email,
      password: password,
      profileColor: profileColor
    });
  
    return new ApiResponse(null, data);
  } catch (error) {
    return new ApiResponse(error.response.data, null);
  }
}