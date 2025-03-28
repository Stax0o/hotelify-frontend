import styles from './profilePage.module.css';
import Booking from './Booking.jsx';
import { useEffect, useState } from 'react';
import { fetchUserBookings } from '../../services/api.js';

const BookingsList = ({ setError, forceUpdate, trigger }) => {
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
  }, [trigger]);

  if (!bookings)
    return (
      <div className={`${styles.profileContainer} ${styles.infoContainer}`}>
        <h2>История бронирований</h2>
        <p className={styles.loading}>Загрузка...</p>
      </div>
    );

  return (
    <div className={`${styles.profileContainer} ${styles.infoContainer}`}>
      <h2>История бронирований</h2>
      {bookings.length === 0 ? (
        <p>Вы еще ничего не бронировали.</p>
      ) : (
        <ul>
          {bookings
            .slice()
            .reverse()
            .map((booking) => (
              <Booking {...booking} key={booking.id} forceUpdate={forceUpdate} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default BookingsList;
