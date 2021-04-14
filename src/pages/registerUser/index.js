import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FaceCapture from '../../components/FaceCapture/FaceCapture';
import client from '../../utils/APIconfig';
import Modal from '../../components/Modal';

const RegisterUser = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    function: '',
  });
  const [loading, setLoading] = useState(false);
  const personGroupId = 'avanade';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [sendModalType, setSendModalType] = useState('');

  const handleResponseModal = (modalVisibility, modalType, message) => {
    setIsModalVisible(modalVisibility);
    setSendModalType(modalType);
    setModalMessage(message);
  };

  const addFaceToUser = (user, image) => {
    client.personGroupPerson.addFaceFromStream(personGroupId, user.personId, image)
      .then((userFace) => {
        if (userFace.persistedFaceId) {
          trainingFace();
        } else {
          handleResponseModal(true, 'error', 'Face não cadastrada, tente novamente!');
          setLoading(false);
        }
      });
  };

  const trainingFace = () => {
    try {
      client.personGroup.train(personGroupId);
      handleResponseModal(true, 'success', 'Usuário Cadastrado com Sucesso');
      setLoading(false);
    } catch (err) {
      handleResponseModal(true, 'error', err.message);
      setLoading(false);
    }
  };

  const createUser = (image) => {
    client.personGroupPerson.create(personGroupId, {
      name: userData.fullName, userData: userData.function,
    })
      .then((user) => {
        if (!userData.fullName && !userData.function) {
          handleResponseModal(true, 'error', 'Dados insuficientes para completar o cadastro');
          setLoading(false);
        } else {
          addFaceToUser(user, image);
        }
      });
  };

  const detectFace = (image) => {
    client.face.detectWithStream(image, {
      returnFaceId: true,
      recognitionModel: 'recognition_03',
    })
      .then((response) => {
        if (response.length === 0) {
          handleResponseModal(true, 'error', 'Sua Face ID não foi detectada, tente novamente! Certifique-se que sua face está desimpendida');
          setLoading(false);
        } else {
          const faceId = response[0].faceId;
          identifyFace(faceId, image);
        }
      });
  };

  const identifyFace = (faceId, image) => {
    client.face.identify([faceId], {
      personGroupId,
      maxNumOfCandidatesReturned: 1,
      confidenceThreshold: 0.8,
    })
      .then((face) => {
        if (!face[0].candidates.length) {
          createUser(image);
        } else {
          handleResponseModal(true, 'error', 'Sua Face ID já está cadastrada no sistema');
          setLoading(false);
        }
      });
  };

  const authenticateFace = (image) => {
    if (image) {
      fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'Image', {
            type: 'image/png',
          });
          detectFace(file);
        });
    }
  };

  return (
    <>
    {isModalVisible ? (
      <Modal
        modalType={sendModalType}
        modalText={modalMessage}
        onClose={() => setIsModalVisible(false)}
      />
    ) : null}
    <Header />
    <main>
      <div className='form-container'>
        <FaceCapture
          label="Cadastrar"
          setUserData={setUserData}
          userData={userData}
          loading={loading}
          setLoading={setLoading}
          authenticateFace={authenticateFace}
        />
      </div>
    </main>
    <Footer />
  </>
  );
};

export default RegisterUser;
