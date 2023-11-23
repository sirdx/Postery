import api from './api';

export async function login(nameOrEmail, password) {
  try {
    const { data } = await api.post('/auth/login', {
      nameOrEmail: nameOrEmail,
      password: password
    });
    
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      return "Invalid credentials.";
    }

    return "Unknown error. Try again later.";
  }
}

export async function logout() {
  await api.post('/auth/logout');
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
  
    return data;
  } catch (error) {
    return "Unknown error. Try again later.";
  }
}