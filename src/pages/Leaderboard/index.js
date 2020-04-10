import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as UI from '../../actions/UI';
import './leaderboard.css';

import { Card } from 'antd';

function LeaderBoard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UI.updateMenuKey(2));
  }, [dispatch]);

  const data = [
    {
      rank: 1,
      id: '123-123',
      avatar:
        'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
      name: 'Nguyen Van A',
      result: '80'
    },
    {
      rank: 2,
      id: '123-123',
      avatar:
        'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
      name: 'Nguyen Van A',
      result: '70'
    },
    {
      rank: 3,
      id: '123-123',
      avatar:
        'https://www.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col-retina/image.png',
      name: 'Nguyen Van A',
      result: '60'
    }
  ];
  return (
    <Card className='site-layout-board mt-5' title='Leader board' bordered={false}>
      <ul className='c-list'>
        <li className='c-list_item'>
          <div className='c-list_grid'>
            <div className='u-text--left u-text--small u-text--medium'>Rank</div>
            <div className='u-text--left u-text--small u-text--medium'>Name</div>
            <div className='u-text--right u-text--small u-text--medium'>Result</div>
          </div>
        </li>
        {data.map((element, key) => (
          <li className='c-list_item' key={key}>
            <div className='c-list_grid'>
              <div
                className={
                  element.rank === 1
                    ? 'c-flag c-place u-bg--transparent u-text--dark u-bg--yellow'
                    : 'c-flag c-place u-bg--transparent u-text--dark u-bg--teal'
                }
              >
                {element.rank}
              </div>
              <div className='c-media'>
                <img className='c-avatar c-media_img' src={element.avatar} alt='avatar' />
                <div className='c-media_content'>
                  <div className='c-media_title'>{element.name}</div>
                  <div className='c-media_link u-text--small id'>{element.id}</div>
                </div>
              </div>
              <div
                className={
                  element.rank === 1
                    ? 'u-text--right c-kudos u-text--yellow'
                    : 'u-text--right c-kudos u-text--teal'
                }
              >
                <div>
                  <strong>{element.result} % </strong>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default LeaderBoard;
