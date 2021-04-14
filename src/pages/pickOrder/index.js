import React, { useState } from 'react';
import FaceCapture from '../../components/FaceCapture/FaceCapture';
import Header from '../../components/Header/Header';
import client from '../../utils/APIconfig';
import Footer from '../../components/Footer/Footer';
import Modal from '../../components/Modal/Modal';

const PickOrder = () => {
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
          identifyFace(faceId);
        }
      });
  };

  const identifyFace = (faceId) => {
    client.face.identify([faceId], {
      personGroupId,
      maxNumOfCandidatesReturned: 1,
      confidenceThreshold: 0.5,
    })
      .then((face) => {
        if (!face[0].candidates.length) {
          handleResponseModal(true, 'error', 'Sua Face ID não está cadastrada');
          setLoading(false);
        } else {
          const personId = face[0].candidates[0].personId;
          getUserData(personId);
        }
      });
  };

  const getUserData = (personId) => {
    client.personGroupPerson.get(personGroupId, personId)
      .then((person) => {
        if (!person) {
          handleResponseModal(true, 'error', 'Falha interna ao acessar os dados, tente novamente!');
          setLoading(false);
        } else {
          handleResponseModal(true, 'sucess', `Olá ${person.name}, ${person.userData} da Avanade`);
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
      <Header/>
      <FaceCapture
        label="Validar Acesso"
        loading={loading}
        setLoading={setLoading}
        authenticateFace={authenticateFace}
      />
      <Footer />
    </>
  );
};

export default PickOrder;
