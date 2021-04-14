/* eslint-disable react/prop-types */
import React from 'react';
import ImgSuccess from '../../images/'
import './style.css';

const Modal = ({
  id = 'modal', onClose = () => {},
  children,
  modalType,
  mdoalText,
  buttonText,
}) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container">
        <div className="content">{children}</div>
        {modalType === 'success' ? (
          <img />
        ) : (
          <img />
        )}
        <p>{mdoalText}</p>
        <button className="close" onClick={onClose}>{buttonText}</button>
      </div>
    </div>
  );
};

export default Modal;
