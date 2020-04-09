import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './header.css';

const { Header } = Layout;

function HeaderNav(props) {
  return (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[props.selectKey]}>
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
  );
}

export default HeaderNav;
