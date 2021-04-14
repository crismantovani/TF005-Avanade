/* eslint-disable no-console */
/* eslint-disable comma-dangle */
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import FaceCapture from '../../components/FaceCapture/FaceCapture';
import client from '../../utils/APIconfig';

const RegisterUser = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    function: ''
  });
  const [loading, setLoading] = useState(false);
  const personGroupId = 'avanade';

  const detectFaces = (image) => {
    if (image) {
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'Image', {
            type: 'image/png',
          });

          client.personGroupPerson.create(personGroupId, {
            name: userData.fullName, userData: userData.function
          })
            .then((user) => {
              console.log(user);
              client.personGroupPerson.addFaceFromStream(personGroupId, user.personId, file)
                .then((userFace) => {
                  if (userFace.persistedFaceId) {
                    try {
                      client.personGroup.train(personGroupId);
                      console.log('Usuário Cadastrado com Sucesso');
                      setLoading(false);
                    } catch (err) {
                      console.log(err.message);
                    }
                  } else {
                    console.log('Face não cadastrada');
                    setLoading(false);
                  }
                });
            });
        });
    }
  };

  return (
    <>
    <Header />
    <main>
      <div className='form-container'>
        <FaceCapture
          label="Cadastrar"
          setUserData={setUserData}
          userData={userData}
          loading={loading}
          setLoading={setLoading}
          detectFaces={detectFaces}
        />
      </div>
    </main>
    <Footer />
  </>
  );
};

export default RegisterUser;
