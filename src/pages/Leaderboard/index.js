import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './leaderboard.css';

const { Header, Content, Footer } = Layout;

function LeaderBoard() {
  const threebox = useSelector((state) => state.threebox);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
          <Menu.Item key='1'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='2'>
            <Link to='/leaderboard'>LeaderBoard</Link>
          </Menu.Item>
          <Menu.Item key='3'>
            <Link to='/corona-case'>Corona Case</Link>
          </Menu.Item>
        </Menu>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Header>
      <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='site-layout-board'></div>
      </Content>
      <Footer>
        <span>Sun* Blockchain Research Team</span>
        <div>
          <a href='https://github.com/sun-blockchain' target='_blank' rel='noopener noreferrer'>
            <img src='https://i.ibb.co/0fHqWgp/github.png' alt='github' width='20px' />
          </a>
          <a
            href='https://viblo.asia/o/sun-blockchain-team'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='https://cdn.viblo.asia/_nuxt/img/fbfe575.svg' alt='viblo' width='45px' />
          </a>
        </div>
      </Footer>
    </Layout>
  );
}

export default LeaderBoard;
