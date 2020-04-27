import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import LeaderBoard from './pages/Leaderboard';
import Case from './pages/Case';
import Profile from './pages/Profile';
import OtherProfile from './pages/Profile/otherProfile';
function Router() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/leaderboard' component={LeaderBoard} />
      <Route path='/corona-case' component={Case} />
      <Route path='/profile' component={Profile} />
      <Route path='/:address' component={OtherProfile} />
    </Switch>
  );
}

export default Router;
