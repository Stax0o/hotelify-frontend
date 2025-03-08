import HotelList from './HotelList.jsx';
import Search from './Search.jsx';
import styles from './homePage.module.css';
import {useState} from "react";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Найдите идеальный отель для вашего отдыха</h1>
        <p className={styles.subtitle}>Лучшие цены и удобное бронирование</p>
      </div>
      <Search setHotels={setHotels}/>
      <HotelList setHotels={setHotels} hotels={hotels}/>
    </>
  );
};

export default HomePage;
