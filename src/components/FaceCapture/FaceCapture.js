/* eslint-disable react/prop-types */
import React from 'react';
import Webcam from 'react-webcam';
import Button from '../Button';

const videoConstraints = {
  facingMode: 'user',
};

const FaceCapture = ({ setImgSrc, label }) => {
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
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
      <Button buttonText={label} buttonType="button" buttonOnClick={capture} />
    </>
  );
};

export default FaceCapture;
