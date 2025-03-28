import HotelCard from './HotelCard.jsx';
import { useEffect } from 'react';
import { fetchHotels } from '../../services/api.js';
import styles from './hotelList.module.css';

const HotelList = ({ setHotels, hotels }) => {
  useEffect(() => {
    (async () => {
      try {
        const hotels = await fetchHotels();
        setHotels(hotels);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} {...hotel} />
      ))}
    </div>
  );
};

export default HotelList;
