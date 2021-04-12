import React from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: 'user',
};

const FaceCapture = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  // eslint-disable-next-line no-console
  console.log(imgSrc);

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
      <button type="button" onClick={capture}>
        Capturar a Foto
      </button>
      {imgSrc && <img alt="imagem capturada" src={imgSrc} />}
    </>
  );
};

export default FaceCapture;
