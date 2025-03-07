import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/HomePage.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import LoginPage from './components/auth/LoginPage.jsx';
import RegisterPage from './components/auth/RegisterPage.jsx';
import ProfilePage from './components/profile/ProfilePage.jsx';
import Hotel from './components/hotel/Hotel.jsx';
import CreateHotel from './components/createHotel/CreateHotel.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="hotel/:hotelId" element={<Hotel />} />
            <Route path="profile/create-hotel" element={<CreateHotel />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
