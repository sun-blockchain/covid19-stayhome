import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EditProfile from '3box-profile-edit-react';
import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import './index.css';
import * as UI from '../../actions/UI';

function Profile() {
  const [hideEdit, setHideEdit] = useState(false);
  const threebox = useSelector((state) => state.threebox);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UI.updateMenuKey(4));
  }, [dispatch]);

  if (!threebox.space) {
    return (
      <div style={{ width: '60px', margin: 'auto' }}>
        <BounceLoader color={'blue'} />
      </div>
    )
  }
  return (
    <div className='container'>
      <div className='profile'>
        <h1 style={{ textAlign: 'center' }}>
          Edit your 3Box Profile here
          <span role='img' aria-label='fingle'>
            👇
          </span>
        </h1>
        {!hideEdit && (
          <EditProfile
            box={threebox.box}
            space={threebox.space}
            currentUserAddr={threebox.account}
            currentUser3BoxProfile={threebox.threeBoxProfile}
            redirectFn={() => setHideEdit(true)}
          />
        )}
        {hideEdit && (
          <div>
            <h2>{threebox.threeBoxProfile.image[0].contentUrl['/']}</h2>
            <img src={threebox.threeBoxProfile.image[0].contentUrl['/']} alt='Three box image' />
            <p>{threebox.threeBoxProfile.description}</p>
            <p>{threebox.threeBoxProfile.emoji}</p>
            <button onClick={() => setHideEdit(false)}>edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
