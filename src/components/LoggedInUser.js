import React, { useContext } from 'react';
import './LoggedInUser.css';

//ICONS
import { RiCoinsFill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

//CONTEXTS IMPORT
import { SelectedInventoryContext } from '../pages/Arena';

//COMPONENTS
import ProgressBar from '../components/ProgressBar';

function LoggedInUser({
  image,
  username,
  health,
  gold,
  isArena,
  editClick,
  playerAnimationClass,
}) {
  //CONTEXTS
  //-- selected inventory
  const selectedInventory = useContext(SelectedInventoryContext);

  return (
    <div className={isArena ? 'arena-window__player' : 'game-window__player'}>
      <div
        className={
          isArena
            ? 'arena-window__player-details'
            : 'game-window__player-details'
        }
      >
        {!isArena && (
          <div className='game-window__edit-profile'>
            <FiEdit size={30} onClick={editClick} /> <span>Edit</span>
          </div>
        )}
        <div
          className={
            isArena
              ? `arena-window__player-avatar-username ${playerAnimationClass}`
              : 'game-window__player-avatar-username'
          }
        >
          {image && (
            <div
              className={
                isArena
                  ? 'arena-window__player-avatar'
                  : 'game-window__player-avatar'
              }
              style={{
                backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${image})`,
              }}
            ></div>
          )}
          <h2 className='game-window__player-username'>{username}</h2>
        </div>

        {isArena && (
          <div>
            {Object.keys(selectedInventory.selectedWeapon).length !== 0 && (
              <div
                className='arena-window__player-inventor'
                style={{
                  backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${selectedInventory.selectedWeapon.image})`,
                }}
              ></div>
            )}
            {Object.keys(selectedInventory.selectedArmor).length !== 0 && (
              <div
                className='arena-window__player-inventor'
                style={{
                  backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${selectedInventory.selectedArmor.image})`,
                }}
              ></div>
            )}
          </div>
        )}
      </div>
      <div
        className={
          isArena ? 'arena-window__player-status' : 'game-window__player-status'
        }
      >
        <ProgressBar bgColor='#077285' completed={health} />

        <div className='game-window__player-gold'>
          <span>{gold}</span>
          <RiCoinsFill color={'gold'} size={25} />
        </div>
      </div>
    </div>
  );
}

export default LoggedInUser;
