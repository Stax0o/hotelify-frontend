const API_URL = 'http://localhost:8081';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Ошибка регистрации');
  }

  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Ошибка входа');
  }

  return response.json();
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const response = await fetch(`${API_URL}/api/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки профиля');
  }

  return response.json();
};

export const fetchUserBookings = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const response = await fetch(`${API_URL}/api/booking/my`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки бронирований');
  }

  return response.json();
};
