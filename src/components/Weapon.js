import React, { useContext, useRef } from 'react';
import nextId from 'react-id-generator';
import './Weapon.css';

//CONTEXTS IMPORT
import { HandleShopContext } from '../pages/Shop';
import { HandleSellContext } from '../pages/Inventory';
import { SelectedInventoryContext } from '../pages/Arena';

//COMPONENTS
import Button from './Button';

function Weapon({
  name,
  damage,
  price,
  sellprice,
  special,
  image,
  type,
  showBuyButton,
  showSellButton,
  toArenaModal,
  index,
}) {
  //CONTEXTS
  //--handle shop
  const handleShop = useContext(HandleShopContext);
  //--handle sell
  const handleSell = useContext(HandleSellContext);

  //--handle inventory to fight selection
  const handleInventorySelection = useContext(SelectedInventoryContext);

  //REFS
  const selectedStyle = useRef();

  const inventorItem = {
    id: nextId(),
    type,
    name,
    damage,
    price,
    sellprice,
    special,
    image,
  };

  //FUNCTIONS
  //-- handle inventory set
  const selectWeapon = () => {
    handleInventorySelection.setSelectedWeapon({ image, damage, special });
  };

  const selectWeaponStyle = () => {
    selectedStyle.current.style.border = '2px solid #aa0581';
    selectedStyle.current.style.borderRadius = '15px';
  };

  const unselectWeaponStyle = () => {
    selectedStyle.current.style.border = 'none';
  };

  return (
    <div
      className='weapon'
      onClick={toArenaModal ? selectWeapon : undefined}
      onMouseEnter={toArenaModal ? selectWeaponStyle : undefined}
      onMouseLeave={toArenaModal ? unselectWeaponStyle : undefined}
    >
      <div className='weapon__about'>
        <div
          ref={selectedStyle}
          className='weapon__icon'
          style={{
            backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${image})`,
          }}
        ></div>
        <div className='weapon__info-container'>
          {showBuyButton && (
            <p className='weapon__info'>
              Name: <span>{name}</span>
            </p>
          )}
          <p className='weapon__info'>
            Damage: <span>{damage}</span>{' '}
          </p>
          {showBuyButton && (
            <p className='weapon__info'>
              Price: <span>{price}</span>
            </p>
          )}
          {!toArenaModal && (
            <p className='weapon__info'>
              Sell price: <span>{sellprice}</span>{' '}
            </p>
          )}
        </div>
      </div>
      {showBuyButton && (
        <div
          className='weapon-button'
          onClick={(e) => {
            handleShop.addInventoryToUser(e, price, inventorItem);
          }}
        >
          <Button className='button btn-pink' text='Buy' />
        </div>
      )}

      {showSellButton && (
        <div
          className='weapon-button'
          onClick={(e) => {
            handleSell.removeInventoryFromUser(e, sellprice, index);
          }}
        >
          <Button className='button btn-pink' text='Sell' />
        </div>
      )}

      <p className='weapon__info special'>
        <span>{special}</span>
      </p>
    </div>
  );
}

export default Weapon;
