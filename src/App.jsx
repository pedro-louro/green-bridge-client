import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Signup from './pages/Signup';
import Stores from './pages/Stores';

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
      </Routes>
    </div>
  );
}

export default App;
