import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../images/avanade-logo.png';

const Home = () => {
  const history = useHistory();

  return (
    <>
      <header></header>
      <div className='main-container-base'>
        <div className='main-logo'>
          <figure>
            <img src={logo} className='main-logo' alt='Logo Avanade' />
          </figure>
        </div>
        <main>
          <h2>O que você gostaria de fazer?</h2>
          <div className='container-btn-home'>
            <Button
              buttonType='button'
              buttonClass='btn-base btn-register btn-centered'
              buttonText='Entregar uma encomenda'
              buttonOnClick={() => { history.push('/order/register'); }}
            />
            <Button
              buttonType='button'
              buttonClass='btn-base btn-register btn-centered'
              buttonText='Pegar encomenda'
              buttonOnClick={() => { history.push('/order/pick'); }}
            />
          </div>
          <p>
            Não tem cadastro? <span> <Link to='/user/register'>Registrar-se</Link></span>
          </p>
        </main>
      </div>
    </>
  );
};

export default Home;
