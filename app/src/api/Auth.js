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

export async function register(name, email, password) {
  const { data } = await api.post('/auth/register', {
    name: name,
    email: email,
    password: password
  });

  return data;
}