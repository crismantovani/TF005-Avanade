/* eslint-disable comma-dangle */
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/index';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FaceCapture from '../../components/FaceCapture/FaceCapture';

const userInfo = {
  nomeCompleto: '',
  funcao: '',
  image: '',
};

const RegisterUser = () => {
  const [user, setUser] = useState(userInfo);

  // useEffect(() => {
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(event);
  };

  return (
    <>
    <Header />
    <main>
    <h1>RegisterUser</h1>;
    <div className='form-container'>
    <FaceCapture
      label="Registrar"
    />
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type='text'
          className='form-inputs'
          value={user.nomeCompleto}
          onChange={(e) => {
            setUser(
              {
                ...user, nomeCompleto: e.targert.value,
              }
            );
          }}
          placeholder='Nome completo'
          minLength='3'
          required
        />
        <Input
          type='text'
          className='form-inputs'
          value={user.codigoEntrega}
          onChange={(e) => {
            setUser(
              {
                ...user, funcao: e.targert.value,
              }
            );
          }}
          placeholder='Função'
          minLength='3'
          maxLength='8'
          required
        />
        <Button
          buttonType='submit'
          buttonClass='button-base'
          buttonOnClick=''
          buttonText='Cadastrar'
        />
      </Form>
    </div>
    </main>
    <Footer />
  </>
  );
};

export default RegisterUser;
