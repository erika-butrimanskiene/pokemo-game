import React from 'react';
import { Link } from 'react-router-dom';
import { RiCoinsFill } from 'react-icons/ri';

import './PlayerForLeadingBoard.css';

function PlayerForLeadingBoard({ image, username, gold }) {
  return (
    <div className='player'>
      <div className='player__avatar-username'>
        <div
          className='player__avatar'
          style={{
            backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${image})`,
          }}
        ></div>
        <div className='player__username'>
          <h3>{username}</h3>
        </div>
      </div>

      <div className='player__gold-more'>
        <p className='player__gold'>
          <span>{gold}</span> <RiCoinsFill size={30} color={'gold'} />
        </p>

        <button className='player__seemore'>
          <Link to={'/board/' + username}>See more</Link>
        </button>
      </div>
    </div>
  );
}

export default PlayerForLeadingBoard;
