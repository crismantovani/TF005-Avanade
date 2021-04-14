import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
import AvanadeLogoName from '../../images/avanade-logo-name.png';
import IconBack from '../../images/icon-back.png';

const Header = () => {
  const history = useHistory();

  return (
    <header className="header">

      <input
        className='icon-back'
        type='image'
        src={IconBack}
        alt='icon-back'
        onClick={() => { history.push('/'); }}
      />
      <img
        src={AvanadeLogoName}
        id='avanade-logo-name'
        className='avanade-logo-name'
        alt='avanade-logo-name'
      />
    </header>
  );
};

export default Header;
