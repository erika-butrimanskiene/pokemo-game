import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './PlayerDetail.css';

//ICONS
import { RiCoinsFill } from 'react-icons/ri';
import { AiOutlineArrowLeft } from 'react-icons/ai';

//COMPONENTS
import ProgressBar from '../components/ProgressBar';
import PlayerDetailInventory from '../components/PlayerDetailInventory';

function PlayerDetail() {
  //STATES
  //--player
  const [player, setPlayer] = useState({});
  const [show, setShow] = useState(false);
  console.log(player);

  //PARAMS
  let { username } = useParams();

  //EFFECTS
  //-- to set player

  useEffect(() => {
    const URL = `https://pokemo-game.herokuapp.com/users/${username}`;
    const getUserByUsername = async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPlayer(data);
      setShow(true);
    };

    getUserByUsername();
  }, [username]);

  return (
    <main>
      <div className='player-detail-window-wrapper'>
        <Link className='player-detail__back' to='/'>
          <AiOutlineArrowLeft size={25} />
          Start Window
        </Link>
        {show && (
          <>
            <div className='player-detail'>
              <div className='player-detail__about-user'>
                <div className='player-detail__avatar-username'>
                  {
                    <div
                      className='player-detail__avatar'
                      style={{
                        backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${player.image})`,
                      }}
                    ></div>
                  }

                  <div className='player-detail__username'>
                    <h3>{player.username}</h3>
                  </div>
                </div>
                <div className='player-detail__gold-health'>
                  <ProgressBar bgColor='#077285' completed={player.health} />
                  <p className='player-detail__gold'>
                    {' '}
                    <span>{player.gold}</span>{' '}
                    <RiCoinsFill size={30} color={'gold'} />
                  </p>
                </div>
              </div>

              <div>
                <h2 className='player-detail__inventory-list-heading'>
                  INVENTORY LIST
                </h2>
              </div>
              <div className='player-detail__inventory-list'>
                <PlayerDetailInventory player={player.inventory} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default PlayerDetail;
