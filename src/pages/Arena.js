import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Arena.css';

//CONTEXTS IMPORT
import { UserInfoContext } from '../App';

//ICONS
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { GiHealthPotion } from 'react-icons/gi';
import { GiSwitchWeapon } from 'react-icons/gi';
import { GiArmorUpgrade } from 'react-icons/gi';

//COMPONENTS
import Button from '../components/Button';
import EnemyProfile from '../components/EnemyProfile';
import Modal from '../components/Modal';
import LoggedInUser from '../components/LoggedInUser';

export const SelectedInventoryContext = React.createContext();

function Arena() {
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);

  //STATES
  //-- enemy to play
  const [enemyToPlay, setEnemyToPlay] = useState({});
  //-- selected armor
  const [selectedArmor, setSelectedArmor] = useState({});
  //-- selected weapon
  const [selectedWeapon, setSelectedWeapon] = useState({});
  //-- select inventory msg
  const [selectMsg, setSelectMsg] = useState('');
  //-- is inventory unselected
  const [inventoryUnselectedMsg, setInventoryUnselectedMsg] = useState('');
  //-- dead msg
  const [deadMsg, setDeadMsg] = useState('');
  //-- inventory type to modal for filtering
  const [inventoryType, setInventoryType] = useState('');
  //-- player avatar animation class
  const [playerAnimationClass, setPlayerAnimationClass] = useState('');
  //-- enemy avatar animation class
  const [enemyAnimationClass, setEnemyAnimationClass] = useState('');
  //-- enemy hit info
  const [enemyHitInfo, setEnemyHitInfo] = useState({
    defence: 0,
    damage: 0,
    gold: 0,
  });
  //-- player hit info
  const [playerHitInfo, setPlayerHitInfo] = useState({ damageForEnemy: 0 });

  //EFFECTS
  useEffect(() => {
    generateEnemyToPlay();
  }, []);

  //FUNCTIONS
  const generateEnemyToPlay = () => {
    const enemies = [
      {
        enemyname: 'Goblin',
        image: 'goblin_02.png',
        damage: 12,
        health: 100,
      },
      {
        enemyname: 'Troll',
        image: 'troll_06.png',
        damage: 8,
        health: 100,
      },
      {
        enemyname: 'Witch',
        image: 'witch_02.png',
        damage: 15,
        health: 100,
      },
    ];
    let randomIndex = Math.floor(Math.random() * 3);
    setEnemyToPlay(enemies[randomIndex]);
  };

  const closeModal = () => {
    setSelectMsg('');
  };

  const closeUnselectedInfoModal = () => {
    setInventoryUnselectedMsg('');
  };

  const closeDeadInfoModal = () => {
    setDeadMsg('');
  };

  const openInventoryList = (inventor) => {
    setSelectMsg(`Select ${inventor}`);
    setInventoryType(inventor);
  };

  const handleHit = () => {
    let enemyHit = enemyToPlay;
    let playerHit = user.userInfo;

    handlePlayerHit(playerHit, enemyHit);
  };

  const handlePlayerHit = (playerHit, enemyHit) => {
    if (Object.keys(selectedWeapon).length !== 0) {
      //ANIMATIONS
      setEnemyAnimationClass('arena-window__enemy-avatar-animation');
      setTimeout(() => setEnemyAnimationClass(''), 1000);

      setTimeout(
        () => setPlayerAnimationClass('arena-window__player-avatar-animation'),
        500
      );
      setTimeout(() => setPlayerAnimationClass(''), 1500);

      //player damage to enemy
      let playerDamage = playerHitDamage();
      setPlayerHitInfo({ damageForEnemy: playerDamage });
      enemyHit.health = enemyHit.health - playerDamage;
      handleEnemyHit(playerHit, enemyHit);
    } else {
      setInventoryUnselectedMsg(
        `Please select weapon. And don't forget armors!`
      );
    }
  };

  const handleEnemyHit = async (playerHit, enemyHit) => {
    if (enemyHit.health > 0) {
      let randomAmountOfGold = Math.floor(Math.random() * 10);
      let randomDefence = armorDefence();
      let specialHeal = specialPlayerHeal();
      let enemyDamage = enemyHitDamage(enemyHit);

      setEnemyHitInfo({
        defence: randomDefence,
        damage: enemyDamage,
        gold: randomAmountOfGold,
      });

      //damage only if defence is smaller than enemy damage
      if (randomDefence - enemyDamage < 0) {
        playerHit.health =
          playerHit.health + specialHeal - enemyDamage + randomDefence;
        if (playerHit.health > 100) {
          playerHit.health = 100;
        }
      }
      // gold to player
      playerHit.gold = playerHit.gold + randomAmountOfGold;

      if (playerHit.health > 0) {
        await fetchToUpdateUser(playerHit);
        user.invokeGetUserFetch();
        setEnemyToPlay({ ...enemyHit });
      } else {
        setDeadMsg(
          'DEAD. Your health is restored to 100 and inventory list is emptied.'
        );
        playerHit.health = 100;
        playerHit.inventory = [];
        setSelectedArmor({});
        setSelectedWeapon({});
        await fetchToUpdateUser(playerHit);
        user.invokeGetUserFetch();
      }
    } else {
      generateEnemyToPlay();
    }
  };

  const playerHitDamage = () => {
    let randomDamage = Math.floor(Math.random() * selectedWeapon.damage);
    let randomSpecialPercentage = Math.floor(Math.random() * 100);
    if (
      selectedWeapon.special === '30% chance to do double damage' &&
      randomSpecialPercentage <= 30
    ) {
      return randomDamage * 2;
    } else {
      return randomDamage;
    }
  };

  const enemyHitDamage = (enemyHit) => {
    let randomSpecialPercentage = Math.floor(Math.random() * 100);

    if (
      selectedWeapon.special === '20% chance to block attack' &&
      randomSpecialPercentage <= 20
    ) {
      return 0;
    } else {
      return Math.floor(Math.random() * enemyHit.damage);
    }
  };

  const specialPlayerHeal = () => {
    let randomSpecialPercentage = Math.floor(Math.random() * 100);
    if (
      selectedWeapon.special ===
        '40% chance to heal hero on enemy attack by 10hit points' &&
      randomSpecialPercentage <= 40
    ) {
      return 10;
    } else {
      return 0;
    }
  };

  const armorDefence = () => {
    if (Object.keys(selectedArmor).length !== 0) {
      return Math.floor(Math.random() * selectedArmor.defence);
    } else {
      return 0;
    }
  };

  const usePotion = async (heals, index) => {
    user.userInfo.inventory.splice(index, 1);

    let userToUpdate = {
      ...user.userInfo,
      inventory: user.userInfo.inventory,
      health: user.userInfo.health + heals,
    };
    if (userToUpdate.health > 100) {
      userToUpdate.health = 100;
    }
    await fetchToUpdateUser(userToUpdate);
    user.invokeGetUserFetch();
  };

  //-- fetch to update user
  const fetchToUpdateUser = async (userToFetch) => {
    const URL = `https://pokemo-game.herokuapp.com/user/${user.userInfo._id}`;
    const token = localStorage.getItem('game-auth');
    const updateUser = async () => {
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'game-token': token,
        },
        body: JSON.stringify(userToFetch),
      });

      return response;
    };
    await updateUser();
  };

  return (
    <main>
      <SelectedInventoryContext.Provider
        value={{
          selectedArmor,
          setSelectedArmor,
          selectedWeapon,
          setSelectedWeapon,
          usePotion,
        }}
      >
        <div className='arena-window-wrapper'>
          <Link className='arena-window__back' to='/'>
            <AiOutlineArrowLeft size={25} />
            Start Window
          </Link>
          <h1 className='arena-window-heading'>LET'S GAME!</h1>
          <div className='arena-window'>
            <LoggedInUser
              image={user.userInfo.image}
              username={user.userInfo.username}
              health={user.userInfo.health}
              gold={user.userInfo.gold}
              isArena={true}
              playerAnimationClass={playerAnimationClass}
            />
            <div className='arena-window__all-buttons'>
              <div className='arena-window__inventory-buttons'>
                <div
                  className='arena-armor-button button-blue'
                  onClick={() => openInventoryList('armor')}
                >
                  <GiArmorUpgrade size={30} />
                </div>

                <div
                  className='arena-armor-button button-green'
                  onClick={() => openInventoryList('weapon')}
                >
                  <GiSwitchWeapon size={30} />
                </div>

                <div
                  className='arena-armor-button button-pink'
                  onClick={() => openInventoryList('potion')}
                >
                  <GiHealthPotion size={30} />
                </div>
              </div>

              <div className='hit-button' onClick={handleHit}>
                <Button className='button btn-red' text='HIT' />
              </div>
            </div>

            {Object.keys(enemyToPlay).length !== 0 && (
              <EnemyProfile
                image={enemyToPlay.image}
                enemyname={enemyToPlay.enemyname}
                health={enemyToPlay.health}
                damage={enemyToPlay.damage}
                enemyAnimationClass={enemyAnimationClass}
              />
            )}
          </div>

          {selectMsg !== '' && (
            <Modal
              inventory={user.userInfo.inventory}
              modalMsg={selectMsg}
              handleCloseModal={closeModal}
              inventoryType={inventoryType}
            />
          )}
          {inventoryUnselectedMsg !== '' && (
            <Modal
              modalMsg={inventoryUnselectedMsg}
              handleCloseModal={closeUnselectedInfoModal}
            />
          )}
          {deadMsg !== '' && (
            <Modal
              modalMsg={deadMsg}
              handleCloseModal={closeDeadInfoModal}
              deadMessageModal={true}
            />
          )}

          <div className='arena-info'>
            <div className='arena-info__player'>
              Defence: <span>{enemyHitInfo.defence} </span>Damage:
              <span>{enemyHitInfo.damage} </span> Gold:
              <span>{enemyHitInfo.gold}</span>
            </div>
            <div className='arena-info__enemy'>
              Damage:
              <span>{playerHitInfo.damageForEnemy} </span>
            </div>
          </div>
        </div>
      </SelectedInventoryContext.Provider>
    </main>
  );
}

export default Arena;
