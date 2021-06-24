import React from 'react';
import './ArmorsForShop.css';

//COMPONENTS
import Armor from './Armor';

function ArmorsForShop() {
  return (
    <div className='armors-wrapper'>
      <h2 className='armors-heading'>Armors</h2>
      <p className='armors-about'>
        Armors adds defence to hero while he is fighting monsters
      </p>
      <div className='armors-items'>
        <Armor
          image={'icons8-body-armor-100.png'}
          name={'Armor3'}
          defence={3}
          price={50}
          sellprice={10}
          type={'armor'}
          showBuyButton={true}
          showSellButton={false}
          toArenaModal={false}
        />
        <Armor
          image={'icons8-body-armor-100.png'}
          name={'Armor7'}
          defence={7}
          price={250}
          sellprice={100}
          type={'armor'}
          showBuyButton={true}
          showSellButton={false}
          toArenaModal={false}
        />
        <Armor
          image={'icons8-body-armor-100.png'}
          name={'Armor8'}
          defence={8}
          price={800}
          sellprice={300}
          type={'armor'}
          showBuyButton={true}
          showSellButton={false}
          toArenaModal={false}
        />
      </div>
    </div>
  );
}

export default ArmorsForShop;
