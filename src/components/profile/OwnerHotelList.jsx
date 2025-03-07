import {useEffect, useState} from 'react';
import {fetchUserHotels} from '../../services/api.js';
import styles from './profilePage.module.css';
import HotelItem from './HotelItem.jsx';
import {useNavigate} from 'react-router-dom';

const OwnerHotelList = () => {
  const [hotels, setHotels] = useState();
  const navigate = useNavigate();

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
      <div style={{display: 'flex', alignItems: 'center'}}>
        <h2>Список отелей</h2>
        <button
          onClick={() => navigate('hotel-settings')}
          className={`${styles.button} ${styles.greenButton}`}
          style={{margin: '0 0 0 auto'}}
        >
          Добавить отель
        </button>
      </div>
      {hotels.length === 0 ? (
        <p>У вас пока нет отелей.</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <>
              <li className={styles.item} key={hotel.id}>
                <HotelItem {...hotel} />
              </li>
              <button
                onClick={() => {navigate(`hotel-settings/${hotel.id}`)}}
                className={`${styles.button} ${styles.greenButton}`}
                style={{display: 'block', margin: '0 auto 25px auto'}}
              >
                Редактировать
              </button>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnerHotelList;
