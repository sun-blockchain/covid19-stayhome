import React, { useState, useEffect } from 'react';
import EditProfile from '3box-profile-edit-react';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import './index.css';
import { Button, Card } from 'antd';
import ErrorAlert from 'components/Alert/errorAlert';
import MyResult from './result.js';
import * as action from 'actions/index';

function OtherProfile(props) {
  const [hideEdit, setHideEdit] = useState(true);
  const threebox = useSelector((state) => state.threebox);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.getProfile(props.match.params.address));
  }, [dispatch, props.match.params.address]);

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
  if (!threebox.otherSpace) {
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
                name={threebox.otherSpace.name}
                src={
                  threebox.otherSpace.avatar
                    ? threebox.otherSpace.avatar
                    : 'https://medisetter.com/vi/medical/accr/1.png'
                }
                address={props.match.params.address}
                point={threebox.otherSpace.point}
              />
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
              currentUser3BoxProfile={threebox.otherProfile}
              redirectFn={() => setHideEdit(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OtherProfile;
