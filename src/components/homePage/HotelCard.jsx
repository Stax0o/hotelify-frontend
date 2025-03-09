import styles from './hotelCard.module.css';
import ImageSlider from '../imageSlider/ImageSlider.jsx';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ id, name, city, imagePaths = [], minPrice }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`hotel/${id}`, { relative: 'path' });
  };

  return (
    <div className={styles.card}>
      <ImageSlider imagePaths={imagePaths} />

      <div className={styles.header}>
        <h3 className={styles.title}>{name}</h3>
        <span className={styles.city}>{city}</span>
      </div>

      <div className={styles.price}>от {minPrice} ₽</div>

      <button className={styles.bookButton} onClick={handleClick}>
        Забронировать
      </button>
    </div>
  );
};

export default HotelCard;
