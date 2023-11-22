import api from './api';

export async function login(nameOrEmail, password) {
  const { data } = await api.post('/auth/login', {
    nameOrEmail: nameOrEmail,
    password: password
  });

  return data;
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
  const { data } = await api.post('/auth/register', {
    name: name,
    displayName: displayName,
    email: email,
    password: password,
    profileColor: profileColor
  });

  return data;
}