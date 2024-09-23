import CancelButton from '../Form/Buttons/cancelButton';
import SubmitButton from '../Form/Buttons/SubmitButton';
import styles from './Modal.module.css';
function Modal() {
  return (
    <dialog className={styles.modal}>
      <h1>{title}</h1>
      <p className={styles.children}>{children}</p>
      <div className={styles.buttons}>
        <CancelButton
          type="button"
          name="Close"
          clickHandler={onRequestClose}
        />
        {onRequestSubmit && (
          <SubmitButton
            type="button"
            name="Submit"
            clickHandler={onRequestSubmit}
            style={{ marginLeft: '10px' }}
          />
        )}
      </div>
    </dialog>
  );
}
export default Modal;
