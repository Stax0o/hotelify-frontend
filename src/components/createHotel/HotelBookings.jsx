import { useEffect, useState } from 'react';
import { fetchBookingsByHotelId } from '../../services/api.js';
import HotelBookingItem from './HotelBookingItem.jsx';
import styles from './hotelSettings.module.css';

const HotelBookings = ({ hotelId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const bookings = await fetchBookingsByHotelId(hotelId);
        setBookings(bookings);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [hotelId]);

  return (
    <>
      {bookings.length > 0 ? (
        bookings.map((booking) => <HotelBookingItem {...booking} key={booking.id} />)
      ) : (
        <div className={`${styles.form} ${styles.container}`}>
          В отеле нет активных бронирований...
        </div>
      )}
    </>
  );
};

export default HotelBookings;
