import { createPortal } from 'react-dom';
import useModal from '../../hooks/useModal';

import styles from './Modal.module.css';

function Modal() {
  const { modalData, closeModal } = useModal();
  if (!modalData) return null;

  return (
    <>
      {createPortal(
        <div className={styles.overlay}>
          <div className={styles.content}>
            <p>{modalData.message}</p>
            <button onClick={modalData.onConfirm}>Yes</button>
            <button onClick={closeModal}>No</button>
          </div>
        </div>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

export default Modal;
