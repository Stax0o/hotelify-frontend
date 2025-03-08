import styles from './profilePage.module.css';
import React, { useState } from 'react';
import { payingForBooking } from '../../services/api.js';

const Booking = (props) => {
  const { id, hotelName, roomName, startDate, endDate, cost, paymentStatus, forceUpdate } = props;
  const [status, setStatus] = useState(paymentStatus);

  const handlePay = async () => {
    try {
      const response = await payingForBooking(id);
      setStatus(response.paymentStatus);
      forceUpdate();
    } catch (e) {
      console.error(e.message);
    }
  };

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
        <span className={status === 'PAID' ? styles.paid : styles.pending}>
          {status === 'PAID' ? ' Оплачено' : ' Ожидает оплаты'}
        </span>
      </p>
      {status === 'UNPAID' && (
        <div className={styles.buttonContainer} style={{ marginTop: 0 }}>
          <button onClick={handlePay} className={`${styles.button} ${styles.buttonSubmit}`}>
            Оплатить
          </button>
        </div>
      )}
    </li>
  );
};

export default Booking;
