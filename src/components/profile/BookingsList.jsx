import styles from './profilePage.module.css';
import Booking from './Booking.jsx';
import { useEffect, useState } from 'react';
import { fetchUserBookings } from '../../services/api.js';

const BookingsList = ({ setError }) => {
  const [bookings, setBookings] = useState();

  useEffect(() => {
    (async () => {
      try {
        const bookingsData = await fetchUserBookings();
        setBookings(bookingsData);
      } catch (err) {
        setError('Ошибка загрузки данных');
      }
    })();
  }, []);

  if (!bookings)
    return (
      <div className={`${styles.profileContainer} ${styles.bookingsContainer}`}>
        <h2>Мои бронирования</h2>
        <p className={styles.loading}>Загрузка...</p>
      </div>
    );

  return (
    <div className={`${styles.profileContainer} ${styles.bookingsContainer}`}>
      <h2>Мои бронирования</h2>
      {bookings.length === 0 ? (
        <p>У вас нет бронирований.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <Booking booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingsList;
