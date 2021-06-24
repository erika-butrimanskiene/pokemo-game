import React from 'react';
import './Modal.css';

//COMPONENTS
import InventoryList from './InventoryList';
import ProfileEditingForm from './ProfileEditingForm';

function Modal({
  handleCloseModal,
  modalMsg,
  inventory,
  inventoryType,
  deadMessageModal,
  editProfileModal,
}) {
  return (
    <div
      id='myModal'
      className='modal'
      onClick={editProfileModal ? undefined : handleCloseModal}
    >
      <div className='modal__content'>
        <div className='modal-close' onClick={handleCloseModal}>
          <span className='modal-close__span'>&times;</span>
        </div>
        {deadMessageModal && (
          <div
            className='arena-window__dead-img'
            style={{
              backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/rip.png)`,
            }}
          ></div>
        )}
        {!editProfileModal && <div className='modal-text'>{modalMsg}</div>}
        {inventory !== undefined && (
          <div className='arena-window__player-inventory'>
            <InventoryList
              inventory={inventory}
              inventoryType={inventoryType}
              showSellButton={false}
              toArenaModal={true}
            />
          </div>
        )}

        {editProfileModal && (
          <ProfileEditingForm handleCloseEditModal={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default Modal;
