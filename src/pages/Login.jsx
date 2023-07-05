import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth.api';
import { AuthContext } from '../context/auth.context';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = { email, password };
      // const response = await login(user);
      const response = await toast.promise(login(user), {
        pending: 'We are had at work, please wait',
        success: 'Welcome',
        error: 'Something went wrong - try again later'
      });

      //Store the login token in the local storage (function from the auth context)

      storeToken(response.data.authToken);
      //verify the token
      authenticateUser();

      navigate('/');
    } catch (error) {
      console.log('Error logging in', error);
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };
  return (
    <div className='LoginPage'>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePassword}
        />

        <button type='submit'>Login</button>
      </form>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}

      <p>Don&apos;t have an account yet?</p>
      <Link to={'/signup'}> Sign Up</Link>
    </div>
  );
};

export default Login;
