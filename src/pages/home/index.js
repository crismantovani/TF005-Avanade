import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import logo from '../../images/avanade-logo.png';

const Home = () => {
  const history = useHistory();

  return (<>
    <div className="home-container">
      <img src={logo} alt='logo' />
      <main>
        <h2>O que você gostaria de fazer?</h2>
        <div className='container-btn-home'>
          <Button
            buttonType='button'
            buttonClass='btn-base btn-register'
            buttonText='Entregar encomenda'
            buttonOnClick={() => { history.push('/order/register'); }}
          />
          <Button
            buttonType='button'
            buttonClass='btn-base btn-register'
            buttonText='Pegar encomenda'
            buttonOnClick={() => { history.push('/order/pick'); }}
          />
        </div>
        <p>
          Não tem cadastro? <span> <Link to='/user/register'>Registrar-se</Link></span>
        </p>
      </main>
      <Footer />
    </div>
  </>
  );
};

export default Home;
