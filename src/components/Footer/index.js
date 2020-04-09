import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './footer.css';

const { Footer } = Layout;

function FooterNav() {
  return (
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
  );
}

export default FooterNav;
