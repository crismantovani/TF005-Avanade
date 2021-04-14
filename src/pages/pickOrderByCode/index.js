/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
// import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import LockerFace from '../../utils/LockerFaceAPIconfig';

const PickOrderByCode = () => {
  const history = useHistory();
  const [tracking, setTracking] = useState();

  return (<>
    <Header />
    <main>
      <h2>Localizar encomenda pelo Código</h2>
      <Input
        type='number'
        className='form-inputs'
        onChange={(e) => setTracking(e.target.value)}
        placeholder='Código de entrega'
        minLength='3'
        maxLength='6'
        required
      />
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
