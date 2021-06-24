import React from 'react';
import { Link } from 'react-router-dom';
import './Board.css';

//ICONS
import { AiOutlineArrowLeft } from 'react-icons/ai';

//COMPONENTS
import PlayersBoard from '../components/PlayersBoard';

function Board() {
  return (
    <main>
      <div className='board-window-wrapper'>
        <div className='leaders-board'>
          <Link className='leaders-board__back' to='/'>
            <AiOutlineArrowLeft size={25} />
            Start Window
          </Link>

          <div className='leaders-board__heading'>
            <h1>LEADERS BOARD</h1>
          </div>

          <div className='leaders-board__leaders'>
            <PlayersBoard />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Board;
