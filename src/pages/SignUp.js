import React, { useState, useRef } from 'react';
import './SignUp.css';

//COMPONENTS
import Button from '../components/Button';

function SignUp() {
  //STATES
  //-- new user state
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    passwordSecond: '',
  });
  //-- error message state
  const [signUpErrorMessage, setSignUpErrorMessage] = useState('');

  //REFS
  const clickOnEnter = useRef();

  //ENDPOINTS

  const URL = 'https://pokemo-game.herokuapp.com/user/signup';

  //FUNCTIONS
  //-- handle newUser change
  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  //-- handle newUser submit
  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    if (
      newUser.username !== '' &&
      newUser.password !== '' &&
      newUser.passwordSecond !== ''
    ) {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (data.success === false) {
        return setSignUpErrorMessage(data.msg);
      } else {
        return (window.location.href = '/');
      }
    } else {
      return setSignUpErrorMessage('*Please fill in all fields');
    }
  };

  //-- handle enter on keyup

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      clickOnEnter.click();
    }
  };

  return (
    <main>
      <div className='signup-wrapper'>
        <div className='signup-heading'>
          <h2>Sign Up</h2>
        </div>
        <form className='signup-form' onSubmit={handleNewUserSubmit}>
          <label htmlFor='username'>Your username</label>
          <input
            className='signup-form__userName'
            id='username'
            type='text'
            name='username'
            value={newUser.userName}
            placeholder='type your username'
            onChange={handleNewUserChange}
          />
          <label htmlFor='password'>Your password</label>
          <input
            className='signup-form__password'
            id='password'
            type='password'
            name='password'
            value={newUser.password}
            placeholder='type your password'
            onChange={handleNewUserChange}
            onKeyUp={handleEnter}
          />
          <label htmlFor='passwordSecond'>Repeat password</label>
          <input
            className='signup-form__passwordSecond'
            id='passwordSecond'
            type='password'
            name='passwordSecond'
            value={newUser.passwordSecond}
            placeholder='repeat your password'
            onChange={handleNewUserChange}
            onKeyUp={handleEnter}
          />
          <div ref={clickOnEnter} id='signup-submit'>
            <Button className='button btn-pink' text='Sign Up' />
          </div>

          <p className='error-msg'>{signUpErrorMessage}</p>
        </form>
      </div>
    </main>
  );
}

export default SignUp;
