import React, { useState } from 'react';
import styles from './createHotel.module.css';
import { createHotel } from '../../services/api.js';

const HotelCreateInfo = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    phone: '',
    email: '',
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createHotel(
        hotelData.name,
        hotelData.description,
        hotelData.city,
        hotelData.address,
        hotelData.phone,
        hotelData.email,
        images,
      );
      alert('Отель успешно создан!');
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
            type='tel'
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
          <input type="file" multiple onChange={handleImageChange} required />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button} disabled={loading}>
            Создать
          </button>
        </div>
        {loading && <p className={styles.loading}>Загрузка...</p>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default HotelCreateInfo;
