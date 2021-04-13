import React from 'react';
import FaceCapture from '../../components/FaceCapture';
import Button from '../../components/Button';

const Home = () => (
  <>
    <FaceCapture />
    <h1>Home</h1>
    <Button
      buttonType="submit"
      buttonClass="button-base"
      buttonText=""
    />
  </>
);

export default Home;
