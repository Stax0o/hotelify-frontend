import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBooking, fetchAvailableRoomTypes, fetchHotel } from '../../services/api.js';
import ImageSlider from '../imageSlider/ImageSlider.jsx';

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
    <div>
      <div>
        <h1>{hotel?.name}</h1>
        <ImageSlider imagePaths={imagePaths} />
        <p>
          {hotel?.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
          architecto debitis, eaque inventore labore, minus modi neque odio perferendis quam, quo
          suscipit totam. Aliquam deleniti dolorem doloribus eum, quas ratione.
        </p>
        <p>
          <strong>Город:</strong>
          {hotel?.city}
        </p>
        <p>
          <strong>Адрес:</strong>
          {hotel?.address}
        </p>
        <p>
          <strong>Телефон:</strong>
          {hotel?.phone}
        </p>
        <p>
          <strong>Email:</strong>
          {hotel?.email}
        </p>
      </div>
      <div>
        <h2>Бронирование</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Заселение:
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
              Выезд:
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
          </div>
          <label htmlFor="dropdown">Тип номера:</label>
          <select
            id="dropdown"
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(parseInt(e.target.value))}
          >
            <option value={0}>Выберите...</option>
            {/*todo переделать опции*/}
            {availableRoomType.map((roomType) => (
              <option key={roomType.id} value={roomType.id}>
                {roomType.name} - {roomType.price} руб.
              </option>
            ))}
          </select>
          <p>
            <strong>Количество дней:</strong>
            {daysCount}
          </p>
          <p>
            <strong>Стоимость:</strong>
            {price}
          </p>
          {/*todo Реализовать кнопку забронировать*/}
          <button type="submit">Забронировать</button>
        </form>
      </div>
    </div>
  );
};

export default Hotel;
