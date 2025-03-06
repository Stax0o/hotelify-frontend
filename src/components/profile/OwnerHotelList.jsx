import { useEffect, useState } from 'react';
import { fetchUserHotels } from '../../services/api.js';
import styles from './profilePage.module.css';
import HotelItem from './HotelItem.jsx';

const OwnerHotelList = () => {
  const [hotels, setHotels] = useState();

  useEffect(() => {
    (async () => {
      try {
        const hotelsData = await fetchUserHotels();
        setHotels(hotelsData);
      } catch (err) {
        console.error('Ошибка при загрузке отелей', err);
      }
    })();
  }, []);

  if (!hotels)
    return (
      <div className={`${styles.profileContainer} ${styles.infoContainer}`}>
        <h2>Список отелей</h2>
        <p className={styles.loading}>Загрузка...</p>
      </div>
    );

  return (
    <div className={`${styles.profileContainer} ${styles.infoContainer}`}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>Список отелей</h2>
        <button
          className={`${styles.button} ${styles.greenButton}`}
          style={{ margin: '0 0 0 auto' }}
        >
          Добавить отель
        </button>
      </div>
      {hotels.length === 0 ? (
        <p>У вас пока нет отелей.</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <HotelItem {...hotel} key={hotel.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerHotelList;
