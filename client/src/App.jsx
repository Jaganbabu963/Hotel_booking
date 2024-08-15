import { Routes, Route } from 'react-router-dom';
import Indexpage from './pages/Indexpage';
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './UserContext';
import axios from 'axios';
import AccountPage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import AddNewPlace from './pages/AddNewPlace';
import EachPage from './pages/EachPage';
import BookingPage from './pages/BookingPage';
import Bookings from './pages/Bookings';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<AccountPage />} />
          <Route path="/account/accommodations" element={<PlacesPage />} />
          <Route path="/account/accommodations/new" element={<AddNewPlace />} />
          <Route path="/account/accommodations/:id" element={<AddNewPlace />} />
          <Route path="/:id" element={<EachPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/account/bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
