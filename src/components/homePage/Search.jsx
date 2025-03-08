import styles from './search.module.css';
import { useState } from 'react';
import { fetchHotels } from '../../services/api.js';

const Search = ({ setHotels }) => {
  const [data, setData] = useState({
    date: '',
    city: '',
    price: '',
  });

  const handleClick = async () => {
    const hotels = await fetchHotels(data.date, data.city, data.price);
    setHotels(hotels);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          Город
          <input
            type="text"
            value={data.city}
            onChange={(e) => setData({ ...data, city: e.target.value })}
            placeholder="Введите город"
            className={styles.filterInput}
          />
        </label>

        <label className={styles.filterLabel}>
          Дата
          <input
            type="date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            className={styles.filterInput}
          />
        </label>

        <label className={styles.filterLabel}>
          Цена до
          <input
            type="number"
            min="0"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            placeholder="Макс. цена"
            className={styles.filterInput}
          />
        </label>
      </div>
      <button onClick={handleClick} className={styles.searchButton}>
        Поиск
      </button>
    </div>
  );
};

export default Search;
