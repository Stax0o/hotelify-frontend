import React, { useEffect, useState } from 'react';
import styles from './hotelSettings.module.css';
import { createRooms, updateRoomType } from '../../services/api.js';

const RoomItem = (props) => {
  const { name = '', price = 0, count = 0, isCreate, setIsCreate, hotelId, forceUpdate } = props;
  const [roomData, setRoomData] = useState({
    name: name,
    price: price,
    count: count,
  });
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const priceChanged = parseFloat(roomData.price) !== parseFloat(price);
    const countChanged = parseInt(roomData.count) !== parseInt(count);

    setIsModified(roomData.name !== name || priceChanged || countChanged);
  }, [roomData, name, price, count]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isCreate) {
        await createRooms(hotelId, roomData.name, roomData.price, roomData.count);
        setIsCreate(false);
      } else {
        await updateRoomType(roomData.name, roomData.price, roomData.count);
        forceUpdate();
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleRemove = async () => {
    forceUpdate();
  };

  return (
    // todo дописать Handler для обновления номеров
    <form onSubmit={handleSubmit} className={`${styles.form} ${styles.container}`}>
      <div className={styles.inputGroup}>
        <h2 className={styles.title} style={{ margin: 0 }}>
          {name}
        </h2>
        <label>Тип номера</label>
        <input
          type="text"
          value={roomData.name}
          onChange={(e) => setRoomData({ ...roomData, name: e.target.value })}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Стоимость за ночь</label>
        <input
          type="number"
          min="1"
          value={roomData.price}
          onChange={(e) => setRoomData({ ...roomData, price: e.target.value })}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label>Количество номеров</label>
        <input
          type="number"
          min="0"
          value={roomData.count}
          onChange={(e) => setRoomData({ ...roomData, count: e.target.value })}
          required
        />
      </div>
      {isModified || isCreate ? (
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            {isCreate ? 'Создать номера' : 'Сохранить изменения'}
          </button>
        </div>
      ) : (
        <div className={styles.buttonContainer}>
          <button onClick={handleRemove} className={`${styles.button} ${styles.redButton}`}>
            Удалить все номера
          </button>
        </div>
      )}
    </form>
  );
};

export default RoomItem;
