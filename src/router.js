import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import LeaderBoard from './pages/Leaderboard';
import Case from './pages/Case';
import Profile from './pages/Profile';

function Router() {
  const threebox = useSelector((state) => state.threebox);
  console.log(threebox);
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/leaderboard' component={LeaderBoard} />
      <Route path='/corona-case' component={Case} />
      <Route
        path='/profile'
        render={(props) => (
          <Profile
            {...props}
            box={threebox.box}
            space={threebox.space}
            account={threebox.account}
            threeBoxProfile={threebox.threeBoxProfile}
          />
        )}
      />
    </Switch>
  );
}

export default Router;
