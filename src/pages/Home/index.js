import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as UI from '../../actions/UI';
import './home.css';

function Home() {
  const dispatch = useDispatch();
  let days = 20;

  useEffect(() => {
    dispatch(UI.updateMenuKey(1));
  }, [dispatch]);

  return <div className='site-layout-title'>You have stayed home for {days} days</div>;
}

export default Home;
