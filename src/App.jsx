import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Signup from './pages/Signup';
import Stores from './pages/ListStores';
import MyStore from './pages/MyStore';
import StoreDetails from './pages/StoreDetails';
import Checkout from './pages/CheckOut';
import MyOrders from './pages/MyOrders';
import StoreOrders from './pages/StoreOrders';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <ToastContainer />

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
          path='/mystore/:storeId/orders'
          element={<StoreOrders />}
        />
        <Route
          path='/stores/:storeId'
          element={<StoreDetails />}
        />

        <Route
          path='/mycart'
          element={<Checkout />}
        />
        <Route
          path='/myorders'
          element={<MyOrders />}
        />
      </Routes>
    </div>
  );
}
export default App;
