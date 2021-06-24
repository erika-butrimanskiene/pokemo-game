import React from 'react';

function NewAvatar({ setNewAvatar, img, activeClass }) {
  return (
    <div className='new-avatar-wrapper'>
      <div
        className={`edit-profile-form__new-avatar ${activeClass}`}
        style={{
          backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${img})`,
        }}
        onClick={setNewAvatar}
      ></div>
    </div>
  );
}

export default NewAvatar;
