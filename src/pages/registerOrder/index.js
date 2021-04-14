/* eslint-disable comma-dangle */
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const userInfo = {
  nomeCompleto: '',
  codigoEntrega: '',
  tamanhoEncomenda: '',
};

const RegisterOrder = () => {
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
      <div className='form-container'>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <h2>Cadastre a encomenda</h2>
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
            placeholder='Nome completo do destinatário'
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
                  ...user, codigoEntrega: e.targert.value,
                }
              );
            }}
            placeholder='Código de entrega'
            minLength='3'
            maxLength='6'
            required
          />
          <select
            className='form-inputs'
            onChange={(e) => {
              setUser(
                {
                  ...user, tamanhoEncomenda: e.targert.value,
                }
              );
            }}
            defaultValue='Tamanho da encomenda'
            required
          >
            <option disabled>Tamanho da encomenda</option>
            <option value='Pequeno'>Pequeno</option>
            <option value='Medio'>Médio</option>
            <option value='Grande'>Grande</option>
          </select>
          <Button
            buttonType='submit'
            buttonClass='btn-bold'
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

export default RegisterOrder;
