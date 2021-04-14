/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import LockerFace from '../../utils/LockerFaceAPIconfig';

const PickOrderByCode = () => {
  const [tracking, setTracking] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [sendModalType, setSendModalType] = useState('');

  const handleResponseModal = (modalVisibility, modalType, message) => {
    setIsModalVisible(modalVisibility);
    setSendModalType(modalType);
    setModalMessage(message);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const method = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    };
    LockerFace(method)
      .then((codeDB) => {
        const pickOrder = codeDB.filter((i) => i.code === Number(tracking));
        if (pickOrder.length === 0) {
          handleResponseModal(true, 'error', 'Código não encontrado');
        } else {
          pickOrder.map(({ name, lockerID }) => {
            const idLocker = lockerID.toUpperCase();
            const message = `Código validado com sucesso! \n Olá ${name}, sua encomenda está localizada no ${idLocker}`;
            return handleResponseModal(true, 'success', message);
          });
        }
      });
  }

  return (<>
    {isModalVisible ? (
      <Modal
        modalType={sendModalType}
        modalText={modalMessage}
        onClose={() => setIsModalVisible(false)}
      />
    ) : null}
    <Header />
    <main>
      <h2>Localizar encomenda pelo Código</h2>
      <Form onSubmit={(event) => {
        handleSubmit(event);
      }}>
        <Input
          type='number'
          className='form-inputs'
          onChange={(e) => setTracking(e.target.value)}
          placeholder='Código de entrega'
          max='999999'
          required
        />
        <Button
          buttonType='submit'
          buttonClass='btn-base btn-register'
          buttonText='Pegar encomenda'
        />
      </Form>
    </main>
    <Footer />
  </>
  );
};

export default PickOrderByCode;
