/* eslint-disable react/prop-types */
import React from 'react';
import ImgSuccess from '../../images/icon-succed.png';
import ImgError from '../../images/icon-error.png';
import ImgClose from '../../images/icon-close.png';
import './style.css';
import Input from '../Input/Input';

const Modal = ({
  id = 'modal', onClose = () => {},
  children,
  modalType,
  modalText,
}) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="container">
        <div className="content">{children}</div>
        {modalType === 'success' ? (
          <img className='icon-modal' alt='icon-success'src={ImgSuccess}/>
        ) : (
          <img className='icon-modal' alt='icon-error' src={ImgError}/>
        )}
        <p>{modalText}</p>
        <Input
          className='icon-modal-close'
          type='image'
          src={ImgClose}
          alt='icon-close'
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default Modal;
