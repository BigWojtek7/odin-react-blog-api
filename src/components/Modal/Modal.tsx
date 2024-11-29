import { createPortal } from 'react-dom';
import useModal from '../../contexts/Modal/useModal';

import styles from './Modal.module.css';
import Button from '../form/Button/Button';

function Modal() {
  const { modalData, closeModal } = useModal();

  if (!modalData) return null;

  const modalRoot = document.getElementById('modal-root');

  return (
    <>
      {modalRoot &&
        createPortal(
          <div className={styles.overlay}>
            <div className={styles.content}>
              <p>{modalData.message}</p>
              <Button onClick={modalData.onConfirm}>Yes</Button>
              <Button onClick={closeModal} style={{ marginLeft: '0.5em' }}>
                No
              </Button>
            </div>
          </div>,
          modalRoot
        )}
    </>
  );
}

export default Modal;
