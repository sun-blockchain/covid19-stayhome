import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as UI from 'actions/UI';
import SelectMap from 'components/SelectMap';

import './home.css';

function Home() {
  const dispatch = useDispatch();
  let days = 20;

  useEffect(() => {
    dispatch(UI.updateMenuKey(1));
  }, [dispatch]);

  return (
    <div className='site-layout-title'>
      You have stayed home for {days} days
      <SelectMap />
    </div>
  );
}

export default Home;
