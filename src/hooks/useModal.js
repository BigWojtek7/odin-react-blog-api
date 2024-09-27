import { useContext } from 'react';
import ModalContext from '../context/ModalContext';

const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error(
      'Please use useLoader inside the context of LoaderProvider'
    );
  }
  return modalContext;
};

export default useModal;
