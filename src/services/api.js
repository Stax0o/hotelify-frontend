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

export const fetchHotels = async (date, city, price) => {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (city) params.append('city', city);
  if (price && price !== 0) params.append('price', price);

  const response = await fetch(`${API_URL}/api/hotel/all?${params.toString()}`, {
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

  const bookingDate = {
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
    body: JSON.stringify(bookingDate),
  });

  if (!response.ok) {
    throw new Error('Ошибка создания бронирования');
  }

  return response.json();
};

export const createHotel = async (name, description, city, address, phone, email, images) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const hotelData = {
    name,
    description,
    city,
    address,
    phone,
    email,
  };

  const formData = new FormData();
  formData.append('hotel', JSON.stringify(hotelData));

  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i]);
  }

  const response = await fetch(`${API_URL}/api/hotel`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Ошибка создания отеля');
  }

  return response.json();
};

export const updateHotel = async (id, name, description, city, address, phone, email, images) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const hotelData = {
    id,
    name,
    description,
    city,
    address,
    phone,
    email,
  };

  const formData = new FormData();
  formData.append('hotel', JSON.stringify(hotelData));

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  }

  const response = await fetch(`${API_URL}/api/hotel`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Ошибка обновления данных отеля');
  }

  return response.json();
};

export const fetchRoomsByHotelId = async (hotelId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const response = await fetch(`${API_URL}/api/room?hotelId=${hotelId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка загрузки номеров');
  }

  return response.json();
};

export const createRooms = async (hotelId, name, price, count) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const roomsDate = {
    hotelId,
    name,
    price,
  };

  const response = await fetch(`${API_URL}/api/room?count=${count}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomsDate),
  });

  if (!response.ok) {
    throw new Error('Ошибка создания номеров');
  }

  return response.json();
};

export const createTopUp = async (paymentMethod, amount) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const topUpData = {
    paymentMethod,
    amount,
  };

  const response = await fetch(`${API_URL}/api/topup`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topUpData),
  });

  if (!response.ok) {
    throw new Error('Ошибка пополнения баланса');
  }

  return response.json();
};

export const payingForBooking = async (bookingId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен не найден. Пользователь не авторизован.');
  }

  const response = await fetch(`${API_URL}/api/booking/${bookingId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка пополнения баланса');
  }

  return response.json();
};
