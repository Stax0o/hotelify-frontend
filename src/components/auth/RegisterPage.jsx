import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './authPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userRole: 'USER',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // todo Добавить API запрос на регистрацию
      console.log('Registering with:', formData);
      navigate('..');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <h2 className={styles.authTitle}>Регистрация</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Имя</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Роль</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="userRole"
                  value="USER"
                  checked={formData.userRole === 'USER'}
                  onChange={handleChange}
                />
                Пользователь
              </label>
              <label>
                <input
                  type="radio"
                  name="userRole"
                  value="OWNER"
                  checked={formData.userRole === 'OWNER'}
                  onChange={handleChange}
                />
                Владелец отеля
              </label>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.authButton}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
