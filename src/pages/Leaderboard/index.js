import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import HeaderNav from '../../components/Header';
import FooterNav from '../../components/Footer';
import 'antd/dist/antd.css';
import './leaderboard.css';

const { Content } = Layout;

function LeaderBoard() {
  const threebox = useSelector((state) => state.threebox);

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderNav selectKey='2' />
      <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='site-layout-board'></div>
      </Content>
      <FooterNav />
    </Layout>
  );
}

export default LeaderBoard;
