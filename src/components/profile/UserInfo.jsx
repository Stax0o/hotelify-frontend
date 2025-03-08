import styles from './profilePage.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../../services/api.js';
import PopUpForm from '../popUpForm/PopUpForm.jsx';

const UserInfo = ({ setError, isHotels, setIsHotels, trigger }) => {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  const handleToggle = () => {
    setIsHotels(!isHotels);
  };

  useEffect(() => {
    (async () => {
      try {
        const userData = await fetchUserProfile();
        setUser(userData);
      } catch (err) {
        setError('Ошибка загрузки данных');
      }
    })();
  }, [showForm, trigger]);

  if (!user)
    return (
      <div className={`${styles.profileContainer} ${styles.userInfoContainer}`}>
        <h2>Данные аккаунта</h2>
        <p className={styles.loading}>Загрузка...</p>
      </div>
    );

  return (
    <div>
      <div className={`${styles.profileContainer} ${styles.userInfoContainer}`}>
        <h2>Данные аккаунта</h2>
        <p>
          <strong>Имя:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Телефон:</strong> {user.phone}
        </p>
        <p>
          <strong>Роль:</strong> {user.userRole === 'USER' ? 'Пользователь' : 'Владелец отеля'}
        </p>
        <div style={{ display: 'flex' }}>
          <p style={{ margin: 'auto 0' }}>
            <strong>Баланс:</strong> {user.balance} руб.
          </p>
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className={`${styles.topUpButton} ${styles.button}`}
          >
            Пополнить
          </button>
        </div>
        <button className={`${styles.redButton} ${styles.button}`} onClick={handleLogout}>
          Выход
        </button>
      </div>
      {user.userRole === 'OWNER' && (
        <div className={styles.buttonContainer}>
          <button className={`${styles.button} ${styles.blueButton}`} onClick={handleToggle}>
            {isHotels ? 'Бронирования' : 'Отели'}
          </button>
        </div>
      )}
      {showForm && <PopUpForm setShowForm={setShowForm} />}
    </div>
  );
};

export default UserInfo;
