import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import LeaderBoard from './pages/Leaderboard';
import Case from './pages/Case';

function Router() {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/leaderboard' component={LeaderBoard} />
      <Route path='/corona-case' component={Case} />
    </Switch>
  );
}

export default Router;
