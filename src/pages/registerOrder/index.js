/* eslint-disable max-len */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import LockerFace from '../../utils/LockerFaceAPIconfig';

const RegisterOrder = () => {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [lockerSize, setLockerSize] = useState();

  useEffect(() => {
    if (name);
    if (code);
    if (lockerSize);
    const userInfo = {
      name,
      code,
      lockerSize,
      lockerID: 10,
    };
    setUser(userInfo);
  }, [name, code, lockerSize]);

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
    if (user) {
      const method = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user),
      };
      LockerFace(method)
        .then((codeDB) => {
          if (codeDB.lockerID) {
            // eslint-disable-next-line react/jsx-no-undef
            const message = (
              `Cadastro feito com sucesso! 
            \nPor favor, colocar a encomenda no 
            \nARMÁRIO ${codeDB.lockerID}
            \nO armário já está desbloqueado!
            Feche o armário ao terminar.`);
            return handleResponseModal(true, 'success', message);
          }
          return false;
        });
    }
  };

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
          <h2>Cadastre a encomenda</h2>
          <Form onSubmit={(event) => {
            handleSubmit(event);
          }}>
            <Input
              type='text'
              className='form-inputs'
              onChange={(e) => setName(e.target.value)}
              placeholder='Nome completo do destinatário'
              minLength='3'
              required
            />
            <Input
              type='number'
              className='form-inputs'
              onChange={(e) => setCode(e.target.value)}
              placeholder='Código de entrega'
              max='999999'
              required
            />
            <select
              className='form-inputs'
              onChange={(e) => setLockerSize(e.target.value)}
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
