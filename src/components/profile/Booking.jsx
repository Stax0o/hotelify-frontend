import styles from './profilePage.module.css';
import React, { useState } from 'react';
import { cancelBooking, payingForBooking } from '../../services/api.js';
import { Link } from 'react-router-dom';

const Booking = (props) => {
  const { id, hotelId, hotelName, roomName, startDate, endDate, cost, paymentStatus, forceUpdate } =
    props;
  const [status, setStatus] = useState(paymentStatus);
  const [error, setError] = useState('');

  const handlePay = async () => {
    try {
      const response = await payingForBooking(id);
      setStatus(response.paymentStatus);
      forceUpdate();
      setError('');
    } catch (e) {
      setError('Ошибка оплаты');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelBooking(id);
      forceUpdate();
      setError('');
    } catch (e) {
      setError('Ошибка отмены бронирования');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <li className={styles.item}>
      <p>
        <strong>Отель:</strong>{' '}
        <Link to={`../hotel/${hotelId}`} className={styles.link}>
          {hotelName}
        </Link>
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
      {error && <p className={styles.error}>{error}</p>}
      {status === 'UNPAID' && (
        <div className={styles.buttonContainer} style={{ marginTop: 0 }}>
          <button onClick={handlePay} className={`${styles.button} ${styles.buttonSubmit}`}>
            Оплатить
          </button>
          <button onClick={handleCancel} className={`${styles.button} ${styles.redButton}`}>
            Отменить
          </button>
        </div>
      )}
    </li>
  );
};

export default Booking;
