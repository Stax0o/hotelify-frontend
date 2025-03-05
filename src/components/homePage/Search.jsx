import styles from './search.module.css';

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>
          Город
          <input
            type="text"
            placeholder="Введите город"
            className={styles.filterInput}
          />
        </label>

        <label className={styles.filterLabel}>
          Дата
          <input
            type="date"
            className={styles.filterInput}
          />
        </label>

        <label className={styles.filterLabel}>
          Цена до
          <input
            type="number"
            placeholder="Макс. цена"
            className={styles.filterInput}
          />
        </label>
      </div>

      <button className={styles.searchButton}>
        Поиск
      </button>
    </div>
  );
};

export default Search;