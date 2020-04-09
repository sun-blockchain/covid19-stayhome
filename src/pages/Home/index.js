import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import HeaderNav from '../../components/Header';
import FooterNav from '../../components/Footer';
import 'antd/dist/antd.css';
import './home.css';

const { Content } = Layout;

function Home() {
  const threebox = useSelector((state) => state.threebox);
  let days = 20;

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderNav selectKey='1' />
      <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='site-layout-title'>You have stayed home for {days} days</div>
      </Content>
      <FooterNav />
    </Layout>
  );
}

export default Home;
