import React from 'react';
import '../../global.css';
import Button from '../../components/Button';

const Home = () => (
  <>
    <h1>Home</h1>
    <Button
      buttonType='submit'
      buttonClass='btn-base btn-register'
      buttonText='registrar'
    />
  </>
);

export default Home;
