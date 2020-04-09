import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './actions';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import LeaderBoard from './pages/Leaderboard';
import Case from './pages/Case';

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
          <Route path='/leaderboard' component={LeaderBoard} />
          <Route path='/corona-case' component={Case} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
