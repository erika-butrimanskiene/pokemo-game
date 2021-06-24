import React from 'react';

function PlayerDetailInventory({ player }) {
  return (
    <>
      {player
        .sort((a, b) => {
          return a.type < b.type ? -1 : 1;
        })
        .map((inventoryItem, index) => {
          return (
            <div className='player-detail__inventory' key={index}>
              <div
                className='player-detail__inventory-icon'
                style={{
                  backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${inventoryItem.image})`,
                }}
              ></div>
              <div className='player-detail__inventory-info-container'>
                <p className='player-detail__inventory-info'>
                  Type: <span>{inventoryItem.type} </span>{' '}
                </p>
                {inventoryItem.type === 'armor' && (
                  <p className='player-detail__inventory-info'>
                    Defence: <span>{inventoryItem.defence} </span>{' '}
                  </p>
                )}
                {inventoryItem.type === 'potion' && (
                  <p className='player-detail__inventory-info'>
                    Heals: <span>{inventoryItem.heals} </span>{' '}
                  </p>
                )}
                {inventoryItem.type === 'weapon' && (
                  <>
                    <p className='player-detail__inventory-info'>
                      Name: <span>{inventoryItem.name} </span>{' '}
                    </p>
                    <p className='player-detail__inventory-info'>
                      Damage: <span>{inventoryItem.damage}</span>{' '}
                    </p>
                  </>
                )}

                {inventoryItem.type === 'weapon' && (
                  <p className='player-detail__inventory-info'>
                    <span>{inventoryItem.special} </span>{' '}
                  </p>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
}

export default PlayerDetailInventory;
