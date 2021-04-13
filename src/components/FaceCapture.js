import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import Button from './Button';

const videoConstraints = {
  facingMode: 'user',
};

const FaceCapture = () => {
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
        buttonText="Capturar Foto"
        buttonType="button"
        onClick={capture}
      />
      {imgSrc && <img alt="imagem capturada" src={imgSrc} />}
    </>
  );
};

export default FaceCapture;
