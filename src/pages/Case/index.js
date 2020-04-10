import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as UI from '../../actions/UI';
import './case.css';

function Case() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UI.updateMenuKey(3));
  }, [dispatch]);

  return <div className='site-layout-title'>Case</div>;
}

export default Case;
