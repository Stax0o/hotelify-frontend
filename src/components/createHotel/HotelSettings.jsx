import HotelCreateInfo from './HotelCreateInfo.jsx';
import React, { useEffect, useState } from 'react';
import RoomsCreateInfo from './RoomsCreateInfo.jsx';
import { useParams } from 'react-router-dom';
import HotelItem from '../profile/HotelItem.jsx';
import { fetchHotel } from '../../services/api.js';
import styles from './hotelSettings.module.css';

const HotelSettings = () => {
  const params = useParams();
  const [hotelId, setHotelId] = useState(params.hotelId);
  const [hotel, setHotel] = useState();
  const [isLoadingHotel, setIsLoadingHotel] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const hotel = await fetchHotel(hotelId);
        setHotel(hotel);
      } catch (err) {
        console.error('Ошибка при загрузке отеля', err);
      } finally {
        setIsLoadingHotel(false);
      }
    })();
  }, [hotelId]);

  return (
    <div>
      {!hotelId ? (
        <HotelCreateInfo setHotelId={setHotelId} />
      ) : (
        <div>
          {isLoadingHotel ? (
            <p className={styles.loading}>Загрузка...</p>
          ) : (
            <div className={styles.container}>
              <HotelItem {...hotel} />
              <button className={styles.button}>Редактировать</button>
            </div>
          )}
          <RoomsCreateInfo />
        </div>
      )}
    </div>
  );
};

export default HotelSettings;
