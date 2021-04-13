/* eslint-disable react/prop-types */
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Button from '../Button';

const videoConstraints = {
  facingMode: 'user',
};

const FaceCapture = ({ label }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  // eslint-disable-next-line no-console
  console.log(imgSrc);

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
      <Button
        buttonText={label}
        buttonType="button"
        buttonOnClick={capture}
      />
      {imgSrc && <img alt="imagem capturada" src={imgSrc} />}
    </>
  );
};

export default FaceCapture;
