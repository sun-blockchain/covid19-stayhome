import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UI from 'actions/UI';
import SelectMap from 'components/SelectMap';
import * as actions from 'actions/index';
import './home.css';
import { Button } from 'antd';
import ErrorAlert from 'components/Alert/errorAlert';

function Home() {
  const threebox = useSelector((state) => state.threebox);
  const dispatch = useDispatch();
  let days = 20;
  let text = `I haved stayed home at ${days} days
${process.env.REACT_APP_HOME_URL}
#StayHome`;

  text = encodeURIComponent(text);

  useEffect(() => {
    dispatch(actions.getAddressFromMetaMask());
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
  return (
    <div className='site-layout-title'>
      You have stayed home for {days} days
      <div className='tweet'>
        <a
          className='twitter-share-button'
          href={`https://twitter.com/intent/tweet?text=${text}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src='https://i.imgur.com/IDBc8HC.png' alt='tweet' />
        </a>
      </div>
      <SelectMap />
      <div>Your point {threebox.point}</div>
      <div>Your start time {threebox.startTime}</div>
      <div>Your last check {threebox.lastCheck}</div>
    </div>
  );
}

export default Home;
