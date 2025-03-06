import styles from './profilePage.module.css';

const HotelItem = (props) => {
  const { id, name, description, city, address, phone, email } = props;

  return (
    <li className={styles.item}>
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
    </li>
  );
};

export default HotelItem;
