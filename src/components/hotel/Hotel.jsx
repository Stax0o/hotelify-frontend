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
        <ImageSlider imagePaths={imagePaths} />
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
            <p>
              {/*todo*/}
              {hotel?.description} **Отель "Гармония"** — это уютный уголок, где каждая деталь
              создана для вашего комфорта и релаксации. Наш отель располагается в живописном месте,
              с видом на леса и озера, предоставляя уникальную возможность наслаждаться природой, не
              покидая удобства современных удобств. **Типы номеров:** 1. **Стандартный номер**
              Уютный и стильный номер, идеально подходящий для деловых путешественников и туристов.
              Оборудован одной двуспальной кроватью, рабочим столом, телевизором с плоским экраном,
              а также современной ванной комнатой с душем. *Особенности*: Бесплатный Wi-Fi,
              кондиционер, мини-бар. 2. **Улучшенный номер** Просторный номер с панорамными окнами и
              видом на сад. В дополнение к стандартным удобствам в номере имеется зона для отдыха с
              диваном и кофе-столиком. *Особенности*: Ванная с джакузи, халаты и тапочки,
              принадлежности для чая и кофе, бесплатный доступ в спа-зону отеля. 3. **Семейный
              номер** Идеален для отдыха с детьми. Состоит из двух комнат, соединённых дверью. В
              одной — двуспальная кровать, в другой — две односпальные кровати. Обе комнаты
              оборудованы всем необходимым для комфортного проживания. *Особенности*: Просторная
              ванная комната с ванной и душем, детская зона с игрушками и книгами, бесплатные
              детские принадлежности. 4. **Люкс** Элегантный и роскошный номер для тех, кто ценит
              комфорт и стиль. Просторная гостиная зона с мягкой мебелью, кухня с мини-баром и
              обеденная зона. В спальне — кровать king-size и отдельная гардеробная. *Особенности*:
              Ванная комната с сауной и душевой кабиной, бесплатная доставка еды и напитков в номер,
              эксклюзивный доступ в VIP-зону отеля. 5. **Президентский люкс** Для самых
              требовательных гостей. Номер с отдельным входом, личным лифтом и террасой с видом на
              город. Просторная гостиная с камином и баром, персональный офис и отдельная спа-зона.
              *Особенности*: Частный бассейн, эксклюзивное обслуживание, услуги личного шофера и
              горничной на протяжении всего проживания. **Дополнительные услуги отеля:** - Ресторан
              с авторской кухней - Спа-центр и массажные процедуры - Тренажёрный зал и йога-зал -
              Организация трансфера и экскурсионных туров Мы гарантируем, что ваш отдых будет
              незабываемым, а каждый номер в нашем отеле обеспечит вам комфорт и уют.
            </p>
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
