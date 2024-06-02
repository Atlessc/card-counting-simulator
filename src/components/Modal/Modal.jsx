import React from 'react';
import useStore from '../../ZustandStore';
import './Modal.css';

const Modal = ({children}) => {
  const modalOpen = useStore(state => state.modalOpen);
  const setModalOpen = useStore(state => state.setModalOpen);

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="modal">
      <div className='modal-content-container'>

      <div className="modal-close">
        <span className="close" onClick={closeModal}>&times;</span>
      </div>
      <div className="modal-content">
        {children}
      </div>
      </div>
    </div>
  );
};

export default Modal;