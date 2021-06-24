import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

//CONTEXTS IMPORT
import { AuthenticationContext } from '../App';

//COMPONENTS
import Button from '../components/Button';

function Login() {
  //STATES
  //-- states for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //-- state to login error message
  const [loginErrorMessage, setloginErrorMessage] = useState('');

  //CONTEXTS
  //-- authentification
  const auth = useContext(AuthenticationContext);

  //ENDPOINTS
  const URL = 'https://pokemo-game.herokuapp.com/user/login';

  //FUNCTIONS
  //-- to handle login
  const loginHandler = async (e) => {
    e.preventDefault();

    if (username !== '' && password !== '') {
      let userData = {
        username,
        password,
      };
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        return setloginErrorMessage(data.msg);
      } else {
        let token = response.headers.get('game-token');
        auth.setAuthentication(true);
        localStorage.setItem('game-auth', token);
        return (window.location.href = '/');
      }
    } else {
      return setloginErrorMessage('*Please fill in all fields');
    }
  };

  //-- handle enter on keyup
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById('login-submit').click();
    }
  };

  return (
    <main>
      <div className='login-wrapper'>
        <div className='login-heading'>
          <h1>Let's Game!</h1>
        </div>

        <form className='login-form' onSubmit={loginHandler}>
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className='login-form__username'
            type='text'
            value={username}
            placeholder='username'
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyUp={handleEnter}
            className='login-form__password'
            type='password'
            value={password}
            placeholder='password'
          />
          <div id='login-submit'>
            <Button className='button btn-pink' text='Log In' />
          </div>

          {loginErrorMessage && (
            <p className='login-error-msg'>{loginErrorMessage}</p>
          )}
        </form>
        <p className='signUp-link'>
          Don't have an account? What are you waiting for? <br />
          <Link to='/signUp'>Sign up NOW !</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
