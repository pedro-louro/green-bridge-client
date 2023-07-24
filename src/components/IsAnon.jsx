import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Navigate } from 'react-router-dom';

const IsAnon = props => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  //if the use is Logged in, they won't be able to see the login page

  if (isLoading) return <p>Loading...</p>;
  if (isLoggedIn) {
    return <Navigate to='/' />;
  } else {
    return props.children;
  }
};

export default IsAnon;
