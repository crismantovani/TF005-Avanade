import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import logo from '../../images/avanade-logo.png';
import './style.css';

const Home = () => {
  const history = useHistory();

  return (
    <>
      <div className='main-container-base'>
        <div className='top-section'>
          <figure>
            <img src={logo} alt='Logo Avanade' />
          </figure>
        </div>
        <main>
          <section className='bottom-section'>
            <h2>O que você gostaria de fazer?</h2>
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
            <p>
              Não tem cadastro? <span><Link to='/user/register'>Registrar-se</Link></span>
            </p>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
