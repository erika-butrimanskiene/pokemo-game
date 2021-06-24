import React from 'react';

//COMPONENTS
import Armor from '../components/Armor';
import Weapon from '../components/Weapon';
import Potion from '../components/Potion';

function InventoryList({
  inventory,
  inventoryType,
  showSellButton,
  toArenaModal,
}) {
  return (
    <>
      {inventory.length > 0 &&
        inventory
          .sort((a, b) => {
            return a.type < b.type ? -1 : 1;
          })
          .map((inventoryItem, index) => {
            let returnItem;

            if (
              (inventoryItem.type === 'armor' && inventoryType === 'armor') ||
              (inventoryItem.type === 'armor' && inventoryType === 'all')
            ) {
              returnItem = (
                <Armor
                  key={index}
                  index={index}
                  name={inventoryItem.name}
                  image={inventoryItem.image}
                  defence={inventoryItem.defence}
                  price={inventoryItem.price}
                  sellprice={inventoryItem.sellprice}
                  type={inventoryItem.type}
                  showBuyButton={false}
                  showSellButton={showSellButton}
                  toArenaModal={toArenaModal}
                />
              );
            }

            if (
              (inventoryItem.type === 'weapon' && inventoryType === 'weapon') ||
              (inventoryItem.type === 'weapon' && inventoryType === 'all')
            ) {
              returnItem = (
                <Weapon
                  key={index}
                  index={index}
                  image={inventoryItem.image}
                  name={inventoryItem.name}
                  damage={inventoryItem.damage}
                  price={inventoryItem.price}
                  sellprice={inventoryItem.sellprice}
                  special={inventoryItem.special}
                  type={inventoryItem.type}
                  showBuyButton={false}
                  showSellButton={showSellButton}
                  toArenaModal={toArenaModal}
                />
              );
            }

            if (
              (inventoryItem.type === 'potion' && inventoryType === 'potion') ||
              (inventoryItem.type === 'potion' && inventoryType === 'all')
            ) {
              returnItem = (
                <Potion
                  key={index}
                  index={index}
                  heals={inventoryItem.heals}
                  price={inventoryItem.price}
                  sellprice={inventoryItem.sellprice}
                  image={inventoryItem.image}
                  type={inventoryItem.type}
                  showBuyButton={false}
                  showSellButton={showSellButton}
                  toArenaModal={toArenaModal}
                />
              );
            }
            return returnItem;
          })}
    </>
  );
}

export default InventoryList;
