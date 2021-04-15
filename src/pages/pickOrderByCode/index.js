/* eslint-disable comma-dangle */
import React, { useState } from 'react';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import LockerFace from '../../utils/LockerFaceAPIconfig';
import './style.css';

const PickOrderByCode = () => {
  const [tracking, setTracking] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [sendModalType, setSendModalType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResponseModal = (modalVisibility, modalType, message) => {
    setIsModalVisible(modalVisibility);
    setSendModalType(modalType);
    setModalMessage(message);
  };

  function handleSubmit(e) {
    setLoading(true);
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
        const pickOrder = codeDB.filter((i) => i.code === tracking);
        if (pickOrder.length === 0) {
          handleResponseModal(true, 'error', 'Código não encontrado');
          setLoading(false);
        } else {
          pickOrder.map(({ name, lockerID }) => {
            const idLocker = lockerID;
            const message = (`
            Código validado com sucesso! 
            \nOlá ${name}, sua encomenda está localizada no 
            \nARMÁRIO ${idLocker}
            \nO armário já está desbloqueado!`);
            setTracking('');
            handleResponseModal(true, 'success', message);
            return setLoading(false);
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
    <main className='main-pick-order'>
      <h2>Pegar encomenda pelo código</h2>
      <Form
        className='form-pick-order'
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <Input
          type='number'
          className='form-inputs'
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
          placeholder='Código de entrega'
          max='999999'
          required
        />
         {loading ? (
          <div className='loading-pick-order'/>
         ) : (
          <Button
            buttonType='submit'
            buttonClass='btn-base btn-register'
            buttonText='Pegar encomenda'
          />
         )}
      </Form>
    </main>
    <Footer />
  </>
  );
};

export default PickOrderByCode;
