import React from 'react';
import './PotionsForShop.css';

//COMPONENTS
import Potion from './Potion';

function PotionsForShop() {
  return (
    <div className='potions-wrapper'>
      <h2 className='potions-heading'>Potions</h2>
      <p className='potions-about'>
        Potions is needed to heal player during the battle
      </p>
      <div className='potions-items'>
        <Potion
          heals={20}
          price={10}
          sellprice={5}
          image={'icons8-mana-100.png'}
          type={'potion'}
          showBuyButton={true}
          showSellButton={false}
          toArenaModal={false}
        />
        <Potion
          heals={35}
          price={30}
          sellprice={10}
          image={'icons8-mana-100.png'}
          type={'potion'}
          showBuyButton={true}
          showSellButton={false}
          toArenaModal={false}
        />
        <Potion
          heals={50}
          price={60}
          sellprice={20}
          image={'icons8-mana-100.png'}
          type={'potion'}
          showBuyButton={true}
          showSellButton={false}
          toArenaModal={false}
        />
      </div>
    </div>
  );
}

export default PotionsForShop;
