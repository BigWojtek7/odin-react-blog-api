import { createPortal } from 'react-dom';
import useModal from '../../hooks/useModal';

import styles from './Modal.module.css';
import Button from '../form/Button/Button';

function Modal() {
  const { modalData, closeModal } = useModal();
  if (!modalData) return null;

  return (
    <>
      {createPortal(
        <div className={styles.overlay}>
          <div className={styles.content}>
            <p>{modalData.message}</p>
            <Button onClick={modalData.onConfirm}>Yes</Button>
            <Button onClick={closeModal}>No</Button>
          </div>
        </div>,
        document.getElementById('modal-root')
      )}
    </>
  );
}

export default Modal;
