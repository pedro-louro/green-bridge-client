import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBarUI';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Stores from './pages/ListStores';
import MyStore from './pages/MyStore';
import StoreDetails from './pages/StoreDetails';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import StoreOrders from './pages/StoreOrders';
import { ChakraProvider } from '@chakra-ui/react';
import OrdersToDeliver from './driver pages/OrdersToDeliver';
import OrderDetails from './driver pages/OrderDetails';
import DriverOrders from './driver pages/DriverOrders';
import UserDetails from './pages/UserDetails';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import HomePage from './pages/HomePage';
// import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <ChakraProvider>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/login'
            element={
              <IsAnon>
                <Login />
              </IsAnon>
            }
          />
          <Route
            path='/signup'
            element={
              <IsAnon>
                <Signup />
              </IsAnon>
            }
          />
          <Route
            path='/stores'
            element={
              <IsPrivate>
                <Stores />
              </IsPrivate>
            }
          />
          <Route
            path='/mystore'
            element={
              <IsPrivate>
                <MyStore />
              </IsPrivate>
            }
          />
          <Route
            path='/mystore/:storeId/orders'
            element={
              <IsPrivate>
                <StoreOrders />
              </IsPrivate>
            }
          />
          <Route
            path='/stores/:storeId'
            element={
              <IsPrivate>
                <StoreDetails />
              </IsPrivate>
            }
          />

          <Route
            path='/mycart'
            element={
              <IsPrivate>
                <Checkout />
              </IsPrivate>
            }
          />
          <Route
            path='/myorders'
            element={
              <IsPrivate>
                <MyOrders />
              </IsPrivate>
            }
          />
          <Route
            path='/userdetails'
            element={
              <IsPrivate>
                <UserDetails />
              </IsPrivate>
            }
          />
          <Route
            path='/driver/orders'
            element={
              <IsPrivate>
                <OrdersToDeliver />
              </IsPrivate>
            }
          />
          <Route
            path='/driver/orders/:orderId'
            element={
              <IsPrivate>
                <OrderDetails />
              </IsPrivate>
            }
          />
          <Route
            path='/driver/myorders'
            element={
              <IsPrivate>
                <DriverOrders />
              </IsPrivate>
            }
          />
        </Routes>
      </ChakraProvider>
    </div>
  );
}
export default App;
