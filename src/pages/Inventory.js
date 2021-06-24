import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Inventory.css';

//CONTEXTS IMPORT
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { UserInfoContext } from '../App';

//COMPONENTS
import InventoryList from '../components/InventoryList';
import Modal from '../components/Modal';

export const HandleSellContext = React.createContext();

function Inventory() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);

  //STATES
  //-- sell msg
  const [sellMsg, setSellMsg] = useState('');

  //FUNCTIONS
  //--remove inventory from user state
  const removeInventoryFromUser = async (e, sellprice, index) => {
    e.preventDefault();
    setSellMsg('Inventory sucessfully sold.');
    await fetchToUpdateUser(user.userInfo._id, sellprice, index);
    user.invokeGetUserFetch();
  };

  //-- fetch to update user
  const fetchToUpdateUser = async (id, sellprice, index) => {
    const URL = `https://pokemo-game.herokuapp.com/user/${id}`;
    const token = localStorage.getItem('game-auth');

    user.userInfo.inventory.splice(index, 1);

    const updateUser = async () => {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'game-token': token,
        },
        body: JSON.stringify({
          ...user.userInfo,
          inventory: user.userInfo.inventory,
          gold: user.userInfo.gold + sellprice,
        }),
      });
      await response.json();
    };
    await updateUser();
  };

  const closeModal = () => {
    setSellMsg('');
  };

  return (
    <main>
      <div className='inventory-window-wrapper'>
        <Link className='inventory-window__back' to='/'>
          <AiOutlineArrowLeft size={25} />
          Start Window
        </Link>
        <h1 className='inventory-window-heading'>USER INVENTORY</h1>

        {Object.keys(user.userInfo).length !== 0 && (
          <HandleSellContext.Provider value={{ removeInventoryFromUser }}>
            <div className='inventory-window'>
              {user.userInfo.inventory.length > 0 ? (
                <InventoryList
                  inventory={user.userInfo.inventory}
                  inventoryType='all'
                  showSellButton={true}
                  toArenaModal={false}
                />
              ) : (
                <div>User don't have inventory.</div>
              )}
            </div>
          </HandleSellContext.Provider>
        )}
        {sellMsg !== '' && (
          <Modal handleCloseModal={closeModal} modalMsg={sellMsg} />
        )}
      </div>
    </main>
  );
}

export default Inventory;
