import styles from './hotelSettings.module.css';
import React from 'react';

const HotelBookingItem = (props) => {
  const {
    roomName,
    userFirstName,
    userLastName,
    userPhone,
    startDate,
    endDate,
    cost,
    paymentStatus,
  } = props;

  return (
    <div className={styles.container} style={{ display: 'flex', gap: '70px' }}>
      <div>
        <span className={styles.infoItem}>Данные бронирования</span>
        <div className={styles.infoItem}>
          <strong>Тип номера:</strong>
          <span>{roomName}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Дата заселения:</strong>
          <span>{startDate}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Дата выезда:</strong>
          <span>{endDate}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Стоимость:</strong>
          <span>{cost}</span>
        </div>
      </div>
      <div>
        <span className={styles.infoItem}>Данные клиента</span>
        <div className={styles.infoItem}>
          <strong>Имя:</strong>
          <span>{userFirstName}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Фамилия:</strong>
          <span>{userLastName}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Телефон:</strong>
          <span>{userPhone}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Статус оплаты:</strong>
          <span className={paymentStatus === 'PAID' ? styles.paid : styles.pending}>
            {paymentStatus === 'PAID' ? ' Оплачено' : ' Ожидает оплаты'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelBookingItem;
