import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UI from 'actions/UI';
import * as actions from 'actions/index';
import './leaderboard.css';
import MyResult from '../Profile/result';
import { BounceLoader } from 'react-spinners';
import { Card, Button } from 'antd';
import ErrorAlert from 'components/Alert/errorAlert';
function LeaderBoard() {
  const dispatch = useDispatch();
  const threebox = useSelector((state) => state.threebox);

  useEffect(() => {
    dispatch(actions.getLeaderboard());
    dispatch(UI.updateMenuKey(2));
    if (threebox.space) dispatch(actions.getAllPublicSpace());
  }, [dispatch, threebox.space]);

  if (threebox.error) {
    return (
      <div>
        <ErrorAlert msg={threebox.error} />
        <div style={{ textAlign: 'center' }}>
          <Button type='primary' onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }
  if (!threebox.space || !threebox.leaderboard) {
    return (
      <div style={{ width: '60px', margin: 'auto' }}>
        <BounceLoader color={'blue'} />
      </div>
    );
  }
  return (
    <div className='row mt-5'>
      <div className='col'>
        <div className='site-layout-board'>
          <MyResult
            name={threebox.threeBoxProfile.name}
            src={
              threebox.threeBoxProfile.image
                ? 'https://gateway.ipfs.io/ipfs/' +
                  threebox.threeBoxProfile.image[0].contentUrl['/']
                : 'https://medisetter.com/vi/medical/accr/1.png'
            }
            description={threebox.threeBoxProfile.description}
            emoji={threebox.threeBoxProfile.emoji}
            address={threebox.account}
          />
        </div>
      </div>

      <div className='col'>
        <Card className='site-layout-board ' title='Leader board' bordered={false}>
          <ul className='c-list'>
            <li className='c-list_item'>
              <div className='c-list_grid'>
                <div className='u-text--left u-text--small u-text--medium'>Rank</div>
                <div className='u-text--left u-text--small u-text--medium'>Name</div>
                <div className='u-text--right u-text--small u-text--medium'>Result</div>
              </div>
            </li>
            {threebox.leaderboard.map((element, key) => (
              <li className='c-list_item' key={key}>
                <div className='c-list_grid'>
                  <div
                    className={
                      key + 1 === 1
                        ? 'c-flag c-place u-bg--transparent u-text--dark u-bg--yellow'
                        : 'c-flag c-place u-bg--transparent u-text--dark u-bg--teal'
                    }
                  >
                    {key + 1}
                  </div>
                  <div className='c-media'>
                    <img className='c-avatar c-media_img' src={element.avatar} alt='avatar' />
                    <div className='c-media_content'>
                      <div className='c-media_title'>{element.name}</div>
                      <div className='c-media_link u-text--small id'>{element.address}</div>
                    </div>
                  </div>
                  <div
                    className={
                      key + 1 === 1
                        ? 'u-text--right c-kudos u-text--yellow'
                        : 'u-text--right c-kudos u-text--teal'
                    }
                  >
                    <div>
                      <strong>{element.score} </strong>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default LeaderBoard;
