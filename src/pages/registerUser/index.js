/* eslint-disable comma-dangle */
// import React, { useState, useEffect } from 'react';
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FaceCapture from '../../components/FaceCapture/FaceCapture';

const RegisterUser = () => (
    <>
    <Header />
    <main>
      <div className='form-container'>
        <FaceCapture
          label="Cadatrar"
        />
      </div>
    </main>
    <Footer />
  </>
);

export default RegisterUser;
