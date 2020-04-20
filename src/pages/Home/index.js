import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as UI from 'actions/UI';
import SelectMap from 'components/SelectMap';

import './home.css';

function Home() {
  const dispatch = useDispatch();
  let days = 20;
  let text = `I haved stayed home at ${days} days
${process.env.REACT_APP_HOME_URL}
#StayHome`;

  text = encodeURIComponent(text);

  useEffect(() => {
    dispatch(UI.updateMenuKey(1));
  }, [dispatch]);

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
    </div>
  );
}

export default Home;
