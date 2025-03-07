import ImageSlider from '../imageSlider/ImageSlider.jsx';
import styles from './profilePage.module.css';

const HotelItem = (props) => {
  const { id, name, description, city, address, phone, email, imagePaths } = props;

  return (
    <div className={styles.hotelItem}>
      <div>
        <p>
          <strong>Отель:</strong> {name}
        </p>
        <p>
          <strong>Город:</strong> {city}
        </p>
        <p>
          <strong>Адрес:</strong> {address}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      </div>
      <div className={styles.hotelImagePreview}>
        <ImageSlider imagePaths={imagePaths} />
      </div>
    </div>
  );
};

export default HotelItem;
