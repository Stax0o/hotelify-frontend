import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../services/api.js';
import UserIcon from './UserIcon.jsx';

const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    const syncAuthState = () => {
      setToken(localStorage.getItem('token') || '');
      setUsername(localStorage.getItem('username') || '');
    };

    window.addEventListener('storage', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
    };
  }, []);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const data = await fetchUserProfile();
          const username = `${data.firstName} ${data.lastName}`;
          setUsername(username);
          localStorage.setItem('username', username);
        } catch (e) {
          console.log('Ошибка при получении профиля', e.message);
        }
      })();
    }
  }, [token]);

  return (
    <header className={styles.header}>
      <Link to="." className={styles.logo}>
        Hotelify
      </Link>
      {!token ? (
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${styles.loginButton}`}
            onClick={() => navigate('login')}
          >
            Войти
          </button>
          <button
            className={`${styles.button} ${styles.registerButton}`}
            onClick={() => navigate('register')}
          >
            Регистрация
          </button>
        </div>
      ) : (
        <div className={styles.buttons}>
          <Link to="profile" className={styles.userName}>
            {username}
          </Link>
          <button
            onClick={() => {
              navigate('profile');
            }}
            className={styles.userIcon}
          >
            <UserIcon />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
