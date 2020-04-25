import React, { useState, useEffect } from 'react';
import EditProfile from '3box-profile-edit-react';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import './index.css';
import { Button, Card } from 'antd';
import ErrorAlert from 'components/Alert/errorAlert';
import MyResult from './result.js';
import * as UI from 'actions/UI';

function Profile() {
  const [hideEdit, setHideEdit] = useState(true);
  const threebox = useSelector((state) => state.threebox);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UI.updateMenuKey(1));
  }, [dispatch]);

  if (threebox.error) {
    return (
      <div>
        <ErrorAlert msg={threebox.error} />
        <div style={{ textAlign: 'center' }}>
          <Button type='primary' onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }
  if (!threebox.space) {
    return (
      <div style={{ width: '60px', margin: 'auto' }}>
        <BounceLoader color={'blue'} />
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='profile'>
        {hideEdit && (
          <div className='card'>
            <Card>
              <MyResult
                name={threebox.threeBoxProfile.name}
                src={
                  threebox.threeBoxProfile.image
                    ? 'https://gateway.ipfs.io/ipfs/' +
                      threebox.threeBoxProfile.image[0].contentUrl['/']
                    : 'https://medisetter.com/vi/medical/accr/1.png'
                }
                description={threebox.threeBoxProfile.description}
                emoji={threebox.threeBoxProfile.emoji}
                address={threebox.account}
              />
              <Button
                className=' mt-3'
                shape='round'
                type='primary'
                onClick={() => setHideEdit(false)}
              >
                Edit
              </Button>
            </Card>
          </div>
        )}
        {!hideEdit && (
          <div>
            <h1 style={{ textAlign: 'center' }}>
              Edit your 3Box Profile here
              <span role='img' aria-label='fingle'>
                👇
              </span>
            </h1>
            <EditProfile
              box={threebox.box}
              space={threebox.space}
              currentUserAddr={threebox.account}
              currentUser3BoxProfile={threebox.threeBoxProfile}
              redirectFn={() => setHideEdit(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
