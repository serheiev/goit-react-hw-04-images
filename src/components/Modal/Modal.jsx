import { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.scss';

export const Modal = ({ closeModal, src, alt }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModalByKey);
    return () => window.removeEventListener('keydown', closeModalByKey);
  });

  const closeModalByKey = e => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className={s.overlay} onClick={() => closeModal()}>
      <div className={s.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
}.isRequired;
