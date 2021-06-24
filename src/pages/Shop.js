import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

//CONTEXTS IMPORT
import { UserInfoContext } from '../App';

//ICONS
import { AiOutlineArrowLeft } from 'react-icons/ai';

//COMPONENTS
import ArmorsForShop from '../components/ArmorsForShop';
import WeaponsForShop from '../components/WeaponsForShop';
import PotionsForShop from '../components/PotionsForShop';
import Modal from '../components/Modal';

export const HandleShopContext = React.createContext();

function Shop() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);
  //STATES
  //-- shop msg
  const [shopMsg, setShopMsg] = useState('');

  //FUNCTIONS
  //--add inventory to user state
  const addInventoryToUser = async (e, price, inventorItem) => {
    e.preventDefault();
    if (user.userInfo.gold >= price) {
      if (inventorItem.type !== 'potion') {
        const find = user.userInfo.inventory.find(
          (item) => item.name === inventorItem.name
        );

        if (find !== undefined) {
          setShopMsg('You already have this item at your inventory list.');
        } else {
          setShopMsg('Inventory sucessfully added.');
          await fetchToUpdateUser(user.userInfo._id, price, inventorItem);
          user.invokeGetUserFetch();
        }
      } else {
        setShopMsg('Inventory sucessfully added.');
        await fetchToUpdateUser(user.userInfo._id, price, inventorItem);
        user.invokeGetUserFetch();
      }
    } else {
      setShopMsg("Sorry, but You don't have enough money.");
    }
  };

  //-- fetch to update user
  const fetchToUpdateUser = async (id, price, inventorItem) => {
    const URL = `https://pokemo-game.herokuapp.com/user/${id}`;
    const token = localStorage.getItem('game-auth');
    const updateUser = async () => {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'game-token': token,
        },
        body: JSON.stringify({
          ...user.userInfo,
          inventory: [...user.userInfo.inventory, inventorItem],
          gold: user.userInfo.gold - price,
        }),
      });

      return response;
    };
    await updateUser();
  };

  const closeModal = () => {
    setShopMsg('');
  };

  return (
    <main>
      <div className='shop-window-wrapper'>
        <Link className='shop-window__back' to='/'>
          <AiOutlineArrowLeft size={25} />
          Start Window
        </Link>
        <h1 className='shop-window-heading'>SHOP</h1>
        <div className='shop-window'>
          <HandleShopContext.Provider value={{ addInventoryToUser }}>
            <ArmorsForShop />
            <WeaponsForShop />
            <PotionsForShop />
          </HandleShopContext.Provider>
        </div>

        {shopMsg !== '' && (
          <Modal handleCloseModal={closeModal} modalMsg={shopMsg} />
        )}
      </div>
    </main>
  );
}

export default Shop;
