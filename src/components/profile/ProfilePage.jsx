import { useEffect, useState } from 'react';
import styles from './profilePage.module.css';
import UserInfo from './UserInfo.jsx';
import BookingsList from './BookingsList.jsx';
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.profileWrapper}>
      <UserInfo setError={setError} />
      <BookingsList setError={setError} />
    </div>
  );
};

export default ProfilePage;
