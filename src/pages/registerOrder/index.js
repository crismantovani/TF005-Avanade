/* eslint-disable comma-dangle */
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import Input from '../../components/Input';
import Form from '../../components/Form';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import './style.css';

const userInfo = {
  nomeCompleto: '',
  codigoEntrega: '',
  tamanhoEncomenda: '',
};

const RegisterOrder = () => {
  const [user, setUser] = useState(userInfo);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [sendModalType, setSendModalType] = useState('');

  const handleResponseModal = (modalVisibility, modalType, message) => {
    setIsModalVisible(modalVisibility);
    setSendModalType(modalType);
    setModalMessage(message);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(event);
  };

  const sizesDefinitions = () => (
    <>
      <p className='table-title'>Certifique-se em qual armário a encomenda se encaixa:</p>
      <table>
        <tr>
          <th></th>
          <th>Largura</th>
          <th>Altura</th>
          <th>Comprimento</th>
        </tr>
        <tr>
          <td>P</td>
          <td>20cm</td>
          <td>30cm</td>
          <td>50cm</td>
        </tr>
        <tr>
          <td>M</td>
          <td>40cm</td>
          <td>60cm</td>
          <td>50cm</td>
        </tr>
        <tr>
          <td>G</td>
          <td>80cm</td>
          <td>100cm</td>
          <td>50cm</td>
        </tr>
      </table>
    </>
  );

  return (
    <>
      {isModalVisible ? (
        <Modal
          modalType={sendModalType}
          modalText={modalMessage}
          onClose={() => setIsModalVisible(false)}
        />
      ) : null}
      <Header />
      <main>
      <div className='form-container'>
        <Form className='form-register-order' onSubmit={(e) => handleSubmit(e)}>
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
            className='form-select'
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
          <p
            className='more-about-sizes'
            onClick={() => handleResponseModal(true, 'info', sizesDefinitions())}
          >
            <u>Saiba mais</u> sobre os tamanhos
          </p>
          <Button
            buttonType='submit'
            buttonClass='btn-register'
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
