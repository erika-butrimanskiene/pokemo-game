import React, { useState, useContext } from 'react';
import './ProfileEdintingForm.css';

//CONTEXTS IMPORT
import { UserInfoContext } from '../App';

//COMPONENTS
import Button from '../components/Button';
import NewAvatar from './NewAvatar';

function ProfileEditingForm({ handleCloseEditModal }) {
  const avatarsList = [
    '042-avatar.png',
    '004-avatar.png',
    '008-avatar.png',
    '014-avatar.png',
    '015-avatar.png',
    '016-avatar.png',
    '022-avatar.png',
    '031-avatar.png',
    '037-avatar.png',
  ];
  //CONTEXTS
  //-- user
  const user = useContext(UserInfoContext);

  //STATES
  //-- username
  const [username, setUsername] = useState(user.userInfo.username);
  //-- new avatar
  const [newAvatar, setNewAvatar] = useState({
    image: user.userInfo.image,
    activeIndex: null,
  });

  //FUNCTIONS
  const setNewAvatarImage = (avatar, index) => {
    setNewAvatar({ image: avatar, activeIndex: index });
  };

  const updateProfile = async () => {
    const URL = `https://pokemo-game.herokuapp.com/user/${user.userInfo._id}`;
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
          username: username,
          image: newAvatar.image,
        }),
      });
      return response;
    };
    await updateUser();
    user.invokeGetUserFetch();
    handleCloseEditModal();
  };

  return (
    <div className='edit-profile-form'>
      <div
        className='edit-profile-form__player-avatar'
        style={{
          backgroundImage: `url(https://pokemo-game.herokuapp.com/uploads/${user.userInfo.image})`,
        }}
      ></div>
      <label
        className='edit-profile-form__username-label'
        htmlFor='player-username'
      >
        Edit Username
      </label>
      <input
        className='edit-profile-form__username'
        type='text'
        name='player-username'
        value={username}
        readOnly={false}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p className='edit-profile-form__avatar-label'>Choose New Avatar</p>
      <div className='edit-profile-form__new-avatars'>
        {avatarsList.map((avatar, index) => (
          <NewAvatar
            activeClass={newAvatar.activeIndex === index && 'is-active-avatar'}
            key={index}
            img={avatar}
            setNewAvatar={() => setNewAvatarImage(avatar, index)}
          />
        ))}
      </div>
      <div className='confirm-button' onClick={updateProfile}>
        <Button className='button btn-pink' text='Confirm' />
      </div>
    </div>
  );
}

export default ProfileEditingForm;
