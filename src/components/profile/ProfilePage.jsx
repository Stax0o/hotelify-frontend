import { useEffect, useState } from 'react';
import styles from './profilePage.module.css';
import UserInfo from './UserInfo.jsx';
import BookingsList from './BookingsList.jsx';
import { useNavigate } from 'react-router-dom';
import OwnerHotelList from './OwnerHotelList.jsx';

const ProfilePage = () => {
  const [error, setError] = useState('');
  const [isHotels, setIsHotels] = useState(false);
  const navigate = useNavigate();

  const [trigger, setTrigger] = useState(0);
  const forceUpdate = () => setTrigger((prev) => prev + 1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.profileWrapper}>
      <UserInfo
        setError={setError}
        setIsHotels={setIsHotels}
        isHotels={isHotels}
        trigger={trigger}
      />
      {!isHotels ? (
        <BookingsList setError={setError} forceUpdate={forceUpdate} />
      ) : (
        <OwnerHotelList />
      )}
    </div>
  );
};

export default ProfilePage;
