import React from 'react';
import '../../global.css';
import Button from '../../components/Button';
import FaceCapture from '../../components/FaceCapture';

const Home = () => (
  <>
    <FaceCapture />
    <h1>Home</h1>

    <Button
      buttonType='submit'
      buttonClass='btn-base btn-register'
      buttonText='registrar'
    />
  </>
);

export default Home;
