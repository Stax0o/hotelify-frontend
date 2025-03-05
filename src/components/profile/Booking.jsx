import styles from './profilePage.module.css';

const Booking = (props) => {
  const { id, hotelId, hotelName, roomName, startDate, endDate, cost, paymentStatus } = props;

  return (
    <li className={styles.bookingItem}>
      <p>
        <strong>Отель:</strong> {hotelName}
      </p>
      <p>
        <strong>Комната:</strong> {roomName}
      </p>
      <p>
        <strong>Дата:</strong> {startDate} - {endDate}
      </p>
      <p>
        <strong>Стоимость:</strong> ${cost}
      </p>
      <p>
        <strong>Статус оплаты:</strong> {paymentStatus === 'PAID' ? 'Оплачено' : 'Ожидает оплаты'}
      </p>
    </li>
  );
};

export default Booking;
