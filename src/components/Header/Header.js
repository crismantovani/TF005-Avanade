/* eslint-disable space-infix-ops */
/* eslint-disable no-undef */
import React from 'react';
import Button from '../Button';
import './style.css';
import AvanadeLogoName from '../../images/avanade-logo-name.png';

const Header = () => (
    <header className="header">
    <Button
      buttonType="submit"
      buttonClass="button-base"
      buttonText="BACK-Temporario"
    />
    <img
      src={AvanadeLogoName}
      id='avanade-logo-name'
      className='avanade-logo-name'
      alt='avanade-logo-name'
    />
    </header>
);

export default Header;
