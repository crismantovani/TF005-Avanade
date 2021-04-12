// import './App.css';
import React from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam
        audio={false}
        width={1280}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button type="button" onClick={capture}>
        Capturar a Foto
      </button>
      {imgSrc && <img alt="imagem capturada" src={imgSrc} />}
    </>
  );
};

export default WebcamCapture;
