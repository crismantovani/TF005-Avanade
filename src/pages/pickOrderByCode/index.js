import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';

const PickOrderByCode = () => {
  const history = useHistory();

  return (<>
    <Header />
    <Modal
      modalType='error'
      modalText='errouuu'
    />
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
