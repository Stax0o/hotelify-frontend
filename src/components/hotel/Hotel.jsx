import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBooking, fetchAvailableRoomTypes, fetchHotel } from '../../services/api.js';
import ImageSlider from '../imageSlider/ImageSlider.jsx';
import styles from './hotel.module.css';

const Hotel = () => {
  const params = useParams();
  const [hotel, setHotel] = useState();
  const [availableRoomType, setAvailableRoomType] = useState([]);
  const [imagePaths, setImagePaths] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysCount, setDaysCount] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const hotel = await fetchHotel(params.hotelId);
      setImagePaths(hotel.imagePaths);
      setHotel(hotel);
    })();
  }, [params.hotelId]);

  useEffect(() => {
    (async () => {
      if (startDate && endDate) {
        const roomTypes = await fetchAvailableRoomTypes(params.hotelId, startDate, endDate);
        setAvailableRoomType(roomTypes);
      }
    })();
  }, [params.hotelId, startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = diffTime / (1000 * 3600 * 24);
      const daysCount = diffDays >= 0 ? diffDays : 0;
      setDaysCount(daysCount);
      const selectedRoom = availableRoomType.find((room) => room.id === selectedRoomType);
      if (selectedRoom) {
        setPrice(daysCount * selectedRoom.price);
      } else {
        setPrice(0);
      }
    } else {
      setDaysCount(0);
    }
  }, [startDate, endDate, availableRoomType, selectedRoomType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createBooking(selectedRoomType, startDate, endDate);
      console.log(data);
      navigate('../profile');
    } catch (error) {
      console.error('Ошибка создания бронирования: ', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.hotelInfo}>
        <h1 className={styles.title}>{hotel?.name}</h1>
        <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
          <ImageSlider imagePaths={imagePaths} />
        </div>
        <div className={styles.section}>
          <div className={styles.infoItem}>
            <strong>Город:</strong>
            <span>{hotel?.city}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Адрес:</strong>
            <span>{hotel?.address}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Телефон:</strong>
            <span>{hotel?.phone}</span>
          </div>
          <div className={styles.infoItem}>
            <strong>Email:</strong>
            <span>{hotel?.email}</span>
          </div>
        </div>
        <div className={styles.section}>
          <strong>Описание</strong>
          <p>{hotel?.description}</p>
        </div>
      </div>

      <div className={styles.bookingCard}>
        <h2 className={styles.title}>Бронирование</h2>
        <form onSubmit={handleSubmit} className={styles.bookingForm}>
          <div className={styles.dateInputs}>
            <div className={styles.inputGroup}>
              <label>Заселение:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className={styles.inputGroup}>
              <label>Выезд:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dropdown">Тип номера:</label>
            <select
              id="dropdown"
              className={styles.select}
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(parseInt(e.target.value))}
            >
              <option value={0}>Выберите...</option>
              {availableRoomType.map((roomType) => (
                <option key={roomType.id} value={roomType.id}>
                  {roomType.name} - {roomType.price} руб.
                </option>
              ))}
            </select>
          </div>

          <div className={styles.priceInfo}>
            <p>
              <strong>Количество дней:</strong> {daysCount}
            </p>
            <p>
              <strong>Стоимость:</strong> {price} руб.
            </p>
          </div>

          <button type="submit" className={styles.bookButton}>
            Забронировать
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hotel;
