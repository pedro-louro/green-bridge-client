import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBarUI';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stores from './pages/ListStores';
import MyStore from './pages/MyStore';
import StoreDetails from './pages/StoreDetails';
import Checkout from './pages/CheckOut';
import MyOrders from './pages/MyOrders';
import StoreOrders from './pages/StoreOrders';
import { ChakraProvider } from '@chakra-ui/react';
import OrdersToDeliver from './driver pages/OrdersToDeliver';
import OrderDetails from './driver pages/OrderDetails';
import DriverOrders from './driver pages/DriverOrders';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <NavBar />
        {/* <Navbar/> */}
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
          <Route
            path='/driver/orders'
            element={<OrdersToDeliver />}
          />
          <Route
            path='/driver/orders/:orderId'
            element={<OrderDetails />}
          />
          <Route
            path='/driver/myorders'
            element={<DriverOrders />}
          />
        </Routes>
      </ChakraProvider>
    </div>
  );
}
export default App;
