import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../global.css';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const PickOrderByCode = () => {
  const history = useHistory();

  return (<>
    <Header />
    <main>
      <h2>PÁGINA NOVA - Pegar pelo Código</h2>
      <Button
        buttonType='button'
        buttonClass='btn-base btn-register'
        buttonText='Pegar encomenda'
        buttonOnClick={() => { history.push('/'); }}
      />
    </main>
    <Footer />
  </>
  );
};

export default PickOrderByCode;
