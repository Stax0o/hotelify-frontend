import HotelList from "./HotelList.jsx";

const HomePage = () => {
  return (
    <>
      <div>
        <h1>Найдите идеальный отель для вашего отдыха</h1>
        <p>Лучшие цены и удобное бронирование</p>
      </div>

      {/*todo фильтры*/}
      <div>Фильтры</div>

      <HotelList/>
    </>
  );
};

export default HomePage;
