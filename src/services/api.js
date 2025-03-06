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

export const fetchHotels = async () => {
  const response = await fetch(`${API_URL}/api/hotel/all`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки отелей');
  }

  return response.json();
};

export const fetchHotel = async (hotelId) => {
  const response = await fetch(`${API_URL}/api/hotel/${hotelId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки отеля');
  }

  return response.json();
};

export const fetchAvailableRoomTypes = async (hotelId, startDate, endDate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const response = await fetch(
    `${API_URL}/api/room/available-types?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Ошибка загрузки списка номеров');
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

export const fetchUserHotels = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const response = await fetch(`${API_URL}/api/hotel/my`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки отелей');
  }

  return response.json();
};

export const createBooking = async (roomId, startDate, endDate) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const requestBody = {
    roomId,
    startDate,
    endDate,
  };

  const response = await fetch(`${API_URL}/api/booking`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('Ошибка создания бронирования');
  }

  return response.json();
};
