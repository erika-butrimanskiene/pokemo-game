import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './GameWindow.css';

//CONTEXTS IMPORT
import { UserInfoContext } from '../App';
import { AuthenticationContext } from '../App';

//ICONS
import { GiBattleGear } from 'react-icons/gi';
import { GiBattleMech } from 'react-icons/gi';
import { AiOutlineShop } from 'react-icons/ai';
import { BsClipboardData } from 'react-icons/bs';

//COMPONENTS
import Modal from '../components/Modal';
import LoggedInUser from '../components/LoggedInUser';

function GameWindow() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //-- authentification
  const auth = useContext(AuthenticationContext);
  //STATES
  //-- edit modal msg
  const [editMsg, setEditMsg] = useState('');

  //ENDPOINTS
  const URL = 'https://pokemo-game.herokuapp.com/user/logout';

  //FUNCTIONS
  //-- handle user logout
  const handleLogout = async () => {
    let token = localStorage.getItem('game-auth');
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'game-token': token,
      },
    });

    if (response.status === 200) {
      localStorage.removeItem('game-auth');
      auth.setAuthentication(false);
    }
  };

  //-- handle profile edit
  const handleProfileEdit = () => {
    setEditMsg('Edit Your Profile');
  };

  const closeEditModal = () => {
    setEditMsg('');
  };

  return (
    <main>
      <div className='game-window-wrapper'>
        <h1 className='game-window-heading'>LET'S START!</h1>
        <div className='game-window'>
          <LoggedInUser
            image={user.userInfo.image}
            username={user.userInfo.username}
            health={user.userInfo.health}
            gold={user.userInfo.gold}
            isArena={false}
            editClick={handleProfileEdit}
          />

          <div className='game-window__links'>
            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/shop'>
                <AiOutlineShop size={55} />
                <span>SHOP</span>
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/inventory'>
                <GiBattleGear size={55} />
                <span>INVENTORY</span>
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/arena'>
                <GiBattleMech size={55} />
                <span>ARENA</span>
              </Link>
            </div>

            <div className='game-window__link-container'>
              <Link className='game-window__link' to='/board'>
                <BsClipboardData size={50} />
                <span>BOARD</span>
              </Link>
            </div>

            <div className='game-window__logout' onClick={handleLogout}>
              LOGOUT
            </div>
          </div>
        </div>

        <p className='icons-copyrights'>
          Icons made by{' '}
          <a
            href='https://www.flaticon.com/authors/darius-dan'
            title='Darius Dan'
          >
            Darius Dan
          </a>{' '}
          and <a href='https://icons8.com/'>Icons8</a>
        </p>

        {editMsg !== '' && (
          <Modal
            modalMsg={editMsg}
            handleCloseModal={closeEditModal}
            editProfileModal={true}
          />
        )}
      </div>
    </main>
  );
}

export default GameWindow;
