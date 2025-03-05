import React, { useState } from 'react';
import styles from './imageSlider.module.css';

const ImageSlider = ({ imagePaths }) => {
  const IMAGE_URL = 'http://localhost:8081/';
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imagePaths.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imagePaths.length) % imagePaths.length);
  };

  return (
    <div className={styles.imageSlider}>
      {imagePaths.length > 0 && (
        <>
          <img
            src={IMAGE_URL + imagePaths[currentImageIndex]}
            alt="Фото отеля"
            className={styles.image}
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
                  className={`${styles.dot} ${index === currentImageIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageSlider;
