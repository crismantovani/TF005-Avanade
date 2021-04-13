/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import Button from '../Button';
import Form from '../Form/Form';
import Input from '../Input/Input';

const videoConstraints = {
  facingMode: 'user',
};

const userInfo = {
  nomeCompleto: '',
  funcao: '',
  image: '',
};

const FaceCapture = ({ setImgSrc, label }) => {
  const location = useLocation();
  const path = '/user/register';
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
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <>
        {location.pathname === path ? (
          <>
            <Form onSubmit={(e) => handleSubmit(e)}>
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
      <Button buttonText={label} buttonType="button" buttonOnClick={capture} />
    </>
  );
};

export default FaceCapture;
