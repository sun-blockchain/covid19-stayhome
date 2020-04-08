import React, { useState } from 'react';
import EditProfile from '3box-profile-edit-react';

function Profile(props) {
  const [hideEdit, setHideEdit] = useState(false);

  console.log(props);

  return (
    <div className='container'>
      <div style={{ margin: 'auto' }}>
        <h1 style={{ textAlign: 'center' }}>
          Edit your 3Box Profile here
          <span role='img' aria-label='fingle'>
            👇
          </span>
        </h1>
        {!hideEdit && (
          <EditProfile
            box={props.box}
            space={props.space}
            currentUserAddr={props.account}
            currentUser3BoxProfile={props.threeBoxProfile}
            redirectFn={() => setHideEdit(true)}
          />
        )}
        {hideEdit && (
          <div>
            <h2>{props.threeBoxProfile.name}</h2>
            <image src={props.threeBoxProfile.image.contentUrl['/']} alt='Three box image' />
            <p>{props.threeBoxProfile.description}</p>
            <p>{props.threeBoxProfile.emoji}</p>
            <button onClick={() => setHideEdit(false)}>edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
