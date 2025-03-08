import styles from './popUpForm.module.css';
import React, { useState } from 'react';
import { createTopUp } from '../../services/api.js';

const PopUpForm = ({ setShowForm }) => {
  const [popUpData, setPoUpData] = useState({
    type: 'BANKCARD',
    amount: 500,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTopUp(popUpData.type, popUpData.amount);
      setShowForm(false);
    } catch (e) {
      console.log('Ошибка пополнения', e.message);
    }
  };

  console.log(popUpData);

  return (
    <div className={styles.container}>
      <div className={styles.headerForm}>
        <h2>Форма</h2>
        <button className={styles.closeButton} onClick={() => setShowForm(false)}>
          X
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="dropdown">Тип оплаты</label>
          <select
            id="dropdown"
            value={popUpData.type}
            onChange={(e) => setPoUpData({ ...popUpData, type: e.target.value })}
          >
            <option value={'BANKCARD'}>Банковская карта</option>
            <option value={'SBP'}>СБП</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label>Сумма пополнения</label>
          <input
            type="number"
            min="500"
            value={popUpData.amount}
            onChange={(e) => setPoUpData({ ...popUpData, amount: parseInt(e.target.value) })}
            required
          />
        </div>
        <div className={styles.buttonSubmitBlock}>
          <button className={styles.buttonSubmit} type="submit">
            Пополнить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopUpForm;
