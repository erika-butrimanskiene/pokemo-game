import React, { useState, useEffect } from 'react';

//COMPONENTS
import PlayerForLeadingBoard from './PlayerForLeadingBoard';

function PlayersBoard() {
  //STATES
  //-- players
  const [players, setPlayers] = useState([]);

  //EFFECTS
  //-- to set players
  useEffect(() => {
    const URL = 'https://pokemo-game.herokuapp.com/users';

    const getUsers = async () => {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      await setPlayers(data);
      console.log(data);
    };

    getUsers();
  }, []);

  return players
    .sort((a, b) => {
      return a.gold > b.gold ? -1 : 1;
    })
    .map((player) => (
      <PlayerForLeadingBoard
        image={player.image}
        username={player.username}
        gold={player.gold}
        key={player._id}
      />
    ));
}

export default PlayersBoard;
