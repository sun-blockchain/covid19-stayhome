import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './actions';
import { BrowserRouter } from 'react-router-dom';
import Router from './router';
import HeaderNav from './components/Header';
import FooterNav from './components/Footer';

import { Layout } from 'antd';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAddress = () => {
      window.addEventListener('load', () => {
        dispatch(actions.getAddressFromMetaMask());
      });
    };
    getAddress();
  });

  return (
    <div className='App'>
      <BrowserRouter>
        <Layout>
          <Header>
            <HeaderNav />
          </Header>
          <Content>
            <Router />
          </Content>
          <Footer>
            <FooterNav />
          </Footer>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
