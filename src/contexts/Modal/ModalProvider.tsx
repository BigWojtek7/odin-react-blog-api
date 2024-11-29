import { MouseEventHandler, useState } from 'react';
import ModalContext from './ModalContext';
import { ChildrenProps } from '../../types/SharedInterfaces';

interface ModalDataType {
  message: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

const ModalProvider = ({ children }: ChildrenProps) => {
  const [modalData, setModalData] = useState<ModalDataType | null>(null);

  const openModal = (
    message: string,
    onConfirm: MouseEventHandler<HTMLButtonElement>
  ) => {
    setModalData({ message, onConfirm });
  };
  const closeModal = () => {
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
