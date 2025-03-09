import { useEffect, useState } from 'react';
import { fetchBookingsByHotelId } from '../../services/api.js';
import HotelBookingItem from './HotelBookingItem.jsx';

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
      {bookings.map((booking) => {
        return <HotelBookingItem {...booking} key={booking.id} />;
      })}
    </>
  );
};

export default HotelBookings;
