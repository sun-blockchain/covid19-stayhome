import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './actions';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAddress = () => {
      window.addEventListener('load', async () => {
        dispatch(actions.getAddressFromMetaMask());
      });
    };
    getAddress();
  });

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
