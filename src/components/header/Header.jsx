import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <Link to="." className={styles.logo}>Hotelify</Link>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.loginButton}`} onClick={() => navigate('login')}>
          Войти
        </button>
        <button className={`${styles.button} ${styles.registerButton}`} onClick={() => navigate('register')}>
          Регистрация
        </button>
      </div>
    </header>
  );
};

export default Header;
