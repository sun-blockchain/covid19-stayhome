import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './header.css';

function HeaderNav() {
  const UI = useSelector((state) => state.UI);
  const threebox = useSelector((state) => state.threebox);

  return (
    <div style={{ width: '100%' }}>
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
      <Link to='/profile'>
        <Avatar className='mr-3' style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Link>
      <button
        disabled
        type='button'
        className={threebox.space ? 'btn btn-outline-success' : 'btn btn-outline-danger'}
      >
        <Badge status={threebox.space ? 'success' : 'error'} />
        {threebox.space ? 'Connected' : 'Not Connected'}
      </button>
    </div>
  );
}

export default HeaderNav;
