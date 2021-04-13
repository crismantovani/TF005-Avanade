import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button';
import './style.css';

const Header = () => {
  const history = useHistory();

  return (
    <header className="Header">

      <Button
        buttonType='button'
        buttonClass='btn-base'
        buttonText='BACK-Temporario'
        buttonOnClick={() => { history.push('/'); }}
      />
    </header>
  );
};

export default Header;
