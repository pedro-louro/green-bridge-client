import { createContext, useState, useEffect } from 'react';
import { verify } from '../api/auth.api';

const AuthContext = createContext();

const AuthProviderWrapper = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };
  const authenticateUser = async () => {
    //get token from local storage
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      try {
        const response = await verify(storedToken);
        const user = response.data;

        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem('userId', response.data._id);
      } catch (error) {
        console.log('An error occurred authenticating the user', error);

        //if token is invalid, the server response is an error
        setUser(null);
        setIsLoggedIn(false);
      }
    } else {
      //if token does not exist
      setUser(null);
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // delete token from localstorage
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    //to log out use, remove token
    removeToken();

    // to update the state variables (isLoggedIn etc)
    authenticateUser();
  };
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        storeToken,
        authenticateUser,
        logOutUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProviderWrapper };
