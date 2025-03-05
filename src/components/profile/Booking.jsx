import styles from "./profilePage.module.css";

const Booking = ({booking}) => {
  return (
    <li className={styles.bookingItem}>
      <p>
        <strong>Отель:</strong> {booking.room.hotel.name}
      </p>
      <p>
        <strong>Комната:</strong> {booking.room.name}
      </p>
      <p>
        <strong>Дата:</strong> {booking.startDate} - {booking.endDate}
      </p>
      <p>
        <strong>Стоимость:</strong> ${booking.cost}
      </p>
      <p>
        <strong>Статус оплаты:</strong>{' '}
        {booking.paymentStatus === 'PAID' ? 'Оплачено' : 'Ожидает оплаты'}
      </p>
    </li>
  );
};

export default Booking;