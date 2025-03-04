import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './authPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // todo Добавить API запрос на авторизацию
      console.log('Logging in with:', { email, password });
      navigate('..');
    } catch (error) {
      console.error('LoginPage failed:', error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.authTitle}>Вход</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.authButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
