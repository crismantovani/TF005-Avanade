/* eslint-disable react/prop-types */
import React from 'react';
// import './style.css';

export default function Button({
  buttonType,
  buttonClass,
  buttonOnClick,
  buttonText,
}) {
  return (
    <button
      type={buttonType}
      className={buttonClass}
      onClick={buttonOnClick}
    >
      {buttonText}
    </button>
  );
}
