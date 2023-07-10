import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

//

const Navbar = () => {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <nav className='Navbar'>
      <ul>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'selected' : '')}
        >
          Home
        </NavLink>
        {isLoggedIn && (
          <>
            <NavLink
              to='/stores'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Stores
            </NavLink>
            <NavLink to={`/mystore`}>My Store</NavLink>
            <NavLink onClick={logOutUser}>Logout</NavLink>
          </>
        )}
        {!isLoggedIn && (
          <>
            <NavLink
              to='/signup'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Signup
            </NavLink>
            <NavLink
              to='/login'
              className={({ isActive }) => (isActive ? 'selected' : '')}
            >
              Login
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;