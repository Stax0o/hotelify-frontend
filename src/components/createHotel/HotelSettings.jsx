import HotelCreateInfo from './HotelCreateInfo.jsx';
import React, { useEffect, useState } from 'react';
import RoomsList from './RoomsList.jsx';
import { useParams } from 'react-router-dom';
import HotelItem from '../profile/HotelItem.jsx';
import { fetchHotel } from '../../services/api.js';
import styles from './hotelSettings.module.css';
import HotelBookings from './HotelBookings.jsx';

const HotelSettings = () => {
  const params = useParams();
  const [hotelId, setHotelId] = useState(params.hotelId);
  const [hotel, setHotel] = useState();
  const [isLoadingHotel, setIsLoadingHotel] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isRoomList, setIsRoomList] = useState(false);

  useEffect(() => {
    (async () => {
      if (hotelId) {
        try {
          const hotel = await fetchHotel(hotelId);
          setHotel(hotel);
        } catch (err) {
          console.error('Ошибка при загрузке отеля', err);
        } finally {
          setIsLoadingHotel(false);
        }
      }
    })();
  }, [hotelId, isUpdate]);

  return (
    <div>
      {!hotelId || isUpdate ? (
        <HotelCreateInfo
          setHotelId={setHotelId}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          hotelId={hotelId}
        />
      ) : (
        <div>
          {isLoadingHotel ? (
            <p className={styles.loading}>Загрузка...</p>
          ) : (
            <div className={styles.container}>
              <HotelItem {...hotel} />
              <div className={styles.buttonContainer} style={{ justifyContent: 'space-between' }}>
                <button
                  className={styles.button}
                  onClick={() => {
                    setIsUpdate(true);
                  }}
                >
                  Редактировать
                </button>
                <button
                  className={`${styles.toggleButton} ${styles.button}`}
                  onClick={() => {
                    setIsRoomList(!isRoomList);
                  }}
                >
                  {isRoomList ? 'Номера' : 'Бронирования'}
                </button>
              </div>
            </div>
          )}
          {isRoomList ? <RoomsList hotelId={hotelId} /> : <HotelBookings hotelId={hotelId} />}
        </div>
      )}
    </div>
  );
};

export default HotelSettings;
