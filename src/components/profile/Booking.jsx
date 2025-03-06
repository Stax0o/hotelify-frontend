import styles from './profilePage.module.css';

const Booking = (props) => {
  const { id, hotelId, hotelName, roomName, startDate, endDate, cost, paymentStatus } = props;

  return (
    <li className={styles.item}>
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
        <strong>Стоимость:</strong> {cost} руб.
      </p>
      <p>
        <strong>Статус оплаты:</strong>
        <span className={paymentStatus === 'PAID' ? styles.paid : styles.pending}>
          {paymentStatus === 'PAID' ? ' Оплачено' : ' Ожидает оплаты'}
        </span>
      </p>
    </li>
  );
};

export default Booking;
