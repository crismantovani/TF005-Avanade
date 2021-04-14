/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useCallback, useRef } from 'react';
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

const FaceCapture = ({
  label, setUserData, userData, loading, setLoading, detectFaces,
}) => {
  const location = useLocation();
  const userPath = '/user/register';
  const orderPath = '/order/pick';
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    setLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();
    detectFaces(imageSrc);
  }, [webcamRef, detectFaces, setLoading]);

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
            >
              <Input
                type='text'
                className='form-inputs'
                placeholder='Nome completo'
                minLength='3'
                required
                onChange={(e) => {
                  setUserData({
                    ...userData, fullName: e.target.value,
                  });
                }}
              />
              <Input
                type='text'
                className='form-inputs'
                placeholder='Função'
                minLength='3'
                required
                onChange={(e) => {
                  setUserData({
                    ...userData, function: e.target.value,
                  });
                }}
              />
            </Form>
          </>
        ) : (
          null
        )}
      </>
      {loading ? (
        <div className='loading'/>
      ) : (
        <>
        <Button
          buttonText={label}
          buttonType='button'
          buttonOnClick={capture}
          buttonClass='btn-base'
        />
        </>
      )}
      <>
        {location.pathname === orderPath ? (
          <Button
            buttonText='Pegar pelo Código'
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
