import React, { useEffect, useState } from 'react';
import { createHotel, fetchHotel, updateHotel } from '../../services/api.js';
import styles from './hotelSettings.module.css';
import { useNavigate } from 'react-router-dom';

const HotelCreateInfo = ({ setHotelId, isUpdate, setIsUpdate, hotelId }) => {
  const [hotelData, setHotelData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    phone: '',
    email: '',
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (isUpdate) {
      (async () => {
        const hotel = await fetchHotel(hotelId);
        setHotelData({
          name: hotel.name,
          description: hotel.description,
          city: hotel.city,
          address: hotel.address,
          phone: hotel.phone,
          email: hotel.email,
        });
      })();
    }
  }, [hotelId, isUpdate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!isUpdate) {
        const answer = await createHotel(
          hotelData.name,
          hotelData.description,
          hotelData.city,
          hotelData.address,
          hotelData.phone,
          hotelData.email,
          images,
        );
        setHotelId(answer.id);
        navigate(`${answer.id}`, { relative: 'path' });
      } else {
        await updateHotel(
          hotelId,
          hotelData.name,
          hotelData.description,
          hotelData.city,
          hotelData.address,
          hotelData.phone,
          hotelData.email,
          images,
        );
        setIsUpdate(false)
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Информация о отеле</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Название</label>
          <input
            type="text"
            value={hotelData.name}
            onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Город</label>
          <input
            type="text"
            value={hotelData.city}
            onChange={(e) => setHotelData({ ...hotelData, city: e.target.value })}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Адрес</label>
          <input
            type="text"
            value={hotelData.address}
            onChange={(e) => setHotelData({ ...hotelData, address: e.target.value })}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Телефон</label>
          <input
            type="tel"
            value={hotelData.phone}
            onChange={(e) => setHotelData({ ...hotelData, phone: e.target.value })}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={hotelData.email}
            onChange={(e) => setHotelData({ ...hotelData, email: e.target.value })}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Описание</label>
          <textarea
            value={hotelData.description}
            onChange={(e) => setHotelData({ ...hotelData, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className={styles.inputGroup}>
          <label>Фото</label>
          <input type="file" multiple onChange={handleImageChange} required={!isUpdate} />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button} disabled={loading}>
            {!isUpdate ? 'Создать' : 'Сохранить'}
          </button>
        </div>
        {loading && <p className={styles.loading}>Загрузка...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default HotelCreateInfo;
