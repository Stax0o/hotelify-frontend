import { useEffect, useState } from 'react';
import { fetchUserBookings, fetchUserProfile } from '../../services/api.js';
import styles from './profilePage.module.css';
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.dispatchEvent(new Event('storage'));
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Вы не авторизованы');
      return;
    }

    (async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);

        const bookingsData = await fetchUserBookings();
        setBookings(bookingsData);
      } catch (err) {
        setError('Ошибка загрузки данных');
      }
    })();
  }, []);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!user) return <p className={styles.loading}>Загрузка...</p>;

  return (
    <div className={styles.profileWrapper}>
      <div className={`${styles.profileContainer} ${styles.userInfoContainer}`}>
        <div className={`${styles.userInfo}`}>
          <h2>Данные аккаунта</h2>
          <p>
            <strong>Имя:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Телефон:</strong> {user.phone}
          </p>
          <p>
            <strong>Роль:</strong> {user.userRole === 'USER' ? 'Пользователь' : 'Владелец отеля'}
          </p>
          <p>
            <strong>Баланс:</strong> ${user.balance}
          </p>
          <div>
            {/*todo реализовать функцию редактирования*/}
            <button className={styles.editProfileButton}>Редактировать</button>
            <button className={styles.logoutButton} onClick={handleLogout}>Выход</button>
          </div>
        </div>
      </div>

      <div className={`${styles.profileContainer} ${styles.bookingsContainer}`}>
        <div className={styles.bookings}>
          <h2>Мои бронирования</h2>
          {bookings.length === 0 ? (
            <p>У вас нет бронирований.</p>
          ) : (
            <ul>
              {bookings.map((booking, index) => (
                <li key={index} className={styles.bookingItem}>
                  <p>
                    <strong>Отель:</strong> {booking.room.hotel.name}
                  </p>
                  <p>
                    <strong>Комната:</strong> {booking.room.name}
                  </p>
                  <p>
                    <strong>Дата:</strong> {booking.startDate} - {booking.endDate}
                  </p>
                  <p>
                    <strong>Стоимость:</strong> ${booking.cost}
                  </p>
                  <p>
                    <strong>Статус оплаты:</strong>{' '}
                    {booking.paymentStatus === 'PAID' ? 'Оплачено' : 'Ожидает оплаты'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
