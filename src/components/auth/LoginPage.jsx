import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './authPage.module.css';
import { loginUser } from '../../services/api.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      window.dispatchEvent(new Event('storage'));
      navigate('..');
    } catch (error) {
      setError('Ошибка входа, проверьте корректность данных');
      setTimeout(() => {
        setError('');
      }, 5000);
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
          {error && <p className="error">{error}</p>}
          <button type="submit" className={styles.authButton}>
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
