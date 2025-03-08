import { useEffect, useState } from 'react';
import { fetchRoomsByHotelId } from '../../services/api.js';
import RoomItem from './RoomItem.jsx';
import styles from './hotelSettings.module.css';

const RoomsList = ({ hotelId }) => {
  const [rooms, setRooms] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const forceUpdate = () => setTrigger((prev) => prev + 1);

  useEffect(() => {
    (async () => {
      try {
        const rooms = await fetchRoomsByHotelId(hotelId);
        setRooms(rooms);
      } catch (e) {
        console.error(e.message);
      }
    })();
  }, [hotelId, isCreate, trigger]);

  return (
    <>
      {rooms.map((room) => (
        <RoomItem {...room} key={room.id} forceUpdate={forceUpdate} />
      ))}
      {!isCreate ? (
        <button
          className={styles.addButton}
          onClick={() => {
            setIsCreate(true);
          }}
        >
          +
        </button>
      ) : (
        <RoomItem
          isCreate={isCreate}
          setIsCreate={setIsCreate}
          hotelId={hotelId}
          forceUpdate={forceUpdate}
        />
      )}
    </>
  );
};

export default RoomsList;
