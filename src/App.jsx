import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Signup from './pages/Signup';
import Stores from './pages/Stores';
import MyStore from './pages/MyStore';
import StoreDetails from './pages/StoreDetails';
import Checkout from './pages/CheckOut';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/signup'
          element={<Signup />}
        />
        <Route
          path='/stores'
          element={<Stores />}
        />
        <Route
          path='/mystore'
          element={<MyStore />}
        />
        <Route
          path='/stores/:storeId'
          element={<StoreDetails />}
        />
        <Route
          path='/orders/:orderId/cart'
          element={<Checkout />}
        />
      </Routes>
    </div>
  );
}
export default App;
