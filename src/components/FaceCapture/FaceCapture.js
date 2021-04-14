/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import Button from '../Button';
import Form from '../Form/Form';
import Input from '../Input/Input';
import './style.css';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const userInfo = {
  nomeCompleto: '',
  funcao: '',
  image: '',
};

const FaceCapture = ({ setImgSrc, label }) => {
  const location = useLocation();
  const userPath = '/user/register';
  const orderPath = '/order/pick';
  const webcamRef = useRef(null);
  const [user, setUser] = useState(userInfo);

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log(event);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <main className='face-capture-container'>
      <Webcam
        audio={false}
        ref={webcamRef}
        width={1280}
        height={720}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className='webcam'
      />
      <>
        {location.pathname === userPath ? (
          <>
            <Form
              className='form-register'
              onSubmit={(e) => handleSubmit(e)}>
              <Input
                type='text'
                className='form-inputs'
                value={user.nomeCompleto}
                onChange={(e) => {
                  setUser(
                    {
                      ...user, nomeCompleto: e.targert.value,
                    },
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
                    },
                  );
                }}
                placeholder='Função'
                minLength='3'
                maxLength='8'
                required
              />
            </Form>
          </>
        ) : (
          null
        )}
      </>
      <Button
        buttonText={label}
        buttonType="button"
        buttonOnClick={capture}
        buttonClass='btn-base'
      />
      <>
        {location.pathname === orderPath ? (
          <Button
            buttonText="Pegar pelo Código"
            buttonClass='btn-base'
          />
        ) : (
          null
        )}
      </>
    </main>
  );
};

export default FaceCapture;
