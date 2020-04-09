import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import HeaderNav from '../../components/Header';
import FooterNav from '../../components/Footer';
import 'antd/dist/antd.css';
import './case.css';

const { Header, Content, Footer } = Layout;

function Case() {
  const threebox = useSelector((state) => state.threebox);

  return (
    <Layout style={{ height: '100vh' }}>
      <HeaderNav selectKey='3' />
      <Content className='site-layout' style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='site-layout-title'>Case</div>
      </Content>
      <FooterNav />
    </Layout>
  );
}

export default Case;
