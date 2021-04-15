import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal';
import LockerFace from '../../utils/LockerFaceAPIconfig';
import './style.css';

const RegisterOrder = () => {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [lockerSize, setLockerSize] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

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
    setLoading(true);
    event.preventDefault();
    if (user) {
      const method = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };
      LockerFace(method)
        .then((codeDB) => {
          if (codeDB.lockerID) {
            const message = (
              `Cadastro feito com sucesso! 
            \nPor favor, colocar a encomenda no 
            \nARMÁRIO ${codeDB.lockerID}
            \nO armário já está desbloqueado!
            Feche o armário ao terminar.`);
            setUser('');
            setName('');
            setCode('');
            handleResponseModal(true, 'success', message);
            return setLoading(false);
          }
          return false;
        });
    }
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
          onClose={() => {
            setIsModalVisible(false);
            if (modalMessage.includes('Cadastro feito com sucesso!')) {
              history.push({
                pathname: '/',
              });
            }
          }}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nome completo do destinatário'
              minLength='3'
              required
            />
            <Input
              type='number'
              className='form-inputs'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder='Código de entrega'
              max='999999'
              required
            />
            <select
              className='form-select'
              onChange={(e) => setLockerSize(e.target.value)}
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
          {loading ? (
            <div className='loading-register'/>
          ) : (
            <Button
              buttonType='submit'
              buttonClass='btn-register'
              buttonOnClick=''
              buttonText='Cadastrar'
            />
          )}
        </Form>
      </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterOrder;
