import React from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './header.css';

function HeaderNav() {
  const UI = useSelector((state) => state.UI);

  return (
    <div style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      {UI.MenuKey ? (
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[UI.MenuKey]}>
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
      ) : (
        <></>
      )}

      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    </div>
  );
}

export default HeaderNav;
