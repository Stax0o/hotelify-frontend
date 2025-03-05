import React, {useState} from 'react';
import styles from './hotelCard.module.css';

const HotelCard = ({ name, city, imagePaths = [] }) => {
  const IMAGE_URL = 'http://localhost:8081/';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagePaths.length) % imagePaths.length);
  };

  return (
    <div className={styles.card}>
      {/* Блок с изображениями */}
      <div className={styles.imageSlider}>
        {imagePaths.length > 0 && (
          <>
            <img
              src={IMAGE_URL + imagePaths[currentImageIndex]}
              alt={name}
              className={styles.hotelImage}
            />

            {/* Навигационные стрелки */}
            {imagePaths.length > 1 && (
              <>
                <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={handlePrev}>
                  ‹
                </button>
                <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={handleNext}>
                  ›
                </button>
              </>
            )}

            {/* Точки-индикаторы */}
            {imagePaths.length > 1 && (
              <div className={styles.dots}>
                {imagePaths.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${
                      index === currentImageIndex ? styles.activeDot : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Остальная часть карточки */}
      <div className={styles.header}>
        <h3 className={styles.title}>{name}</h3>
        <span className={styles.city}>{city}</span>
      </div>

      {/*todo добавить минимальную стоимость*/}
      <div className={styles.price}>от 1000 ₽</div>

      <button className={styles.bookButton}>Забронировать</button>
    </div>
  );
};

export default HotelCard;
