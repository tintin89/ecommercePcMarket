import React from 'react';
import './Modal.css';

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return (
    <>
      <div className="backdrop" onClick={() => toggleModal()} />
      <div className="modal">
        {children}
      </div>
    </>
  );
}

export default Modal;