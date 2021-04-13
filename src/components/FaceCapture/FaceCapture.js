/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import Button from '../Button';
import Form from '../Form/Form';
import Input from '../Input/Input';

const videoConstraints = {
  facingMode: 'user',
};

const FaceCapture = ({
  setImgSrc, label, setUserData, userData,
}) => {
  const location = useLocation();
  const path = '/user/register';
  const webcamRef = useRef(null);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
            <Form>
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
      <Button buttonText={label} buttonType="button" buttonOnClick={capture} />
    </>
  );
};

export default FaceCapture;
