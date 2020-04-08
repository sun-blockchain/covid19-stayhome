import React from 'react';
import Profile from '../Profile';
import { useSelector } from 'react-redux';

import { BounceLoader } from 'react-spinners';

function Home() {
  const threebox = useSelector((state) => state.threebox);

  return (
    <div>
      {threebox.space && (
        <Profile
          box={threebox.box}
          space={threebox.space}
          account={threebox.account}
          threeBoxProfile={threebox.threeBoxProfile}
        />
      )}
      {!threebox.space && (
        <div style={{ width: '60px', margin: 'auto' }}>
          <BounceLoader color={'blue'} />
        </div>
      )}
    </div>
  );
}

export default Home;
